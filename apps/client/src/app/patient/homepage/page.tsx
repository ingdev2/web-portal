"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "../../../utils/enums/user_roles.enum";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import PatientHomeLayout from "@/components/patient/homepage/PatientHomeLayout";

import { setIdNumberUserPatient } from "@/redux/features/patient/patientSlice";
import {
  setIsPageLoading,
  setPatientModalIsOpen,
} from "@/redux/features/common/modal/modalSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";

const HomePagePatient = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [UserRolType.PATIENT];
  useRoleValidation(allowedRoles);

  const patientModalState = useAppSelector(
    (state) => state.modal.patientModalIsOpen
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idNumberUserPatientLoginState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientLoginState);

  useEffect(() => {
    if (!idNumberPatientState) {
      dispatch(setIdNumberUserPatient(userPatientData?.id_number));
    }
    if (!idNumberUserPatientLoginState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
      redirect("/login");
    }
    if (status === "unauthenticated") {
      setShowErrorMessage(true);
      setErrorMessage("¡No autenticado!");
      redirect("/login");
    }
    if (patientModalState) {
      dispatch(setPatientModalIsOpen(false));
    }
    if (isPageLoadingState) {
      dispatch(setIsPageLoading(false));
    }
  }, [
    status,
    idNumberUserPatientLoginState,
    idNumberPatientState,
    patientModalState,
  ]);

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserPatientLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="homepage-patient-content">
          <PatientHomeLayout />
        </div>
      )}
    </div>
  );
};

export default HomePagePatient;
