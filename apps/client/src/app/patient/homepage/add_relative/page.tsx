"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRoleValidation } from "@/utils/hooks/use_role_validation";
import { UserRolType } from "shared/utils/enums/user_roles.enum";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import AddRelativeLayout from "@/components/patient/add_relative/AddRelativeLayout";

import { setIdNumberUserPatient } from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";

const AddRelativePage = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const allowedRoles = [UserRolType.PATIENT];
  useRoleValidation(allowedRoles);

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
  }, [status, idNumberUserPatientLoginState, idNumberPatientState]);

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Error en la petición!"}
        />
      )}

      {!idNumberUserPatientLoginState || status === "unauthenticated" ? (
        <CustomSpin />
      ) : (
        <div className="add-relative-page-content">
          <AddRelativeLayout />
        </div>
      )}
    </>
  );
};

export default AddRelativePage;
