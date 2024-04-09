"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { useGetAllRelativesQuery } from "@/redux/apis/relatives/relativesApi";

const DashboardAdminPage = () => {
  const { data: session, status } = useSession();

  const idTypeState = useAppSelector((state) => state.userLogin.id_type);
  const idNumberState = useAppSelector((state) => state.userLogin.id_number);
  const passwordState = useAppSelector((state) => state.userLogin.password);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: isRelativesData,
    isLoading: isRelativesLoading,
    isFetching: isRelativesFetching,
    isSuccess: isRelativesSuccess,
    isError: isRelativesError,
  } = useGetAllRelativesQuery(null);

  useEffect(() => {
    if (!idTypeState && !idNumberState && !passwordState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error en la petición!");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
    }
    if (!isRelativesData && isRelativesError) {
      setShowErrorMessage(true);
      setErrorMessage("Familiares no encontrados!");
    }
  }, [
    idTypeState,
    idNumberState,
    passwordState,
    isRelativesData,
    isRelativesError,
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
      {!idNumberState || !isRelativesData ? (
        <CustomSpin />
      ) : (
        <div>
          <h1>Dashboard</h1>
          <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
          <h2>Lista de Familiares del paciente</h2>

          {isRelativesFetching && isRelativesLoading && <CustomSpin />}

          {isRelativesData && isRelativesSuccess && (
            <ol>
              {isRelativesData.map((relative) => (
                <li key={relative.id}>
                  {relative.name}
                  {relative.email}
                  {relative.cellphone}
                  {relative.whatsapp}
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardAdminPage;
