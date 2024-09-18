"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import AdminPersonalDataForm from "./personal_data_forms/AdminPersonalDataForm";

import {
  setNameAdmin,
  setLastNameAdmin,
  setIdTypeAdmin,
  setIdNumberAdmin,
  setGenderAdmin,
  setCorporateEmailAdmin,
  setCompanyAreaAdmin,
  setPositionLevelAdmin,
  setAuthMethodAdmin,
  setIdTypeAbbrevAdmin,
  setGenderAbbrevAdmin,
  setPositionLevelAbbrevAdmin,
  setCompanyAreaAbbrevAdmin,
} from "@/redux/features/admin/adminSlice";
import { setSelectedKey } from "@/redux/features/common/modal/modalSlice";

import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";
import { useGetAllPositionLevelsQuery } from "@/redux/apis/position_level/positionLevelApi";
import { useGetAllGendersQuery } from "@/redux/apis/genders/gendersApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";
import { ItemKeys } from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

const AdminPersonalDataContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const idAdminLoginState = useAppSelector(
    (state) => state.adminLogin.id_number
  );

  const idNumberAdminState = useAppSelector((state) => state.admin.id_number);

  const nameAdminState = useAppSelector((state) => state.admin.name);
  const lastNameAdminState = useAppSelector((state) => state.admin.last_name);
  const idTypeNumberAdminState = useAppSelector(
    (state) => state.admin.admin_id_type
  );
  const genderNumberAdminState = useAppSelector(
    (state) => state.admin.admin_gender
  );
  const positionLevelNumberAdminState = useAppSelector(
    (state) => state.admin.position_level
  );
  const companyAreaNumberAdminState = useAppSelector(
    (state) => state.admin.company_area
  );
  const emailAdminState = useAppSelector(
    (state) => state.admin.corporate_email
  );
  const authMethodAdminState = useAppSelector(
    (state) => state.eps.authentication_method
  );

  const idTypeNameAdminState = useAppSelector(
    (state) => state.admin.admin_id_type_abbrev
  );
  const genderNameAdminState = useAppSelector(
    (state) => state.admin.admin_gender_abbrev
  );
  const positionLevelNameAdminState = useAppSelector(
    (state) => state.admin.position_level_abbrev
  );
  const companyAreaNameAdminState = useAppSelector(
    (state) => state.admin.company_area_abbrev
  );

  const selectedKeyState = useAppSelector((state) => state.modal.selectedKey);

  const {
    data: isAdminData,
    isLoading: isAdminLoading,
    isFetching: isAdminFetching,
    error: isAdminError,
  } = useGetAdminByIdNumberQuery(idNumberAdminState);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: allGendersData,
    isLoading: allGendersLoading,
    isFetching: allGendersFetching,
    error: allGendersError,
  } = useGetAllGendersQuery(null);

  const {
    data: allPositionsLevelData,
    isLoading: allPositionsLevelLoading,
    isFetching: allPositionsLevelFetching,
    error: allPositionsLevelError,
  } = useGetAllPositionLevelsQuery(null);

  const {
    data: allCompanyAreasData,
    isLoading: allCompanyAreasLoading,
    isFetching: allCompanyAreasFetching,
    error: allCompanyAreasError,
  } = useGetAllCompanyAreaQuery(null);

  const idTypeGetName = transformIdToNameMap(idTypesData);
  const genderGetName = transformIdToNameMap(allGendersData);
  const positionLevelGetName = transformIdToNameMap(allPositionsLevelData);
  const companyAreaGetName = transformIdToNameMap(allCompanyAreasData);

  useEffect(() => {
    if (!idNumberAdminState) {
      dispatch(setIdNumberAdmin(idAdminLoginState));
    }

    if (
      !nameAdminState ||
      !lastNameAdminState ||
      !genderNumberAdminState ||
      !idTypeNumberAdminState ||
      !positionLevelNumberAdminState ||
      !companyAreaNumberAdminState ||
      !emailAdminState ||
      (!authMethodAdminState &&
        isAdminData &&
        !isAdminLoading &&
        !isAdminFetching)
    ) {
      dispatch(setNameAdmin(isAdminData?.name));
      dispatch(setLastNameAdmin(isAdminData?.last_name));
      dispatch(setIdTypeAdmin(isAdminData?.admin_id_type));
      dispatch(setGenderAdmin(isAdminData?.admin_gender));
      dispatch(setPositionLevelAdmin(isAdminData?.position_level));
      dispatch(setCompanyAreaAdmin(isAdminData?.company_area));
      dispatch(setCorporateEmailAdmin(isAdminData?.corporate_email));
      dispatch(setAuthMethodAdmin(isAdminData?.authentication_method));
    }

    if (idTypeNumberAdminState && idTypesData) {
      const idTypeName = idTypeGetName[idTypeNumberAdminState];

      dispatch(setIdTypeAbbrevAdmin(idTypeName));
    }
    if (genderNumberAdminState && allGendersData) {
      const genderName = genderGetName[genderNumberAdminState];

      dispatch(setGenderAbbrevAdmin(genderName));
    }
    if (positionLevelNumberAdminState && allPositionsLevelData) {
      const positionLevelName =
        positionLevelGetName[positionLevelNumberAdminState];

      dispatch(setPositionLevelAbbrevAdmin(positionLevelName));
    }
    if (companyAreaNumberAdminState && allCompanyAreasData) {
      const companyAreaName = companyAreaGetName[companyAreaNumberAdminState];

      dispatch(setCompanyAreaAbbrevAdmin(companyAreaName));
    }

    if (selectedKeyState !== ItemKeys.SUB_UPDATE_PERSONAL_DATA_KEY) {
      dispatch(setSelectedKey(ItemKeys.SUB_UPDATE_PERSONAL_DATA_KEY));
    }
  }, [
    idNumberAdminState,
    nameAdminState,
    lastNameAdminState,
    genderNumberAdminState,
    idTypeNumberAdminState,
    positionLevelNumberAdminState,
    companyAreaNumberAdminState,
    emailAdminState,
    authMethodAdminState,
    isAdminData,
    isAdminLoading,
    isAdminFetching,
    idTypesData,
    allGendersData,
    allPositionsLevelData,
    allCompanyAreasData,
  ]);

  return (
    <CustomDashboardLayout
      customLayoutContent={
        <div
          style={{
            width: "80%",
            display: "flex",
            flexFlow: "column wrap",
          }}
        >
          <AdminPersonalDataForm />
        </div>
      }
    />
  );
};

export default AdminPersonalDataContent;
