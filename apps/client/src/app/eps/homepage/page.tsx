"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../../../../apps/api/src/utils/enums/user_roles.enum";

import EpsHomeLayout from "@/components/eps/homepage/EpsHomeLayout";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setIdNumberUserEps } from "@/redux/features/eps/epsSlice";
import {
  setEpsModalIsOpen,
  setIsPageLoading,
} from "@/redux/features/common/modal/modalSlice";

import { useGetUserByIdNumberEpsQuery } from "@/redux/apis/users/usersApi";

const HomePageEps = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [UserRolType.EPS];
  useRoleValidation(allowedRoles);

  const epsModalState = useAppSelector((state) => state.modal.epsModalIsOpen);
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idNumberUserEpsLoginState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );
  const idNumberEpsState = useAppSelector((state) => state.eps.id_number);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: userEpsData,
    isLoading: userEpsLoading,
    isFetching: userEpsFetching,
    error: userEpsError,
  } = useGetUserByIdNumberEpsQuery(idNumberUserEpsLoginState);

  useEffect(() => {
    if (!idNumberEpsState) {
      dispatch(setIdNumberUserEps(userEpsData?.id_number));
    }
    if (!idNumberUserEpsLoginState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
      redirect("/login");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login");
    }
    if (epsModalState) {
      dispatch(setEpsModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [status, idNumberUserEpsLoginState, idNumberEpsState, epsModalState]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserEpsLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="homepage-eps-content">
          <EpsHomeLayout />
        </div>
      )}
    </div>
  );
};

export default HomePageEps;
