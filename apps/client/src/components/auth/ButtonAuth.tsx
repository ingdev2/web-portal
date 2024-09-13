"use client";

import { useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "antd";
import { subtitleStyleCss } from "@/theme/text_styles";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";

import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";
import {
  useGetUserByIdNumberPatientQuery,
  useGetUserByIdNumberEpsQuery,
} from "@/redux/apis/users/usersApi";
import { useGetFamiliarByIdQuery } from "@/redux/apis/relatives/relativesApi";

const ButtonAuth = () => {
  const { data: session, status } = useSession();

  const idNumberAdminState = useAppSelector(
    (state) => state.adminLogin.id_number
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const idNumberEpsState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );
  const idFamiliarState = useAppSelector((state) => state.familiarLogin.id);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: isAdminData,
    isLoading: isAdminLoading,
    isFetching: isAdminFetching,
    isSuccess: isAdminSuccess,
    isError: isAdminError,
  } = useGetAdminByIdNumberQuery(idNumberAdminState);

  const {
    data: isUserPatientData,
    isLoading: isUserPatientLoading,
    isFetching: isUserPatientFetching,
    isError: isUserPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberPatientState);

  const {
    data: isUserEpsData,
    isLoading: isUserEpsLoading,
    isFetching: isUserEpsFetching,
    isError: isUserEpsError,
  } = useGetUserByIdNumberEpsQuery(idNumberEpsState);

  const {
    data: isUserFamiliarData,
    isLoading: isUserFamiliarLoading,
    isFetching: isUserFamiliarFetching,
    isError: isUserFamiliarError,
  } = useGetFamiliarByIdQuery(idFamiliarState, {
    skip: !idFamiliarState,
  });

  if (status === "loading") {
    return <CustomSpin />;
  }

  if (session && status === "authenticated") {
    return (
      <div
        className="content-authenticate"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginInline: "13px",
        }}
      >
        {showErrorMessage && (
          <CustomMessage
            typeMessage="error"
            message={errorMessage || "¡Error en la petición!"}
          />
        )}
        <h4
          style={{
            ...subtitleStyleCss,
          }}
        >
          Ingresaste con el correo electrónico:
        </h4>
        {isAdminData ||
        isUserPatientData ||
        isUserEpsData ||
        isUserFamiliarData ? (
          <h5
            style={{
              fontWeight: "bold",
              fontSize: 10,
              color: "#137A2B",
              lineHeight: 1.7,
              letterSpacing: 1.3,
              marginBlock: 13,
            }}
          >
            {session?.user?.id_number === isAdminData?.id_number
              ? isAdminData?.corporate_email
              : null}

            {session?.user?.id_number === isUserPatientData?.id_number
              ? isUserPatientData?.email
              : null}

            {session?.user?.id_number === isUserEpsData?.id_number
              ? isUserEpsData?.email
              : null}

            {session?.user?.id_number === isUserFamiliarData?.id_number
              ? isUserFamiliarData?.email
              : null}
          </h5>
        ) : (
          <h5
            style={{
              fontWeight: "bold",
              fontSize: 13,
              lineHeight: 0.8,
              color: "#960202",
              marginBlock: 4,
            }}
          >
            ¡No autenticado o error en petición!
          </h5>
        )}
        <Button
          type="primary"
          onClick={() => signOut()}
          className="button-signout"
          size="large"
          style={{
            fontWeight: "bold",
            paddingInline: 31,
            borderRadius: 31,
            backgroundColor: "#800000",
            color: "#f2f2f2",
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Button
        type="primary"
        onClick={() => signIn()}
        className="button-signin"
        size="large"
        style={{
          fontWeight: "bold",
          paddingInline: 31,
          borderRadius: 31,
          backgroundColor: "#015E90",
          color: "#f2f2f2",
        }}
      >
        Ingresar al portal
      </Button>
    </div>
  );
};

export default ButtonAuth;
