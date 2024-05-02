"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Card, Col, Row, Space, Divider } from "antd";
import CustomSpin from "../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../common/custom_messages/CustomMessage";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import PatientDataCard from "./PatientDataCard";

const PatientHomepageContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const namePatientState = useAppSelector((state) => state.patient.name);
  const idTypePatientState = useAppSelector(
    (state) => state.patient.user_id_type
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const genderPatientState = useAppSelector(
    (state) => state.patient.user_gender
  );
  const emailPatientState = useAppSelector((state) => state.patient.email);
  const cellphonePatientState = useAppSelector(
    (state) => state.patient.cellphone
  );
  const whatsappPatientState = useAppSelector(
    (state) => state.patient.whatsapp
  );
  const affiliationEpsPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const residenceAddressPatientState = useAppSelector(
    (state) => state.patient.residence_address
  );
  const errorsPatientState = useAppSelector((state) => state.patient.errors);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberPatientState);

  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  return (
    <>
      {userPatientLoading && userPatientFetching ? (
        <CustomSpin />
      ) : (
        <PatientDataCard />
      )}
    </>
  );
};

export default PatientHomepageContent;
