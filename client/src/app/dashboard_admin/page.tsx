"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

const DashboardAdminPage = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const id_type = useAppSelector((state) => state.userLogin.id_type);
  const id_number = useAppSelector((state) => state.userLogin.id_number);
  const password = useAppSelector((state) => state.userLogin.password);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!id_type && !id_number && !password) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error en la petición!");
    }
  }, [id_type, id_number, password]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}
      <h1>Dashboard</h1>
      {!id_type || !id_number || !password ? (
        <CustomSpin />
      ) : (
        <>
          <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
          <ol>
            <li>{id_type}</li>
            <li>{id_number}</li>
            <li>{password}</li>
          </ol>
        </>
      )}
    </div>
  );
};

export default DashboardAdminPage;
