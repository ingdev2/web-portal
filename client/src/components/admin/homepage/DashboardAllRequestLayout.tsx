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

  const transformedData = allMedicalReqUsersData?.map((req: any) => ({
    ...req,
    requirement_type:
      requirementTypeGetName?.[req.requirement_type] || req.requirement_type,
    requirement_status:
      requirementStatusGetName?.[req.requirement_status] ||
      req.requirement_status,
    patient_id_type:
      idTypeGetName?.[req.patient_id_type] || req.patient_id_type,
  }));

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
      width: 173,
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
        <CustomTableFiltersAndSorting
          dataCustomTable={transformedData || []}
          columnsCustomTable={columns}
        />
      }
    />
  );
};

export default DashboardAllRequestLayout;
