"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../utils/enums/user_roles.enum";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import EpsRequestListLayout from "@/components/eps/request_list/EpsRequestListLayout";

import { setIdNumberUserEps } from "@/redux/features/eps/epsSlice";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

import { useGetUserByIdNumberEpsQuery } from "@/redux/apis/users/usersApi";

const EpsRequestListPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [UserRolType.EPS];
  useRoleValidation(allowedRoles);

  const idNumberUserEpsLoginState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );
  const idNumberEpsState = useAppSelector((state) => state.eps.id_number);
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

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
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [status, idNumberUserEpsLoginState, idNumberEpsState]);

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserEpsLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="request-list-page-eps-content">
          <EpsRequestListLayout />
        </div>
      )}
    </>
  );
};

export default EpsRequestListPage;
