"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

import { Col, Row } from "antd";
import CustomSpin from "../../../common/custom_spin/CustomSpin";
import PatientDataCard from "./patient_data_card/PatientDataCard";
import HomepageOptions from "./homepage_options/HomepageOptions";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";

const PatientHomepageContent: React.FC = () => {
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
        <>
          <PatientDataCard />

          <HomepageOptions />
        </>
      )}
    </>
  );
};

export default PatientHomepageContent;
