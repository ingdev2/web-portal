"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../../../api/src/utils/enums/user_roles.enum";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { setIdNumberUserEps } from "@/redux/features/eps/epsSlice";
import { setEpsModalIsOpen } from "@/redux/features/common/modal/modalSlice";

import { useGetUserByIdNumberEpsQuery } from "@/redux/apis/users/usersApi";

const HomePageEps = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [UserRolType.EPS];
  useRoleValidation(allowedRoles);

  const epsModalState = useAppSelector((state) => state.modal.epsModalIsOpen);

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
    if (!idNumberUserEpsLoginState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
    }
    if (!idNumberEpsState) {
      dispatch(setIdNumberUserEps(userEpsData?.id_number));
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
    }
    if (epsModalState) {
      dispatch(setEpsModalIsOpen(false));
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
          <h2>HomePage Eps</h2>
        </div>
      )}
    </div>
  );
};

export default HomePageEps;
