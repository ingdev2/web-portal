"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";
import { notFound } from "next/navigation";
import { UserRolType } from "../../../../../api/src/utils/enums/user_roles.enum";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

const HomePageEps = () => {
  const { data: session, status } = useSession();

  const idNumberUserEpsState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (
      status === "authenticated" &&
      session &&
      session?.user.role !== UserRolType.EPS
    ) {
      notFound();
    }
    if (!idNumberUserEpsState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
    }
  }, [session, status, idNumberUserEpsState]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      <h1>Página Principal Eps</h1>

      {!idNumberUserEpsState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div>
          <pre>
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
        </div>
      )}
    </div>
  );
};

export default HomePageEps;
