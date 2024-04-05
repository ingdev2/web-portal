"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { useGetUserByIdNumberQuery } from "@/redux/apis/users/usersApi";

const DashboardAdminPage = () => {
  const { data: session, status } = useSession();

  const idTypeState = useAppSelector((state) => state.userLogin.id_type);
  const idNumberState = useAppSelector((state) => state.userLogin.id_number);
  const passwordState = useAppSelector((state) => state.userLogin.password);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: isUserData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isError: isUserError,
  } = useGetUserByIdNumberQuery(idNumberState);

  useEffect(() => {
    if (!idTypeState && !idNumberState && !passwordState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error en la petición!");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
    }
    if (!isUserData && isUserError) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
    }
  }, [
    idTypeState,
    idNumberState,
    passwordState,
    isUserData,
    isUserError,
    session,
  ]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}
      {!idNumberState || !isUserData ? (
        <CustomSpin />
      ) : (
        <div>
          <h1>Dashboard</h1>
          <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
          <ol>
            <li>{idNumberState}</li>
            <li>{isUserData.name}</li>
            <li>{isUserData.email}</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default DashboardAdminPage;
