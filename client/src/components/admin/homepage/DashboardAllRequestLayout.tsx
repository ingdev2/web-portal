"use client";

import React, { useState } from "react";

import { Button } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import AdminRequestDetailsModalContent from "./admin_request_details_modal_content/AdminRequestDetailsModalContent";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { FaRegEye } from "react-icons/fa";
import { TbEye } from "react-icons/tb";

import { getTagComponentStatus } from "@/components/common/custom_tags_medical_req_status/CustomTagsStatus";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import { getTagComponentType } from "@/components/common/custom_tags_medical_req_type/CustomTagsTypes";

import { useGetAllMedicalReqUsersQuery } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useViewFileQuery } from "@/redux/apis/upload_view_files/uploadViewFilesApi";
import { useGetAllPatientClassStatusQuery } from "@/redux/apis/patient_class_status/patientClassStatusApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";
import { useGetAllMedicalReqReasonsForRejectionQuery } from "@/redux/apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";
import { formatFilingNumber } from "@/helpers/format_filing_number/format_filing_number";
import { reasonForRejectionMap } from "@/helpers/medical_req_reason_for_rejection_map/reason_for_rejection_map";
import { getTagComponentRelationshipType } from "@/components/common/custom_tags_relationship_types/CustomTagsRelationshipTypes";
import StatusItems from "./categorization_by_items/StatusItems";

const aplicantNameKey: keyof MedicalReq = "aplicant_name";
const filingNumberKey: keyof MedicalReq = "filing_number";
const dateOfAdmissionKey: keyof MedicalReq = "date_of_admission";
const requirementTypeKey: keyof MedicalReq = "requirement_type";
const requirementStatusKey: keyof MedicalReq = "requirement_status";
const patientNameKey: keyof MedicalReq = "patient_name";
const patientIdTypeKey: keyof MedicalReq = "patient_id_type";
const patientIdNumberKey: keyof MedicalReq = "patient_id_number";
const registrationDatesKey: keyof MedicalReq = "registration_dates";

const DashboardAllRequestLayout: React.FC = () => {
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<MedicalReq | null>(null);

  const {
    data: allMedicalReqUsersData,
    isLoading: allMedicalReqUsersLoading,
    isFetching: allMedicalReqUsersFetching,
    error: allMedicalReqUsersError,
  } = useGetAllMedicalReqUsersQuery({});

  const {
    data: userMedicalReqTypeData,
    isLoading: userMedicalReqTypeLoading,
    isFetching: userMedicalReqTypeFetching,
    error: userMedicalReqTypeError,
  } = useGetAllMedicalReqTypesQuery(null);

  const {
    data: userMedicalReqStatusData,
    isLoading: userMedicalReqStatusLoading,
    isFetching: userMedicalReqStatusFetching,
    error: userMedicalReqStatusError,
  } = useGetAllMedicalReqStatusQuery(null);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: allPatientClassStatusData,
    isLoading: allPatientClassStatusLoading,
    isFetching: allPatientClassStatusFetching,
    error: allPatientClassStatusError,
  } = useGetAllPatientClassStatusQuery(null);

  const {
    data: allRelationshipWithPatientData,
    isLoading: allRelationshipWithPatientLoading,
    isFetching: allRelationshipWithPatientFetching,
    error: allRelationshipWithPatientError,
  } = useGetAllRelationshipTypesQuery(null);

  const {
    data: userMedicalReqReasonsForRejectionData,
    isLoading: userMedicalReqReasonsForRejectionLoading,
    isFetching: userMedicalReqReasonsForRejectionFetching,
    error: userMedicalReqReasonsForRejectionError,
  } = useGetAllMedicalReqReasonsForRejectionQuery(null);

  const {
    data: userViewResponseDocumentsData,
    isLoading: userViewResponseDocumentsLoading,
    isFetching: userViewResponseDocumentsFetching,
    error: userViewResponseDocumentsError,
  } = useViewFileQuery(selectedRowDataLocalState?.documents_delivered, {
    skip: !selectedRowDataLocalState?.documents_delivered,
  });

  const idTypeGetName = transformIdToNameMap(idTypesData);
  const requirementTypeGetName = transformIdToNameMap(userMedicalReqTypeData);
  const requirementStatusGetName = transformIdToNameMap(
    userMedicalReqStatusData
  );
  const patientClassStatusGetName = transformIdToNameMap(
    allPatientClassStatusData
  );
  const relationshipWithPatientGetName = transformIdToNameMap(
    allRelationshipWithPatientData
  );

  const transformedData = Array.isArray(allMedicalReqUsersData)
    ? allMedicalReqUsersData.map((req: any) => ({
        ...req,
        requirement_type:
          requirementTypeGetName?.[req.requirement_type] ||
          req.requirement_type,
        requirement_status:
          requirementStatusGetName?.[req.requirement_status] ||
          req.requirement_status,
        patient_id_type:
          idTypeGetName?.[req.patient_id_type] || req.patient_id_type,
        patient_class_status:
          patientClassStatusGetName?.[req.patient_class_status] ||
          req.patient_class_status,
        relationship_with_patient:
          relationshipWithPatientGetName?.[req.relationship_with_patient] ||
          req.relationship_with_patient,
        aplicant_id_type:
          idTypeGetName?.[req.aplicant_id_type] || req.aplicant_id_type,
      }))
    : [];

  const reasonForRejectionMapList = reasonForRejectionMap(
    userMedicalReqReasonsForRejectionData || []
  );

  const rejectionReasons = selectedRowDataLocalState?.motive_for_rejection?.map(
    (id) => reasonForRejectionMapList[id]
  );

  const handleClickSeeMore = (record: MedicalReq) => {
    setSelectedRowDataLocalState(record);

    setIsModalVisibleLocalState(true);
  };

  const handleButtonClick = () => {
    if (
      userViewResponseDocumentsData &&
      userViewResponseDocumentsData.length > 0 &&
      !userViewResponseDocumentsLoading &&
      !userViewResponseDocumentsFetching &&
      !userViewResponseDocumentsError
    ) {
      userViewResponseDocumentsData.map((url: string) => {
        window.open(url, "_blank");
      });
    }
  };

  const columns = [
    {
      title: "NOMBRE DE SOLICITANTE",
      key: aplicantNameKey,
      dataIndex: aplicantNameKey,
      width: 173,
      ellipsis: true,
      searchable: true,
      fixed: "left" as "left",
    },
    {
      title: "# RADICADO",
      key: filingNumberKey,
      dataIndex: filingNumberKey,
      width: 130,
      sorter: (a: MedicalReq, b: MedicalReq) => {
        const numA = parseInt(a.filing_number.split("-")[1], 10);
        const numB = parseInt(b.filing_number.split("-")[1], 10);

        return numA - numB;
      },
      ellipsis: true,
      searchable: true,
      fixed: "left" as "left",
    },
    {
      title: "FECHA DE CREACIÓN",
      key: dateOfAdmissionKey,
      dataIndex: dateOfAdmissionKey,
      width: 100,
      sorter: (a: MedicalReq, b: MedicalReq) =>
        a.date_of_admission.localeCompare(b.date_of_admission),
      ellipsis: true,
      searchable: true,
    },
    {
      title: "TIPO DE SOLICITUD",
      key: requirementTypeKey,
      dataIndex: requirementTypeKey,
      width: 173,
      filters:
        userMedicalReqTypeData?.map((type) => ({
          value: type.name,
          text: type.name,
        })) || [],
      onFilter: (value: any, record: any) => {
        return String(record.requirement_type) === String(value);
      },
      ellipsis: true,
      render: (type: string) => type,
    },
    {
      title: "ESTADO DE SOLICITUD",
      key: requirementStatusKey,
      dataIndex: requirementStatusKey,
      width: 173,
      filters:
        userMedicalReqStatusData?.map((type) => ({
          value: type.name,
          text: type.name,
        })) || [],
      onFilter: (value: any, record: any) => {
        return String(record.requirement_status) === String(value);
      },
      ellipsis: true,
      render: (status: string) => status,
    },
    {
      title: "NOMBRE DE PACIENTE",
      key: patientNameKey,
      dataIndex: patientNameKey,
      width: 173,
      ellipsis: true,
      searchable: true,
    },
    {
      title: "TIPO DE ID PACIENTE",
      key: patientIdTypeKey,
      dataIndex: patientIdTypeKey,
      width: 270,
      filters:
        idTypesData?.map((type) => ({
          value: type.name,
          text: type.name,
        })) || [],
      onFilter: (value: any, record: any) => {
        return String(record.patient_id_type) === String(value);
      },
      ellipsis: true,
      render: (type: string) => type,
    },
    {
      title: "NÚMERO DE ID PACIENTE",
      key: patientIdNumberKey,
      dataIndex: patientIdNumberKey,
      width: 100,
      ellipsis: true,
      searchable: true,
      fixed: "right" as "right",
    },
    {
      title: "ACCIONES",
      key: registrationDatesKey,
      dataIndex: registrationDatesKey,
      width: 88,
      ellipsis: true,
      fixed: "right" as "right",
      render: (_: any, record: MedicalReq) => (
        <Button
          style={{
            display: "flex",
            flexFlow: "row wrap",
            color: "#F7F7F7",
            backgroundColor: "#015E90",
            borderRadius: 22,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            paddingInline: 13,
            paddingBlock: 7,
          }}
          size="middle"
          icon={<FaRegEye />}
          onClick={() => handleClickSeeMore(record)}
        />
      ),
    },
  ];

  return (
    <CustomDashboardLayout
      customLayoutContent={
        <>
          {isModalVisibleLocalState && (
            <CustomModalNoContent
              key={"custom-modal-change-password-eps"}
              widthCustomModalNoContent={"96%"}
              minWidthCustomModalNoContent="960px"
              openCustomModalState={isModalVisibleLocalState}
              closableCustomModal={true}
              maskClosableCustomModal={false}
              handleCancelCustomModal={() => {
                setIsModalVisibleLocalState(false);
              }}
              contentCustomModal={
                <AdminRequestDetailsModalContent
                  titleDescription={"Revisión de solicitud completa"}
                  labelFilingNumber={"N° de Radicado:"}
                  selectedRequestFilingNumber={formatFilingNumber(
                    selectedRowDataLocalState
                      ? selectedRowDataLocalState.filing_number
                      : "SIN NÚMERO DE RADICADO"
                  )}
                  labelRequestType={"Tipo de solicitud:"}
                  selectedRequestType={getTagComponentType(
                    selectedRowDataLocalState?.requirement_type.toString()
                  )}
                  labelRequestStatus={"Estado de solicitud:"}
                  selectedRequestStatus={getTagComponentStatus(
                    selectedRowDataLocalState?.requirement_status.toString()
                  )}
                  labelResponseDocuments={
                    "Documentos de respuesta a solicitud:"
                  }
                  selectedRequestResponseDocuments={
                    selectedRowDataLocalState?.documents_delivered ? (
                      <Button
                        className="documents-response-link-button-admin"
                        size="middle"
                        style={{
                          backgroundColor: "#015E90",
                          color: "#F7F7F7",
                        }}
                        onClick={handleButtonClick}
                      >
                        <div
                          style={{
                            minWidth: "137px",
                            display: "flex",
                            flexFlow: "row wrap",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TbEye size={17} />
                          &nbsp;Ver documentos
                        </div>
                      </Button>
                    ) : (
                      <b style={{ color: "#960202" }}>
                        No hay documentos anexados
                      </b>
                    )
                  }
                  labelHaveRightPetition={"¿Tiene derecho de petición?:"}
                  selectedHaveRightPetition={
                    selectedRowDataLocalState?.copy_right_petition ? (
                      <Button
                        className="documents-right-petition-button-admin"
                        size="middle"
                        style={{
                          backgroundColor: "#015E90",
                          color: "#F7F7F7",
                        }}
                        onClick={handleButtonClick}
                      >
                        <div
                          style={{
                            minWidth: "137px",
                            display: "flex",
                            flexFlow: "row wrap",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <TbEye size={17} />
                          &nbsp;Ver documentos
                        </div>
                      </Button>
                    ) : (
                      <b style={{ color: "#960202" }}>
                        No hay documentos anexados
                      </b>
                    )
                  }
                  labelRelationShipWithPatient="Parentesco con paciente:"
                  selectedRelationShipWithPatient={
                    selectedRowDataLocalState?.relationship_with_patient ? (
                      getTagComponentRelationshipType(
                        selectedRowDataLocalState?.relationship_with_patient.toString()
                      )
                    ) : (
                      <b style={{ color: "#960202" }}>No aplica</b>
                    )
                  }
                  labelAplicantName="Nombre de solicitante:"
                  selectedAplicantName={`${selectedRowDataLocalState?.aplicant_name} ${selectedRowDataLocalState?.aplicant_last_name}`}
                  labelAplicantIdType="Tipo de ID solicitante:"
                  selectedAplicantIdType={getTagComponentIdTypes(
                    selectedRowDataLocalState?.aplicant_id_type.toString()
                  )}
                  labelAplicantIdNumber="Número de ID solicitante"
                  selectedAplicantIdNumber={
                    selectedRowDataLocalState?.aplicant_id_number
                  }
                  labelAplicantEmail="Email de solicitante:"
                  selectedAplicantEmail={
                    selectedRowDataLocalState?.aplicant_email
                  }
                  labelAnswerDate="Fecha de creación:"
                  selectedAnswerDate={selectedRowDataLocalState?.answer_date}
                  labelDocumentExpirationDate="Fecha de expiración de documentos:"
                  selectedRequestDocumentExpirationDate={
                    selectedRowDataLocalState?.download_expiration_date || (
                      <b style={{ color: "#960202" }}>No aplica</b>
                    )
                  }
                  labelReasonsForRejection="Motivos de rechazo a solicitud:"
                  selectedRequestReasonsForRejection={
                    rejectionReasons && rejectionReasons.length > 0 ? (
                      <ul style={{ padding: "0px", margin: "0px" }}>
                        {rejectionReasons?.map((reason, index) => (
                          <li key={index}>{reason}</li>
                        ))}
                      </ul>
                    ) : (
                      <b style={{ color: "#960202" }}>No aplica</b>
                    )
                  }
                  labelUserComments={"Detalles del usuario para solicitud:"}
                  selectedRequestUserComments={
                    selectedRowDataLocalState?.user_message
                  }
                  labelPatientName="Nombre de paciente:"
                  selectedPatientName={selectedRowDataLocalState?.patient_name}
                  labelPatientIdType="Tipo de ID paciente:"
                  selectedPatientIdType={getTagComponentIdTypes(
                    selectedRowDataLocalState?.patient_id_type.toString()
                  )}
                  labelPatientIdNumber="Número de ID paciente:"
                  selectedPatientIdNumber={
                    selectedRowDataLocalState?.patient_id_number
                  }
                  labelPatientClassStatus="Tipo de paciente"
                  selectedPatientClassStatus={
                    selectedRowDataLocalState?.patient_class_status || (
                      <b style={{ color: "#960202" }}>No aplica</b>
                    )
                  }
                  labelRegistrationDates="Lapso de tiempo registros"
                  selectedRegistrationDates={
                    selectedRowDataLocalState?.registration_dates
                  }
                  labelRequestResponse={"Mensaje de respuesta a solicitud:"}
                  selectedRequestResponse={
                    selectedRowDataLocalState?.response_comments || (
                      <b style={{ color: "#960202" }}>En espera de respuesta</b>
                    )
                  }
                />
              }
            />
          )}

          {!transformedData ? (
            <CustomSpin />
          ) : (
            <>
              <StatusItems />

              <CustomTableFiltersAndSorting
                dataCustomTable={transformedData || []}
                columnsCustomTable={columns}
              />
            </>
          )}
        </>
      }
    />
  );
};

export default DashboardAllRequestLayout;
