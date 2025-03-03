"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import ModalRequestsDetails from "./modal_requests_details/ModalRequestsDetails";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { tableColumnsAllExternalConsultationRequests } from "./table_columns_all_ext_consultation_requests/TableColumnsAllExtConsultationRequests";
import { TbEye } from "react-icons/tb";

import ModalActionButtons from "./modal_action_buttons/ModalActionButtons";
import { getTagComponentStatus } from "@/components/common/custom_tags_medical_req_status/CustomTagsStatus";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import { getTagComponentType } from "@/components/common/custom_tags_medical_req_type/CustomTagsTypes";
import { getTagComponentRelationshipType } from "@/components/common/custom_tags_relationship_types/CustomTagsRelationshipTypes";
import StatusItems from "./categorization_by_items/StatusItems";

import {
  setTableRowFilingNumber,
  setTableRowId,
} from "@/redux/features/common/modal/modalSlice";

import {
  useChangeStatusToVisualizedMutation,
  useGetAllMedicalReqUsersByAreaQuery,
} from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useViewFileQuery } from "@/redux/apis/upload_view_files/uploadViewFilesApi";
import { useGetAllUserRolesQuery } from "@/redux/apis/user_roles/userRolesApi";
import { useGetAllPatientClassStatusQuery } from "@/redux/apis/patient_class_status/patientClassStatusApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";
import { useGetAllMedicalReqReasonsForRejectionQuery } from "@/redux/apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";
import { formatFilingNumber } from "@/helpers/format_filing_number/format_filing_number";
import { reasonForRejectionMap } from "@/helpers/medical_req_reason_for_rejection_map/reason_for_rejection_map";

import { CompanyAreaEnum } from "@/utils/enums/company_area.enum";
import { RequirementStatusEnum } from "@/utils/enums/requirement_status.enum";
import AverageResponseTime from "./average_response_time/AverageResponseTime";
import { setDefaultValuesMedicalReq } from "@/redux/features/medical_req/medicalReqSlice";

const AllExternalConsultationRequestContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<MedicalReq | null>(null);
  const [selectedDocumentId, setSelectedDocumentId] = useState<
    string[] | undefined
  >([]);

  const wasSentToAnotherAreaState = useAppSelector(
    (state) => state.medicalReq.wasSentToAnotherArea
  );
  const documentsWereDeliveredState = useAppSelector(
    (state) => state.medicalReq.documentsWereDelivered
  );
  const wasRejectedState = useAppSelector(
    (state) => state.medicalReq.wasRejected
  );

  const {
    data: allMedicalReqExtConsultationAreaData,
    isLoading: allMedicalReqExtConsultationAreaLoading,
    isFetching: allMedicalReqExtConsultationAreaFetching,
    error: allMedicalReqExtConsultationAreaError,
    refetch: refecthAllMedicalReqExtConsultationArea,
  } = useGetAllMedicalReqUsersByAreaQuery({
    companyAreaNames: [
      CompanyAreaEnum.DIVA_EXTERNAL_CONSULTATION,
      CompanyAreaEnum.ARLENE_EXTERNAL_CONSULTATION,
    ],
  });

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
    data: allUserRolesData,
    isLoading: allUserRolesLoading,
    isFetching: allUserRolesFetching,
    error: allUserRolesError,
  } = useGetAllUserRolesQuery(null);

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
    data: allCompanyAreasData,
    isLoading: allCompanyAreasLoading,
    isFetching: allCompanyAreasFetching,
    error: allCompanyAreasError,
  } = useGetAllCompanyAreaQuery(null);

  const {
    data: userMedicalReqReasonsForRejectionData,
    isLoading: userMedicalReqReasonsForRejectionLoading,
    isFetching: userMedicalReqReasonsForRejectionFetching,
    error: userMedicalReqReasonsForRejectionError,
  } = useGetAllMedicalReqReasonsForRejectionQuery(null);

  const [
    changeStatusToVisualized,
    {
      data: changeStatusToVisualizedData,
      isLoading: changeStatusToVisualizedLoading,
      isSuccess: changeStatusToVisualizedFetching,
      isError: changeStatusToVisualizedError,
    },
  ] = useChangeStatusToVisualizedMutation({
    fixedCacheKey: "changeStatusToVisualizedData",
  });

  const {
    data: documentUrls,
    isLoading: documentUrlsLoading,
    isFetching: documentUrlsFetching,
    error: documentUrlsError,
  } = useViewFileQuery(selectedDocumentId, { skip: !selectedDocumentId });

  useEffect(() => {
    if (wasSentToAnotherAreaState) {
      refecthAllMedicalReqExtConsultationArea();

      setTimeout(() => {
        setIsModalVisibleLocalState(false);

        dispatch(setDefaultValuesMedicalReq());
      }, 4000);
    }
  }, [wasSentToAnotherAreaState]);

  useEffect(() => {
    if (documentsWereDeliveredState) {
      refecthAllMedicalReqExtConsultationArea();

      setTimeout(() => {
        setIsModalVisibleLocalState(false);

        dispatch(setDefaultValuesMedicalReq());
      }, 4000);
    }
  }, [documentsWereDeliveredState]);

  useEffect(() => {
    if (wasRejectedState) {
      refecthAllMedicalReqExtConsultationArea();

      setTimeout(() => {
        setIsModalVisibleLocalState(false);

        dispatch(setDefaultValuesMedicalReq());
      }, 4000);
    }
  }, [wasRejectedState]);

  useEffect(() => {
    if (
      documentUrls &&
      documentUrls.length > 0 &&
      !documentUrlsLoading &&
      !documentUrlsFetching &&
      !documentUrlsError
    ) {
      documentUrls.forEach((url) => {
        window.open(url, "_blank");
      });

      setTimeout(() => {
        setSelectedDocumentId([]);
      }, 200);
    }
  }, [
    documentUrls,
    documentUrlsLoading,
    documentUrlsFetching,
    documentUrlsError,
  ]);

  const idTypeGetName = transformIdToNameMap(idTypesData);
  const requirementTypeGetName = transformIdToNameMap(userMedicalReqTypeData);
  const requirementStatusGetName = transformIdToNameMap(
    userMedicalReqStatusData
  );
  const allUserRolesGetName = transformIdToNameMap(allUserRolesData);
  const patientClassStatusGetName = transformIdToNameMap(
    allPatientClassStatusData
  );
  const relationshipWithPatientGetName = transformIdToNameMap(
    allRelationshipWithPatientData
  );
  const companyAreaGetName = transformIdToNameMap(allCompanyAreasData);

  const transformedData = Array.isArray(allMedicalReqExtConsultationAreaData)
    ? allMedicalReqExtConsultationAreaData.map((req: any) => ({
        ...req,
        requirement_type:
          requirementTypeGetName?.[req.requirement_type] ||
          req.requirement_type,
        requirement_status:
          requirementStatusGetName?.[req.requirement_status] ||
          req.requirement_status,
        patient_id_type:
          idTypeGetName?.[req.patient_id_type] || req.patient_id_type,
        medicalReqUserType:
          allUserRolesGetName?.[req.medicalReqUserType] ||
          req.medicalReqUserType,
        patient_class_status:
          patientClassStatusGetName?.[req.patient_class_status] ||
          req.patient_class_status,
        relationship_with_patient:
          relationshipWithPatientGetName?.[req.relationship_with_patient] ||
          req.relationship_with_patient,
        aplicant_id_type:
          idTypeGetName?.[req.aplicant_id_type] || req.aplicant_id_type,
        currently_in_area:
          companyAreaGetName?.[req.currently_in_area] || req.currently_in_area,
      }))
    : [];

  const reasonForRejectionMapList = reasonForRejectionMap(
    userMedicalReqReasonsForRejectionData || []
  );

  const rejectionReasons = selectedRowDataLocalState?.motive_for_rejection?.map(
    (id) => reasonForRejectionMapList[id]
  );

  const namesOfMedicalReqStates = [RequirementStatusEnum.CREATED.toString()];

  const idsOfMedicalReqStates = userMedicalReqStatusData
    ?.filter((status) => namesOfMedicalReqStates.includes(status.name))
    .map((status) => status.name);

  const handleClickSeeMore = (record: MedicalReq) => {
    dispatch(setTableRowId(""));
    dispatch(setTableRowFilingNumber(""));
    setSelectedRowDataLocalState(null);

    dispatch(setDefaultValuesMedicalReq());

    if (
      record &&
      idsOfMedicalReqStates &&
      idsOfMedicalReqStates.includes(record.requirement_status.toString())
    ) {
      changeStatusToVisualized(record.id);
    }

    setSelectedRowDataLocalState(record);
    dispatch(setTableRowId(record.id));
    dispatch(setTableRowFilingNumber(record.filing_number));

    setIsModalVisibleLocalState(true);

    refecthAllMedicalReqExtConsultationArea();
  };

  const handleButtonClick = (documentId: string[] | undefined) => {
    setSelectedDocumentId(documentId);
  };

  const rowClassName = (record: MedicalReq): string => {
    switch (true) {
      case record.answer_date !== null:
        return "row-all-resolved";
      default:
        return "";
    }
  };

  const handleButtonUpdate = () => {
    refecthAllMedicalReqExtConsultationArea();
  };

  return (
    <>
      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-request-details-admin"}
          widthCustomModalNoContent={"96%"}
          minWidthCustomModalNoContent="960px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            dispatch(setTableRowId(""));
            dispatch(setTableRowFilingNumber(""));
            setSelectedRowDataLocalState(null);

            dispatch(setDefaultValuesMedicalReq());

            refecthAllMedicalReqExtConsultationArea();

            setIsModalVisibleLocalState(false);
          }}
          contentCustomModal={
            <>
              <ModalRequestsDetails
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
                labelResponseDocuments={"Documentos de respuesta a solicitud:"}
                selectedRequestResponseDocuments={
                  selectedRowDataLocalState?.documents_delivered ? (
                    <Button
                      className="documents-response-link-button-admin"
                      size="middle"
                      style={{
                        backgroundColor: "#015E90",
                        color: "#F7F7F7",
                      }}
                      onClick={() =>
                        handleButtonClick(
                          selectedRowDataLocalState?.documents_delivered
                        )
                      }
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
                    <p style={{ color: "#960202" }}>
                      No hay documentos anexados
                    </p>
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
                      onClick={() =>
                        handleButtonClick(
                          selectedRowDataLocalState?.copy_right_petition
                        )
                      }
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
                    <p style={{ color: "#960202" }}>
                      No hay documentos anexados
                    </p>
                  )
                }
                labelRelationShipWithPatient="Parentesco con paciente:"
                selectedRelationShipWithPatient={
                  selectedRowDataLocalState?.relationship_with_patient ? (
                    getTagComponentRelationshipType(
                      selectedRowDataLocalState?.relationship_with_patient.toString()
                    )
                  ) : (
                    <p style={{ color: "#960202" }}>No aplica</p>
                  )
                }
                labelAplicantName="Nombre de solicitante:"
                selectedAplicantName={`${selectedRowDataLocalState?.aplicant_name} ${selectedRowDataLocalState?.aplicant_last_name ?? ""}`}
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
                labelCopyAplicantIdDocument="Copia de documento de identidad del solicitante"
                selectedCopyAplicantIdDocument={
                  selectedRowDataLocalState?.copy_applicant_identification_document ? (
                    <Button
                      className="document-aplicant-id-button-admin"
                      size="middle"
                      style={{
                        backgroundColor: "#015E90",
                        color: "#F7F7F7",
                      }}
                      onClick={() =>
                        handleButtonClick(
                          selectedRowDataLocalState?.copy_applicant_identification_document
                        )
                      }
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
                    <p style={{ color: "#960202" }}>
                      No hay documentos anexados
                    </p>
                  )
                }
                labelCopyPatientCitizenshipCard="Copia de cédula del paciente"
                selectedCopyPatientCitizenshipCard={
                  selectedRowDataLocalState?.copy_patient_citizenship_card ? (
                    <Button
                      className="document-patient-citizenship-card-button-admin"
                      size="middle"
                      style={{
                        backgroundColor: "#015E90",
                        color: "#F7F7F7",
                      }}
                      onClick={() =>
                        handleButtonClick(
                          selectedRowDataLocalState?.copy_patient_citizenship_card
                        )
                      }
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
                    <p style={{ color: "#960202" }}>
                      No hay documentos anexados
                    </p>
                  )
                }
                labelCopyPatientCivilRegistration="Copia de registro civil del paciente"
                selectedCopyPatientCivilRegistration={
                  selectedRowDataLocalState?.copy_patient_civil_registration ? (
                    <Button
                      className="document-patient-civil-registration-button-admin"
                      size="middle"
                      style={{
                        backgroundColor: "#015E90",
                        color: "#F7F7F7",
                      }}
                      onClick={() =>
                        handleButtonClick(
                          selectedRowDataLocalState?.copy_patient_civil_registration
                        )
                      }
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
                    <p style={{ color: "#960202" }}>
                      No hay documentos anexados
                    </p>
                  )
                }
                labelCopyParentsCitizenshipCard="Copia de cédula de padre o madre"
                selectedCopyParentsCitizenshipCard={
                  selectedRowDataLocalState?.copy_parents_citizenship_card ? (
                    <Button
                      className="document-parents-citizenship-card-button-admin"
                      size="middle"
                      style={{
                        backgroundColor: "#015E90",
                        color: "#F7F7F7",
                      }}
                      onClick={() =>
                        handleButtonClick(
                          selectedRowDataLocalState?.copy_parents_citizenship_card
                        )
                      }
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
                    <p style={{ color: "#960202" }}>
                      No hay documentos anexados
                    </p>
                  )
                }
                labelCopyMarriageCertificate="Copia de partida de matrimonio o certificado de unión libre"
                selectedCopyMarriageCertificate={
                  selectedRowDataLocalState?.copy_marriage_certificate ? (
                    <Button
                      className="document-marriage-certificate-button-admin"
                      size="middle"
                      style={{
                        backgroundColor: "#015E90",
                        color: "#F7F7F7",
                      }}
                      onClick={() =>
                        handleButtonClick(
                          selectedRowDataLocalState?.copy_marriage_certificate
                        )
                      }
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
                    <p style={{ color: "#960202" }}>
                      No hay documentos anexados
                    </p>
                  )
                }
                labelCopyCohabitationCertificate="Certificado de convivencia"
                selectedCopyCohabitationCertificate={
                  selectedRowDataLocalState?.copy_cohabitation_certificate ? (
                    <Button
                      className="document-cohabitation-certificate-button-admin"
                      size="middle"
                      style={{
                        backgroundColor: "#015E90",
                        color: "#F7F7F7",
                      }}
                      onClick={() =>
                        handleButtonClick(
                          selectedRowDataLocalState?.copy_cohabitation_certificate
                        )
                      }
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
                    <p style={{ color: "#960202" }}>
                      No hay documentos anexados
                    </p>
                  )
                }
                labelDateOfAdmission="Fecha de creación de solicitud:"
                selectedDateOfAdmission={
                  selectedRowDataLocalState?.date_of_admission
                }
                labelAnswerDate="Fecha de respuesta de solicitud:"
                selectedAnswerDate={
                  selectedRowDataLocalState?.answer_date || (
                    <p style={{ color: "#960202" }}>En Revisión</p>
                  )
                }
                labelResponseTime="Tiempo de respuesta a solicitud"
                selectedResponseTime={
                  selectedRowDataLocalState?.response_time || (
                    <p style={{ color: "#960202" }}>En Revisión</p>
                  )
                }
                labelCurrentlyInArea="Área actual"
                selectedCurrentlyInArea={
                  selectedRowDataLocalState?.currently_in_area
                }
                labelDocumentExpirationDate="Fecha de expiración de documentos:"
                selectedRequestDocumentExpirationDate={
                  selectedRowDataLocalState?.download_expiration_date || (
                    <p style={{ color: "#960202" }}>No aplica</p>
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
                    <p style={{ color: "#960202" }}>No aplica</p>
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
                labelAplicantType="Tipo de solicitante"
                selectedAplicantType={
                  selectedRowDataLocalState?.medicalReqUserType || (
                    <p style={{ color: "#960202" }}>No aplica</p>
                  )
                }
                labelPatientClassStatus="Tipo de paciente"
                selectedPatientClassStatus={
                  selectedRowDataLocalState?.patient_class_status || (
                    <p style={{ color: "#960202" }}>No aplica</p>
                  )
                }
                labelRegistrationDates="Lapso de tiempo registros"
                selectedRegistrationDates={
                  selectedRowDataLocalState?.registration_dates
                }
                labelRequestResponse={"Mensaje de respuesta a solicitud:"}
                selectedRequestResponse={
                  selectedRowDataLocalState?.response_comments || (
                    <p style={{ color: "#960202" }}>En espera de respuesta</p>
                  )
                }
                labelAreaRedirectionMessage="Mensaje de envio de solicitud:"
                selectedAreaRedirectionMessage={
                  selectedRowDataLocalState?.area_redirection_message || (
                    <p style={{ color: "#960202" }}>No aplica</p>
                  )
                }
              />
              <ModalActionButtons />
            </>
          }
        />
      )}

      <CustomDashboardLayout
        customLayoutContent={
          <>
            {!transformedData ? (
              <CustomSpin />
            ) : (
              <>
                <StatusItems />

                <CustomTableFiltersAndSorting
                  dataCustomTable={transformedData || []}
                  columnsCustomTable={tableColumnsAllExternalConsultationRequests(
                    {
                      handleClickSeeMore: handleClickSeeMore,
                      idTypesData: idTypesData,
                      userMedicalReqTypeData: userMedicalReqTypeData,
                      userMedicalReqStatusData: userMedicalReqStatusData,
                      aplicantTypeData: allUserRolesData,
                      currentlyAreaMedicalReqData: allCompanyAreasData,
                    }
                  )}
                  onClickUpdateCustomTable={handleButtonUpdate}
                  rowClassName={rowClassName}
                />

                <AverageResponseTime />
              </>
            )}
          </>
        }
      />
    </>
  );
};

export default AllExternalConsultationRequestContent;
