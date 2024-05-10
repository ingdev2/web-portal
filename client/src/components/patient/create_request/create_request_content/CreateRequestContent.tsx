"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

import CustomSpin from "../../../common/custom_spin/CustomSpin";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";

const CreateRequestContent: React.FC = () => {
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberPatientState);

  return (
    <>
      {userPatientLoading && userPatientFetching ? (
        <CustomSpin />
      ) : (
        <>Contenido de crear solicitud</>
      )}
    </>
  );
};

export default CreateRequestContent;
