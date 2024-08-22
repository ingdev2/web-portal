"use client";

import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import { tableColumnsAllAdmins } from "./table_columns_all_admins/TableColumnsAllAdmins";

import { useGetAllAdminsQuery } from "@/redux/apis/admins/adminsApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

const AllAdminsContent: React.FC = () => {
  const {
    data: allAdminsData,
    isLoading: allAdminsLoading,
    isFetching: allAdminsFetching,
    error: allAdminsError,
    refetch: refecthAllAdmins,
  } = useGetAllAdminsQuery(null);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const idTypeGetName = transformIdToNameMap(idTypesData);

  const transformedData = Array.isArray(allAdminsData)
    ? allAdminsData.map((req: any) => ({
        ...req,
        admin_id_type: idTypeGetName?.[req.admin_id_type] || req.admin_id_type,
      }))
    : [];

  const handleButtonUpdate = () => {
    refecthAllAdmins();
  };

  return (
    <>
      <CustomDashboardLayout
        customLayoutContent={
          <CustomTableFiltersAndSorting
            dataCustomTable={transformedData || []}
            columnsCustomTable={tableColumnsAllAdmins({
              idTypesData: idTypesData,
            })}
            onClickUpdateCustomTable={handleButtonUpdate}
          />
        }
      />
    </>
  );
};

export default AllAdminsContent;
