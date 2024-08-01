"use client";

import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";

import { useGetAllMedicalReqUsersQuery } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

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

  const requirementTypeGetName = transformIdToNameMap(userMedicalReqTypeData);

  const transformedData = allMedicalReqUsersData?.map((req: any) => ({
    ...req,
    requirement_type:
      requirementTypeGetName?.[req.requirement_type] || req.requirement_type,
  }));

  return (
    <CustomDashboardLayout
      customLayoutContent={
        <CustomTableFiltersAndSorting
          dataCustomTable={transformedData || []}
          column1TitleCustomTable="NOMBRE DE SOLICITANTE"
          column1KeyAndIndexCustomTable="aplicant_name"
          column1WidthCustomTable="13%"
          column2TitleCustomTable="# RADICADO"
          column2KeyAndIndexCustomTable="filing_number"
          column2WidthCustomTable="10%"
          column2SorterCustomTable={(a, b) => {
            const numA = parseInt(a.filing_number.split("-")[1], 10);
            const numB = parseInt(b.filing_number.split("-")[1], 10);

            return numA - numB;
          }}
          column3TitleCustomTable="FECHA DE CREACIÓN"
          column3KeyAndIndexCustomTable="date_of_admission"
          column3WidthCustomTable="10%"
          column3OnFilterCustomTable={(value, record) =>
            record.date_of_admission.includes(value as string)
          }
          column3SorterCustomTable={(a, b) =>
            a.date_of_admission.localeCompare(b.date_of_admission)
          }
          column4TitleCustomTable="TIPO DE SOLICITUD"
          column4KeyAndIndexCustomTable="requirement_type"
          column4WidthCustomTable="13%"
          column4FiltersCustomTable={
            userMedicalReqTypeData?.map((type) => ({
              value: type.name,
              text: type.name,
            })) || []
          }
          column4OnFilterCustomTable={(value: any, record) => {
            return String(record.requirement_type) === String(value);
          }}
        />
      }
    />
  );
};

export default DashboardAllRequestLayout;
