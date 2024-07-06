"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../../../api/src/utils/enums/user_roles.enum";

import EpsHomeLayout from "@/components/eps/homepage/EpsHomeLayout";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setIdNumberUserFamiliar } from "@/redux/features/familiar/familiarSlice";
import {
  setFamiliarModalIsOpen,
  setIsPageLoading,
} from "@/redux/features/common/modal/modalSlice";

import { useGetFamiliarByIdNumberQuery } from "@/redux/apis/relatives/relativesApi";

const HomePageFamiliar = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [UserRolType.AUTHORIZED_FAMILIAR];
  useRoleValidation(allowedRoles);

  const familiarModalState = useAppSelector(
    (state) => state.modal.familiarModalIsOpen
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idNumberUserFamiliarLoginState = useAppSelector(
    (state) => state.familiarLogin.id_number_familiar
  );
  const idNumberFamiliarState = useAppSelector(
    (state) => state.familiar.id_number
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: userFamiliarData,
    isLoading: userEpsLoading,
    isFetching: userEpsFetching,
    error: userEpsError,
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
    if (familiarModalState) {
      dispatch(setFamiliarModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [
    status,
    idNumberUserFamiliarLoginState,
    idNumberFamiliarState,
    familiarModalState,
  ]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserFamiliarLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        // <div className="homepage-eps-content">
        //   <EpsHomeLayout />
        // </div>
        "FAMILIAR HOMEPAGE"
      )}
    </div>
  );
};

export default HomePageFamiliar;
