"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../../../api/src/utils/enums/user_roles.enum";

import FamiliarHomeLayout from "@/components/familiar/homepage/FamiliarHomeLayout";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setIdUserFamiliar } from "@/redux/features/familiar/familiarSlice";
import {
  setFamiliarModalIsOpen,
  setIsPageLoading,
} from "@/redux/features/common/modal/modalSlice";

import { useGetFamiliarByIdQuery } from "@/redux/apis/relatives/relativesApi";

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

  const idUserFamiliarState = useAppSelector((state) => state.familiar.id);
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
  } = useGetFamiliarByIdQuery(idUserFamiliarState, {
    skip: !idUserFamiliarState,
  });

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
    if (familiarModalState) {
      dispatch(setFamiliarModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [status, idUserFamiliarState, familiarModalState]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idUserFamiliarState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="homepage-familiar-content">
          <FamiliarHomeLayout />
        </div>
      )}
    </div>
  );
};

export default HomePageFamiliar;
