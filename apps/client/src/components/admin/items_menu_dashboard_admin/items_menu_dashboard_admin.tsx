import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { MenuItem } from "@/helpers/get_item_menu_dashboard_layout/types/menu_item_type";
import { getItem } from "@/helpers/get_item_menu_dashboard_layout/get_item_menu_dashboard_layout";
import { LuFileText } from "react-icons/lu";
import { RiFileList3Line, RiUserHeartLine } from "react-icons/ri";
import { FaUsers, FaChartPie, FaHospitalUser } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { MdOutlineFamilyRestroom } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { IoIosBusiness } from "react-icons/io";
import { BiCommentX } from "react-icons/bi";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { SiGoogleclassroom } from "react-icons/si";
import { AiOutlineAudit } from "react-icons/ai";
import { TbLogs } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { PiUserListBold } from "react-icons/pi";

import {
  setIdNumberAdmin,
  setRoleAdmin,
  setCompanyAreaAdmin,
  setPositionLevelAdmin,
} from "@/redux/features/admin/adminSlice";

import {
  useGetAllMedicalReqUsersQuery,
  useGetAllMedicalReqUsersToLegalAreaQuery,
} from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";
import { useGetAdminRoleByNameQuery } from "@/redux/apis/admin_roles/adminRolesApi";
import { useGetCompanyAreaByNameQuery } from "@/redux/apis/company_area/companyAreaApi";
import { useGetPositionLevelByNameQuery } from "@/redux/apis/position_level/positionLevelApi";

import { AdminRolType } from "@/utils/enums/admin_roles.enum";
import { PositionLevelEnum } from "@/utils/enums/position_level.enum";
import { CompanyAreaEnum } from "@/utils/enums/company_area.enum";
import { RequirementStatusEnum } from "@/utils/enums/requirement_status.enum";
import {
  ItemKeys,
  ItemNames,
} from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

import { isAdminWithRoles } from "@/helpers/is_admin_with_roles/is_admin_with_roles";
import { isAdminInCompanyAreas } from "@/helpers/validations_to_view_admin_menu_item/is_admin_in_company_areas/is_admin_in_company_areas";
import { isAdminInPositionLevel } from "@/helpers/validations_to_view_admin_menu_item/is_admin_in_position_level/is_admin_in_position_level";

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
  const positionLevelIdAdminState = useAppSelector(
    (state) => state.admin.position_level
  );

  const tableRowIdState = useAppSelector((state) => state.modal.tableRowId);
  const tableRowFilingNumberState = useAppSelector(
    (state) => state.modal.tableRowFilingNumber
  );

  // ROLES //

  const { data: superAdminRoleData, error: superAdminRoleError } =
    useGetAdminRoleByNameQuery({
      name: AdminRolType.SUPER_ADMIN,
    });

  const { data: adminRoleData, error: adminRoleError } =
    useGetAdminRoleByNameQuery({
      name: AdminRolType.ADMIN,
    });

  // NIVEL DE CARGO //

  const { data: directorPositionLevelData, error: directorPositionLevelError } =
    useGetPositionLevelByNameQuery({
      name: PositionLevelEnum.DIRECTOR,
    });

  const {
    data: coordinatorPositionLevelData,
    error: coordinatorPositionLevelError,
  } = useGetPositionLevelByNameQuery({
    name: PositionLevelEnum.COORDINATOR,
  });

  const {
    data: colaboratorPositionLevelData,
    error: colaboratorPositionLevelError,
  } = useGetPositionLevelByNameQuery({
    name: PositionLevelEnum.COLLABORATOR,
  });

  const { data: auditorPositionLevelData, error: auditorPositionLevelError } =
    useGetPositionLevelByNameQuery({
      name: PositionLevelEnum.AUDITOR,
    });

  // AREAS //

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

  const { data: externalAuditorData, error: externalAuditorError } =
    useGetCompanyAreaByNameQuery({
      name: CompanyAreaEnum.EXTERNAL_AUDITOR,
    });

  // ESTADOS DE SOLICITUDES //

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
    if (!positionLevelIdAdminState) {
      dispatch(setPositionLevelAdmin(adminData?.position_level));
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
    positionLevelIdAdminState,
    tableRowIdState,
    tableRowFilingNumberState,
  ]);

  const waitAdminData =
    superAdminRoleData &&
    !superAdminRoleError &&
    adminRoleData &&
    !adminRoleError &&
    directorPositionLevelData &&
    !directorPositionLevelError &&
    coordinatorPositionLevelData &&
    !coordinatorPositionLevelError &&
    systemsCompanyAreaData &&
    colaboratorPositionLevelData &&
    !colaboratorPositionLevelError &&
    auditorPositionLevelData &&
    !auditorPositionLevelError &&
    !systemsCompanyAreaError &&
    archivesCompanyAreaData &&
    !archivesCompanyAreaError &&
    legalCompanyAreaData &&
    !legalCompanyAreaError &&
    admissionsCompanyAreaData &&
    !admissionsCompanyAreaError &&
    externalAuditorData &&
    !externalAuditorError;

  if (waitAdminData) {
    const items: MenuItem[] = [
      getItem(
        ItemNames.ITEM_REQUESTS,
        ItemKeys.ITEM_REQUESTS_KEY,
        <LuFileText size={17} />,
        [
          getItem(
            ItemNames.SUB_STATISTICS_REQ,
            ItemKeys.SUB_STATISTICS_REQ_KEY,
            <FaChartPie size={15} />
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
                <RiFileList3Line size={15} />,
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
                <RiFileList3Line size={15} />,
                undefined,
                allMedicalReqLegalAreaStatusUnderReviewData?.length
              )
            : null,
        ].filter(Boolean)
      ),

      isAdminInPositionLevel(positionLevelIdAdminState, [
        directorPositionLevelData.id,
        coordinatorPositionLevelData.id,
        colaboratorPositionLevelData.id,
      ])
        ? getItem(
            ItemNames.ITEM_USERS,
            ItemKeys.ITEM_USERS_KEY,
            <FaUsers size={17} />,
            [
              isAdminWithRoles(roleIdAdminState, [superAdminRoleData.id]) &&
              isAdminInCompanyAreas(companyAreaIdAdminState, [
                systemsCompanyAreaData.id,
              ]) &&
              isAdminInPositionLevel(positionLevelIdAdminState, [
                directorPositionLevelData.id,
                coordinatorPositionLevelData.id,
              ])
                ? getItem(
                    ItemNames.SUB_ADMIN_USERS,
                    ItemKeys.SUB_ADMIN_USERS_KEY,
                    <GrUserAdmin size={15} />
                  )
                : null,

              isAdminWithRoles(roleIdAdminState, [
                superAdminRoleData.id,
                adminRoleData.id,
              ]) &&
              isAdminInCompanyAreas(companyAreaIdAdminState, [
                systemsCompanyAreaData.id,
                archivesCompanyAreaData.id,
              ]) &&
              isAdminInPositionLevel(positionLevelIdAdminState, [
                directorPositionLevelData.id,
                coordinatorPositionLevelData.id,
              ])
                ? getItem(
                    ItemNames.SUB_EPS_AUDITORS,
                    ItemKeys.SUB_EPS_AUDITORS_KEY,
                    <FaHospitalUser size={15} />
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
              ]) &&
              isAdminInPositionLevel(positionLevelIdAdminState, [
                directorPositionLevelData.id,
                coordinatorPositionLevelData.id,
                colaboratorPositionLevelData.id,
              ])
                ? getItem(
                    ItemNames.SUB_PATIENT_USERS,
                    ItemKeys.SUB_PATIENT_USERS_KEY,
                    <RiUserHeartLine size={15} />
                  )
                : null,

              isAdminInCompanyAreas(companyAreaIdAdminState, [
                systemsCompanyAreaData.id,
                archivesCompanyAreaData.id,
                admissionsCompanyAreaData.id,
              ]) &&
              isAdminInPositionLevel(positionLevelIdAdminState, [
                directorPositionLevelData.id,
                coordinatorPositionLevelData.id,
                colaboratorPositionLevelData.id,
              ])
                ? getItem(
                    ItemNames.SUB_RELATIVES_USERS,
                    ItemKeys.SUB_RELATIVES_USERS_KEY,
                    <MdOutlineFamilyRestroom size={15} />
                  )
                : null,
            ].filter(Boolean)
          )
        : null,

      isAdminInPositionLevel(positionLevelIdAdminState, [
        directorPositionLevelData.id,
        coordinatorPositionLevelData.id,
      ])
        ? getItem(
            ItemNames.ITEM_PARAMETRIZATION,
            ItemKeys.ITEM_PARAMETRIZATION_KEY,
            <IoSettingsSharp size={17} />,
            [
              isAdminWithRoles(roleIdAdminState, [
                superAdminRoleData.id,
                adminRoleData.id,
              ]) &&
              isAdminInCompanyAreas(companyAreaIdAdminState, [
                systemsCompanyAreaData.id,
                archivesCompanyAreaData.id,
              ]) &&
              isAdminInPositionLevel(positionLevelIdAdminState, [
                directorPositionLevelData.id,
                coordinatorPositionLevelData.id,
              ])
                ? getItem(
                    ItemNames.SUB_EPS_COMPANIES_PARAMS,
                    ItemKeys.SUB_EPS_COMPANIES_PARAMS_KEY,
                    <IoIosBusiness size={15} />
                  )
                : null,

              isAdminWithRoles(roleIdAdminState, [
                superAdminRoleData.id,
                adminRoleData.id,
              ]) &&
              isAdminInCompanyAreas(companyAreaIdAdminState, [
                systemsCompanyAreaData.id,
                archivesCompanyAreaData.id,
              ]) &&
              isAdminInPositionLevel(positionLevelIdAdminState, [
                directorPositionLevelData.id,
                coordinatorPositionLevelData.id,
              ])
                ? getItem(
                    ItemNames.SUB_REASONS_FOR_REJECTION_PARAMS,
                    ItemKeys.SUB_REASONS_FOR_REJECTION_PARAMS_KEY,
                    <BiCommentX size={15} />
                  )
                : null,

              isAdminWithRoles(roleIdAdminState, [
                superAdminRoleData.id,
                adminRoleData.id,
              ]) &&
              isAdminInCompanyAreas(companyAreaIdAdminState, [
                systemsCompanyAreaData.id,
                archivesCompanyAreaData.id,
              ]) &&
              isAdminInPositionLevel(positionLevelIdAdminState, [
                directorPositionLevelData.id,
                coordinatorPositionLevelData.id,
              ])
                ? getItem(
                    ItemNames.SUB_REQ_TYPES_PARAMS,
                    ItemKeys.SUB_REQ_TYPES_PARAMS_KEY,
                    <VscGitPullRequestGoToChanges size={15} />
                  )
                : null,

              isAdminWithRoles(roleIdAdminState, [superAdminRoleData.id]) &&
              isAdminInCompanyAreas(companyAreaIdAdminState, [
                systemsCompanyAreaData.id,
              ]) &&
              isAdminInPositionLevel(positionLevelIdAdminState, [
                directorPositionLevelData.id,
                coordinatorPositionLevelData.id,
              ])
                ? getItem(
                    ItemNames.SUB_COMPANY_AREAS_PARAMS,
                    ItemKeys.SUB_COMPANY_AREAS_PARAMS_KEY,
                    <SiGoogleclassroom size={15} />
                  )
                : null,
            ].filter(Boolean)
          )
        : null,

      isAdminInPositionLevel(positionLevelIdAdminState, [
        directorPositionLevelData.id,
        auditorPositionLevelData.id,
      ]) &&
      isAdminInCompanyAreas(companyAreaIdAdminState, [
        systemsCompanyAreaData.id,
        externalAuditorData.id,
      ])
        ? getItem(
            ItemNames.ITEM_AUDIT,
            ItemKeys.ITEM_AUDIT_KEY,
            <AiOutlineAudit size={17} />,
            [
              getItem(
                ItemNames.SUB_AUDIT_LOGS,
                ItemKeys.SUB_AUDIT_LOGS_KEY,
                <TbLogs size={15} />
              ),
            ].filter(Boolean)
          )
        : null,

      getItem(
        ItemNames.ITEM_MY_PROFILE,
        ItemKeys.ITEM_MY_PROFILE_KEY,
        <CgProfile size={17} />,
        [
          getItem(
            ItemNames.SUB_UPDATE_PERSONAL_DATA,
            ItemKeys.SUB_UPDATE_PERSONAL_DATA_KEY,
            <PiUserListBold size={15} />
          ),
        ]
      ),
    ];

    return items;
  }
};
