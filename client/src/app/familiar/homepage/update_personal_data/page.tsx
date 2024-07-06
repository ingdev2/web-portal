"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../../../../api/src/utils/enums/user_roles.enum";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import EpsUpdatePersonalDataLayout from "@/components/eps/update_personal_data/EpsUpdatePersonalDataLayout";

import { setIdNumberUserEps } from "@/redux/features/eps/epsSlice";

import { useGetUserByIdNumberEpsQuery } from "@/redux/apis/users/usersApi";

const EpsUpdatePersonalDataPage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [UserRolType.EPS];
  useRoleValidation(allowedRoles);

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
        <div className="update-personal-data-page-eps-content">
          <EpsUpdatePersonalDataLayout />
        </div>
      )}
    </>
  );
};

export default EpsUpdatePersonalDataPage;
