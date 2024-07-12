"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../../../../api/src/utils/enums/user_roles.enum";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import FamiliarRequestListLayout from "@/components/familiar/request_list/FamiliarRequestListLayout";

import { setIdNumberUserFamiliar } from "@/redux/features/familiar/familiarSlice";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

import { useGetFamiliarByIdNumberQuery } from "@/redux/apis/relatives/relativesApi";

const FamiliarRequestListPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [UserRolType.AUTHORIZED_FAMILIAR];
  useRoleValidation(allowedRoles);

  const idNumberUserFamiliarLoginState = useAppSelector(
    (state) => state.familiarLogin.id_number_familiar
  );
  const idNumberFamiliarState = useAppSelector(
    (state) => state.familiar.id_number
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: userFamiliarData,
    isLoading: userFamiliarLoading,
    isFetching: userFamiliarFetching,
    error: userFamiliarError,
  } = useGetFamiliarByIdNumberQuery(idNumberUserFamiliarLoginState);

  useEffect(() => {
    if (!idNumberFamiliarState) {
      dispatch(setIdNumberUserFamiliar(userFamiliarData?.id_number));
    }
    if (!idNumberUserFamiliarLoginState) {
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
  }, [status, idNumberUserFamiliarLoginState, idNumberFamiliarState]);

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserFamiliarLoginState || status === "unauthenticated" ? (
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
