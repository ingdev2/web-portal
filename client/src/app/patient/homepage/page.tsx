"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../../../api/src/utils/enums/user_roles.enum";

import { Card, Col } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import { useGetAllRelativesQuery } from "@/redux/apis/relatives/relativesApi";
import PatientHomeLayout from "@/components/patient/homepage/PatientHomeLayout";

const HomePagePatient = () => {
  const { data: session, status } = useSession();

  const allowedRoles = [UserRolType.PATIENT];
  useRoleValidation(allowedRoles);

  const idNumberUserPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
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
    if (!idNumberUserPatientState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
    }
  }, [status, idNumberUserPatientState]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserPatientState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div
          className="homepage-patient-content"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          <PatientHomeLayout />
        </div>
      )}
    </div>
  );
};

export default HomePagePatient;
