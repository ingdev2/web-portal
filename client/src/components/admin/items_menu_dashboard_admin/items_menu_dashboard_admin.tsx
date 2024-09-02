import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { LuFileText } from "react-icons/lu";
import { RiFileList3Line } from "react-icons/ri";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { getItem } from "@/helpers/get_item_menu_dashboard_layout/get_item_menu_dashboard_layout";
import { MenuItem } from "@/helpers/get_item_menu_dashboard_layout/types/menu_item_type";

import {
  setIdNumberAdmin,
  setCompanyAreaAdmin,
  setRoleAdmin,
} from "@/redux/features/admin/adminSlice";

import {
  useGetAllMedicalReqUsersQuery,
  useGetAllMedicalReqUsersToLegalAreaQuery,
} from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";
import { useGetCompanyAreaByNameQuery } from "@/redux/apis/company_area/companyAreaApi";
import { useGetAdminRoleByNameQuery } from "@/redux/apis/admin_roles/adminRolesApi";

import { CompanyAreaEnum } from "../../../../../api/src/utils/enums/company_area.enum";
import { RequirementStatusEnum } from "@/../../api/src/medical_req/enums/requirement_status.enum";
import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";
import { AdminRolType } from "../../../../../api/src/utils/enums/admin_roles.enum";

import { isAdminWithRoles } from "@/helpers/is_admin_with_roles/is_admin_with_roles";
import { isAdminInCompanyAreas } from "@/helpers/is_admin_in_company_areas/is_admin_in_company_areas";

export const useMenuItems = () => {
  const dispatch = useAppDispatch();

  const idNumberAdminLoginState = useAppSelector(
    (state) => state.adminLogin.id_number
  );
  const idNumberAdminState = useAppSelector((state) => state.admin.id_number);
  const roleIdAdminState = useAppSelector((state) => state.admin.admin_role);
  const companyAreaIdAdminState = useAppSelector(
    (state) => state.admin.company_area
  );

  const tableRowIdState = useAppSelector((state) => state.modal.tableRowId);
  const tableRowFilingNumberState = useAppSelector(
    (state) => state.modal.tableRowFilingNumber
  );

  const { data: superAdminRoleData, error: superAdminRoleError } =
    useGetAdminRoleByNameQuery({
      name: AdminRolType.SUPER_ADMIN,
    });

  const { data: adminRoleData, error: adminRoleError } =
    useGetAdminRoleByNameQuery({
      name: AdminRolType.ADMIN,
    });

  const { data: systemsCompanyAreaData, error: systemsCompanyAreaError } =
    useGetCompanyAreaByNameQuery({
      name: CompanyAreaEnum.SYSTEM_DEPARTAMENT,
    });

  const { data: archivesCompanyAreaData, error: archivesCompanyAreaError } =
    useGetCompanyAreaByNameQuery({
      name: CompanyAreaEnum.ARCHIVES_DEPARTAMENT,
    });

  const { data: legalCompanyAreaData, error: legalCompanyAreaError } =
    useGetCompanyAreaByNameQuery({
      name: CompanyAreaEnum.LEGAL_DEPARTAMENT,
    });

  const { data: admissionsCompanyAreaData, error: admissionsCompanyAreaError } =
    useGetCompanyAreaByNameQuery({
      name: CompanyAreaEnum.ADMISSIONS_DEPARTMENT,
    });

  const {
    data: allMedicalReqStatusCreatedData,
    refetch: refetchAllMedicalReqStatusCreated,
  } = useGetAllMedicalReqUsersQuery({ status: RequirementStatusEnum.CREATED });

  const {
    data: allMedicalReqLegalAreaStatusUnderReviewData,
    refetch: refetchAllMedicalReqStatusUnderReview,
  } = useGetAllMedicalReqUsersToLegalAreaQuery({
    status: RequirementStatusEnum.UNDER_REVIEW,
  });

  const {
    data: adminData,
    isLoading: adminDataLoading,
    isFetching: adminDataFetching,
    error: adminDataError,
  } = useGetAdminByIdNumberQuery(idNumberAdminLoginState);

  useEffect(() => {
    if (!idNumberAdminState) {
      dispatch(setIdNumberAdmin(adminData?.id_number));
    }
    if (!roleIdAdminState) {
      dispatch(setRoleAdmin(adminData?.admin_role));
    }
    if (!companyAreaIdAdminState) {
      dispatch(setCompanyAreaAdmin(adminData?.company_area));
    }
    if (tableRowIdState || tableRowFilingNumberState) {
      refetchAllMedicalReqStatusCreated();
      refetchAllMedicalReqStatusUnderReview();
    }
  }, [
    idNumberAdminState,
    idNumberAdminLoginState,
    roleIdAdminState,
    companyAreaIdAdminState,
    tableRowIdState,
    tableRowFilingNumberState,
  ]);

  const waitAdminData =
    superAdminRoleData &&
    !superAdminRoleError &&
    adminRoleData &&
    !adminRoleError &&
    systemsCompanyAreaData &&
    !systemsCompanyAreaError &&
    archivesCompanyAreaData &&
    !archivesCompanyAreaError &&
    legalCompanyAreaData &&
    !legalCompanyAreaError &&
    admissionsCompanyAreaData &&
    !admissionsCompanyAreaError;

  if (waitAdminData) {
    const items: MenuItem[] = [
      getItem(
        ItemNames.ITEM_REQUESTS,
        ItemKeys.ITEM_REQUESTS_KEY,
        <LuFileText />,
        [
          getItem(
            ItemNames.SUB_STATISTICS_REQ,
            ItemKeys.SUB_STATISTICS_REQ_KEY,
            <RiFileList3Line />
          ),
          isAdminWithRoles(roleIdAdminState, [
            superAdminRoleData.id,
            adminRoleData.id,
          ]) &&
          isAdminInCompanyAreas(companyAreaIdAdminState, [
            systemsCompanyAreaData.id,
            archivesCompanyAreaData.id,
          ])
            ? getItem(
                ItemNames.SUB_ALL_REQUESTS,
                ItemKeys.SUB_ALL_REQUESTS_REQ_KEY,
                <RiFileList3Line />,
                undefined,
                allMedicalReqStatusCreatedData?.length
              )
            : null,
          isAdminWithRoles(roleIdAdminState, [adminRoleData.id]) &&
          isAdminInCompanyAreas(companyAreaIdAdminState, [
            legalCompanyAreaData.id,
          ])
            ? getItem(
                ItemNames.SUB_ALL_LEGAL_REQUESTS,
                ItemKeys.SUB_ALL_LEGAL_REQUESTS_REQ_KEY,
                <RiFileList3Line />,
                undefined,
                allMedicalReqLegalAreaStatusUnderReviewData?.length
              )
            : null,
        ].filter(Boolean)
      ),

      getItem(
        ItemNames.ITEM_USERS,
        ItemKeys.ITEM_USERS_KEY,
        <MenuFoldOutlined />,
        [
          isAdminWithRoles(roleIdAdminState, [
            superAdminRoleData.id,
            adminRoleData.id,
          ]) &&
          isAdminInCompanyAreas(companyAreaIdAdminState, [
            systemsCompanyAreaData.id,
          ])
            ? getItem(
                ItemNames.SUB_ADMIN_USERS,
                ItemKeys.SUB_ADMIN_USERS_KEY,
                <MenuUnfoldOutlined />
              )
            : null,
          isAdminWithRoles(roleIdAdminState, [
            superAdminRoleData.id,
            adminRoleData.id,
          ]) &&
          isAdminInCompanyAreas(companyAreaIdAdminState, [
            systemsCompanyAreaData.id,
            archivesCompanyAreaData.id,
          ])
            ? getItem(
                ItemNames.SUB_EPS_AUDITORS,
                ItemKeys.SUB_EPS_AUDITORS_KEY,
                <MenuUnfoldOutlined />
              )
            : null,
          isAdminWithRoles(roleIdAdminState, [
            superAdminRoleData.id,
            adminRoleData.id,
          ]) &&
          isAdminInCompanyAreas(companyAreaIdAdminState, [
            systemsCompanyAreaData.id,
            archivesCompanyAreaData.id,
            admissionsCompanyAreaData.id,
          ])
            ? getItem(
                ItemNames.SUB_PATIENT_USERS,
                ItemKeys.SUB_PATIENT_USERS_KEY,
                <MenuUnfoldOutlined />
              )
            : null,
          isAdminInCompanyAreas(companyAreaIdAdminState, [
            systemsCompanyAreaData.id,
            archivesCompanyAreaData.id,
            admissionsCompanyAreaData.id,
          ])
            ? getItem(
                ItemNames.SUB_RELATIVES_USERS,
                ItemKeys.SUB_RELATIVES_USERS_KEY,
                <MenuUnfoldOutlined />
              )
            : null,
        ].filter(Boolean)
      ),

      getItem(
        ItemNames.ITEM_PARAMETRIZATION,
        ItemKeys.ITEM_PARAMETRIZATION_KEY,
        <MenuFoldOutlined />,
        [
          isAdminWithRoles(roleIdAdminState, [
            superAdminRoleData.id,
            adminRoleData.id,
          ]) &&
          isAdminInCompanyAreas(companyAreaIdAdminState, [
            systemsCompanyAreaData.id,
          ])
            ? getItem(
                ItemNames.SUB_EPS_COMPANIES_PARAMS,
                ItemKeys.SUB_EPS_COMPANIES_PARAMS_KEY,
                <MenuUnfoldOutlined />
              )
            : null,
        ].filter(Boolean)
      ),
    ];

    return items;
  }
};
