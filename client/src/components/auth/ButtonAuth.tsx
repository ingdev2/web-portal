"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

import { Button } from "antd";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";

import {
  useGetUserByIdNumberPatientQuery,
  useGetUserByIdNumberEpsQuery,
} from "@/redux/apis/users/usersApi";

const ButtonAuth = () => {
  const { data: session, status }: any = useSession();

  const idNumberPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );

  const idNumberEpsState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  useEffect(() => {
    if (isUserPatientData && idNumberPatientState) {
      if (isUserPatientError) {
        setShowErrorMessage(true);
        setErrorMessage("¡Usuario no encontrado!");
      }
    }
    if (isUserEpsData && idNumberEpsState) {
      if (isUserEpsError) {
        setShowErrorMessage(true);
        setErrorMessage("¡Usuario no encontrado!");
      }
    }
  }, [
    isUserPatientData,
    isUserPatientError,
    idNumberPatientState,
    isUserEpsData,
    isUserEpsError,
    idNumberEpsState,
  ]);

  console.log({ session, status });

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
          marginInline: 13,
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
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: 1.3,
            marginBlock: 0,
          }}
        >
          Ingresaste con el correo electrónico:
        </h4>
        {isUserPatientData || isUserEpsData ? (
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
            {session?.user?.id_number === isUserPatientData?.id_number
              ? isUserPatientData?.email
              : null}

            {session?.user?.id_number === isUserEpsData?.id_number
              ? isUserEpsData?.email
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
          marginBottom: 13,
        }}
      >
        Ingresar al portal
      </Button>
    </div>
  );
};

export default ButtonAuth;
