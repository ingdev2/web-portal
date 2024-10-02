"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "@/utils/enums/user_roles.enum";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import FamiliarRequestListLayout from "@/components/familiar/request_list/FamiliarRequestListLayout";

import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";
import { setIdUserFamiliar } from "@/redux/features/familiar/familiarSlice";

import { useGetFamiliarByIdQuery } from "@/redux/apis/relatives/relativesApi";

const FamiliarRequestListPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [UserRolType.AUTHORIZED_FAMILIAR];
  useRoleValidation(allowedRoles);

  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idUserFamiliarLoginState = useAppSelector(
    (state) => state.familiarLogin.id
  );
  const idUserFamiliarState = useAppSelector((state) => state.familiar.id);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: userFamiliarData,
    isLoading: userFamiliarLoading,
    isFetching: userFamiliarFetching,
    error: userFamiliarError,
  } = useGetFamiliarByIdQuery(idUserFamiliarLoginState);

  useEffect(() => {
    if (!idUserFamiliarState) {
      dispatch(setIdUserFamiliar(userFamiliarData?.id));
    }
    if (!idUserFamiliarState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
      redirect("/login");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login");
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [status, idUserFamiliarLoginState, idUserFamiliarState]);

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idUserFamiliarLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="request-list-page-familiar-content">
          <FamiliarRequestListLayout />
        </div>
      )}
    </>
  );
};

export default FamiliarRequestListPage;
