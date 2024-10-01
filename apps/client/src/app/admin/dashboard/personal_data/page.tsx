"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { AdminRolType } from "../../../utils/enums/admin_roles.enum";

import AdminPersonalDataContent from "@/components/admin/personal_data/AdminPersonalDataContent";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setIdNumberAdmin } from "@/redux/features/admin/adminSlice";
import {
  setIsPageLoading,
  setAdminModalIsOpen,
  setSelectedKey,
} from "@/redux/features/common/modal/modalSlice";

import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";

import { ItemKeys } from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

const AdminPersonalDataPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [AdminRolType.SUPER_ADMIN, AdminRolType.ADMIN];
  useRoleValidation(allowedRoles);

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

  const selectedKeyState = useAppSelector((state) => state.modal.selectedKey);

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
    if (
      isPageLoadingState &&
      selectedKeyState !== ItemKeys.SUB_STATISTICS_REQ_KEY
    ) {
      dispatch(setIsPageLoading(false));
      dispatch(setSelectedKey(ItemKeys.SUB_STATISTICS_REQ_KEY));
    }
  }, [status, idNumberAdminLoginState, idNumberAdminState]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberAdminLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="dashboard-admin-personal-data-content">
          <AdminPersonalDataContent />
        </div>
      )}
    </div>
  );
};

export default AdminPersonalDataPage;
