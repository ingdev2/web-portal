"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { signIn, signOut, useSession } from "next-auth/react";

import { Button } from "antd";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";

import { useGetUserByIdNumberQuery } from "@/redux/apis/users/usersApi";

const ButtonAuth = () => {
  const { data: session, status } = useSession();

  const idNumberState = useAppSelector((state) => state.userLogin.id_number);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: isUserData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isError: isUserError,
  } = useGetUserByIdNumberQuery(idNumberState);

  useEffect(() => {
    if ((!isUserData && isUserError) || !idNumberState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
    }
  }, [isUserData, isUserError, idNumberState]);

  console.log({ session, status });

  if (status === "loading") {
    return <CustomSpin />;
  }

  if (session && idNumberState) {
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
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
            fontWeight: "normal",
            lineHeight: 1.3,
          }}
        >
          Ingresaste como:
          {isUserData ? (
            <p
              style={{
                fontWeight: "bold",
                fontSize: 15,
                lineHeight: 0.8,
                marginTop: 7,
                marginBottom: 2,
              }}
            >
              {isUserData?.email}
            </p>
          ) : (
            <p
              style={{
                fontWeight: "bold",
                fontSize: 15,
                lineHeight: 0.8,
                marginTop: 7,
                marginBottom: 2,
                color: "#960202",
              }}
            >
              ¡No autenticado o error en petición!
            </p>
          )}
        </h4>

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
            marginBottom: 13,
          }}
        >
          Cerrar sesión
        </Button>
      </div>
    );
  }
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
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
    </>
  );
};

export default ButtonAuth;
