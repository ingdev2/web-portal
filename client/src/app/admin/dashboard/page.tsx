"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { useGetAllRelativesQuery } from "@/redux/apis/relatives/relativesApi";

const DashboardAdminPage = () => {
  const { data: session, status } = useSession();

  const idNumberAdminState = useAppSelector(
    (state) => state.adminLogin.id_number
  );

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
    if (!idNumberAdminState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
    }
    if (!isRelativesData && isRelativesError) {
      setShowErrorMessage(true);
      setErrorMessage("Familiares no encontrados!");
    }
  }, [idNumberAdminState, isRelativesData, isRelativesError]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      <h1>Dashboard Admin</h1>

      {!idNumberAdminState ||
      !isRelativesData ||
      status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div>
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