"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { useCompanyAreaValidation } from "@/utils/hooks/user_company_area_validation";
import { usePositionLevelValidation } from "@/utils/hooks/user_position_level_validation";

import AllCompanyAreasContent from "@/components/admin/all_company_areas/AllCompanyAreasContent";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setIdNumberAdmin } from "@/redux/features/admin/adminSlice";
import {
  setIsPageLoading,
  setAdminModalIsOpen,
} from "@/redux/features/common/modal/modalSlice";

import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";
import { useGetCompanyAreaByNameQuery } from "@/redux/apis/company_area/companyAreaApi";
import { useGetPositionLevelByNameQuery } from "@/redux/apis/position_level/positionLevelApi";

import { AdminRolType } from "@/utils/enums/admin_roles.enum";
import { CompanyAreaEnum } from "@/utils/enums/company_area.enum";
import { PositionLevelEnum } from "@/utils/enums/position_level.enum";

const AllCompanyAreasPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  // AREA //

  const { data: systemsCompanyAreaData, error: systemsCompanyAreaError } =
    useGetCompanyAreaByNameQuery({
      name: CompanyAreaEnum.SYSTEM_DEPARTMENT,
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

  const allowedRoles = [AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN];
  const allowedAreas = [systemsCompanyAreaData?.id];
  const allowedPositionLevels = [
    directorPositionLevelData?.id,
    coordinatorPositionLevelData?.id,
  ];

  useRoleValidation(allowedRoles);
  useCompanyAreaValidation(allowedAreas);
  usePositionLevelValidation(allowedPositionLevels);

  const waitAdminData =
    systemsCompanyAreaData &&
    !systemsCompanyAreaError &&
    directorPositionLevelData &&
    !directorPositionLevelError &&
    coordinatorPositionLevelData &&
    !coordinatorPositionLevelError;

  const adminModalState = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idNumberAdminLoginState = useAppSelector(
    (state) => state.adminLogin.id_number
  );

  const idNumberAdminState = useAppSelector((state) => state.admin.id_number);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    if (!idNumberAdminLoginState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
      redirect("/login_admin");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login_admin");
    }
    if (adminModalState) {
      dispatch(setAdminModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [
    status,
    idNumberAdminLoginState,
    idNumberAdminState,
    adminModalState,
    isPageLoadingState,
  ]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberAdminLoginState ||
      status === "unauthenticated" ||
      !waitAdminData ? (
        <CustomSpin />
      ) : (
        <div className="dashboard-all-company-areas-content">
          <AllCompanyAreasContent />
        </div>
      )}
    </div>
  );
};

export default AllCompanyAreasPage;
