"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

const DashboardAdminPage = () => {
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const idType = useAppSelector((state) => state.userLogin.id_type);
  const idNumber = useAppSelector((state) => state.userLogin.id_number);
  const password = useAppSelector((state) => state.userLogin.password);
  const verificationCode = useAppSelector(
    (state) => state.userLogin.verification_code
  );

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!idType && !idNumber && !password) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error en la petición!");
    }
  }, [idType, idNumber, password]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}
      <h1>Dashboard</h1>
      {!idType || !idNumber || !password ? (
        <CustomSpin />
      ) : (
        <>
          <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
          <ol>
            <li>{idType}</li>
            <li>{idNumber}</li>
            <li>{password}</li>
            <li>{verificationCode}</li>
          </ol>
        </>
      )}
    </div>
  );
};

export default DashboardAdminPage;
