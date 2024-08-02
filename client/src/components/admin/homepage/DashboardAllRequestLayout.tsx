"use client";

import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import { useGetAllMedicalReqUsersQuery } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";
import { getTagComponentStatus } from "@/components/common/custom_tags_medical_req_status/CustomTagsStatus";
import { getTagComponentIdTypes } from "@/components/common/custom_tags_id_types/CustomTagsIdTypes";
import { getTagComponentType } from "@/components/common/custom_tags_medical_req_type/CustomTagsTypes";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import { RequirementStatusEnum } from "@/../../api/src/medical_req/enums/requirement_status.enum";
import { Col, Divider, Row } from "antd";

const aplicantNameKey: keyof MedicalReq = "aplicant_name";
const filingNumberKey: keyof MedicalReq = "filing_number";
const dateOfAdmissionKey: keyof MedicalReq = "date_of_admission";
const requirementTypeKey: keyof MedicalReq = "requirement_type";
const requirementStatusKey: keyof MedicalReq = "requirement_status";
const patientNameKey: keyof MedicalReq = "patient_name";
const patientIdTypeKey: keyof MedicalReq = "patient_id_type";
const patientIdNumberKey: keyof MedicalReq = "patient_id_number";
const userMessageKey: keyof MedicalReq = "user_message";

const DashboardAllRequestLayout: React.FC = () => {
  const {
    data: allMedicalReqUsersData,
    isLoading: allMedicalReqUsersLoading,
    isFetching: allMedicalReqUsersFetching,
    error: allMedicalReqUsersError,
  } = useGetAllMedicalReqUsersQuery(null);

  const { data: allMedicalReqStatusCreatedData } =
    useGetAllMedicalReqUsersQuery(RequirementStatusEnum.CREATED);

  const { data: allMedicalReqStatusVisualizedData } =
    useGetAllMedicalReqUsersQuery(RequirementStatusEnum.VISUALIZED);

  const { data: allMedicalReqStatusUnderReviewData } =
    useGetAllMedicalReqUsersQuery(RequirementStatusEnum.UNDER_REVIEW);

  const { data: allMedicalReqStatusDeliveredData } =
    useGetAllMedicalReqUsersQuery(RequirementStatusEnum.DELIVERED);

  const { data: allMedicalReqStatusRejectedData } =
    useGetAllMedicalReqUsersQuery(RequirementStatusEnum.REJECTED);

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

  const requirementTypeGetName = transformIdToNameMap(userMedicalReqTypeData);
  const requirementStatusGetName = transformIdToNameMap(
    userMedicalReqStatusData
  );
  const idTypeGetName = transformIdToNameMap(idTypesData);

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
      }))
    : [];

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
      render: (status: string) => getTagComponentType(status),
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
      render: (status: string) => getTagComponentStatus(status),
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
      render: (status: string) => getTagComponentIdTypes(status),
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
      title: "MENSAJE DE SOLICITANTE",
      key: userMessageKey,
      dataIndex: userMessageKey,
      width: 321,
      ellipsis: true,
    },
  ];

  return (
    <CustomDashboardLayout
      customLayoutContent={
        <>
          <Col style={{ width: "100%", marginBlock: "13px" }}>
            <h2
              style={{
                ...subtitleStyleCss,
                textAlign: "center",
                margin: "0px",
              }}
            >
              Total de&nbsp;
              <b>
                {allMedicalReqUsersData?.length}
                &nbsp;solicitud(es)
              </b>
            </h2>
          </Col>

          <div
            style={{
              paddingBlock: "7px",
              paddingInline: "13px",
              backgroundColor: "#013B5A22",
              borderRadius: "13px",
              marginBottom: "13px",
            }}
          >
            <Col style={{ width: "100%", marginBlock: "0px" }}>
              <h3
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  color: "#1D8348",
                  fontWeight: "bold",
                  margin: "0px",
                }}
              >
                Categorización por estados
              </h3>
            </Col>
            <Row
              align="middle"
              style={{
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginBlock: "7px",
              }}
            >
              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                Creadas:&nbsp;
                <b>{allMedicalReqStatusCreatedData?.length}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                Visualizadas:&nbsp;
                <b>{allMedicalReqStatusVisualizedData?.length}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                En Revisión:&nbsp;
                <b>{allMedicalReqStatusUnderReviewData?.length}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                Docs. Entregados:&nbsp;
                <b>{allMedicalReqStatusDeliveredData?.length}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                Rechazadas:&nbsp;
                <b>{allMedicalReqStatusRejectedData?.length}</b>
              </h4>
            </Row>
          </div>

          <CustomTableFiltersAndSorting
            dataCustomTable={transformedData || []}
            columnsCustomTable={columns}
          />
        </>
      }
    />
  );
};

export default DashboardAllRequestLayout;
