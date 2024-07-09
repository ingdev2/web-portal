"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../../../../api/src/utils/enums/user_roles.enum";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import FamiliarCreateRequestLayout from "@/components/familiar/create_request/FamiliarCreateRequestLayout";
import CustomLoadingOverlay from "@/components/common/custom_loading_overlay/CustomLoadingOverlay";

import { setIdNumberUserFamiliar } from "@/redux/features/familiar/familiarSlice";

import { useGetFamiliarByIdNumberQuery } from "@/redux/apis/relatives/relativesApi";

const CreateRequestFamiliarPage = () => {
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
  }, [status, idNumberUserFamiliarLoginState, idNumberFamiliarState]);

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      <CustomLoadingOverlay isLoading={isPageLoadingState} />

      {!idNumberUserFamiliarLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="create-request-page-familiar-content">
          <FamiliarCreateRequestLayout />
        </div>
      )}
    </>
  );
};

export default CreateRequestFamiliarPage;
