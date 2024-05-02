"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Card, Col, Row, Space, Divider } from "antd";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import CustomSpin from "../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../common/custom_messages/CustomMessage";

import {
  setIdUserPatient,
  setNameUserPatient,
  setIdTypeUserPatient,
  setIdNumberUserPatient,
  setEmailUserPatient,
  setCellphoneUserPatient,
  setWhatsappUserPatient,
  setResidenceAddressUserPatient,
  setAffiliationEpsUserPatient,
  setErrorsUserPatient,
  setDefaultValuesUserPatient,
  setIdTypeAbbrevUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useGetIdTypeByIdQuery } from "@/redux/apis/id_types/idTypesApi";

const PatientHomepageContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const namePatientState = useAppSelector((state) => state.patient.name);
  const idTypeNumberPatientState = useAppSelector(
    (state) => state.patient.user_id_type
  );
  const idTypeNamePatientState = useAppSelector(
    (state) => state.patient.id_type_abbrev
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

  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberPatientState);

  const {
    data: idTypeNameUserData,
    isLoading: idTypeNameUserLoading,
    isFetching: idTypeNameUserFetching,
    error: idTypeNameUserError,
  } = useGetIdTypeByIdQuery(idTypeNumberPatientState);

  useEffect(() => {
    if (idNumberPatientState) {
      dispatch(setNameUserPatient(userPatientData?.name));
      dispatch(setIdTypeUserPatient(userPatientData?.user_id_type));
      dispatch(setEmailUserPatient(userPatientData?.email));
      dispatch(setCellphoneUserPatient(userPatientData?.cellphone));
      dispatch(setWhatsappUserPatient(userPatientData?.whatsapp));
      dispatch(
        setResidenceAddressUserPatient(userPatientData?.residence_address)
      );
      dispatch(setAffiliationEpsUserPatient(userPatientData?.affiliation_eps));
    }
    if (idTypeNumberPatientState && idTypeNameUserData) {
      dispatch(setIdTypeAbbrevUserPatient(idTypeNameUserData.name));
    }
  }, [idNumberPatientState, idTypeNumberPatientState, idTypeNameUserData]);

  return (
    <>
      {userPatientLoading && userPatientFetching ? (
        <CustomSpin />
      ) : (
        <Card
          style={{
            maxWidth: "720px",
            width: "100%",
            height: "max-content",
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
            marginBottom: 31,
            padding: 2,
          }}
        >
          {showErrorMessagePatient && (
            <CustomMessage
              typeMessage="error"
              message={
                errorsPatientState?.toString() || "¡Error en la petición!"
              }
            />
          )}

          <Row justify={"space-between"} align={"middle"}>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={12}
              style={{ padding: "2px 22px", textAlign: "start" }}
            >
              <h3
                className="patient-data-card-title"
                style={{
                  ...titleStyleCss,
                }}
              >
                Bienvenido señor(a):
              </h3>
              <h3
                className="subtitle-patient-name"
                style={{
                  ...subtitleStyleCss,
                  color: "#3F97AF",
                  textAlign: "end",
                }}
              >
                {namePatientState}
              </h3>
              <Divider style={{ marginBlock: 2, borderWidth: "1.3px" }} />
              <h3
                className="id-number-subtitle"
                style={{
                  ...titleStyleCss,
                }}
              >
                Número de identificación:
              </h3>
              <h3
                style={{
                  ...subtitleStyleCss,
                  color: "#3F97AF",
                  textAlign: "end",
                }}
              >
                {idNumberPatientState}
              </h3>
              <Divider style={{ marginBlock: 2, borderWidth: "1.3px" }} />
              <h3
                className="id-number-subtitle"
                style={{
                  ...titleStyleCss,
                }}
              >
                EPS de afiliación:
              </h3>
              <h3
                style={{
                  ...subtitleStyleCss,
                  color: "#3F97AF",
                  textAlign: "end",
                }}
              >
                {affiliationEpsPatientState}
              </h3>
              <Divider style={{ marginBlock: 2, borderWidth: "1.3px" }} />
            </Col>
            <Col
              xs={24}
              sm={12}
              md={12}
              lg={12}
              style={{ padding: "2px 22px", textAlign: "start" }}
            >
              <h3
                className="patient-data-card-title"
                style={{
                  ...titleStyleCss,
                }}
              >
                Bienvenido señor(a):
              </h3>
              <h3
                className="subtitle-patient-name"
                style={{
                  ...subtitleStyleCss,
                  color: "#3F97AF",
                  textAlign: "end",
                }}
              >
                {namePatientState}
              </h3>
              <Divider style={{ marginBlock: 2, borderWidth: "1.3px" }} />
              <h3
                className="id-number-subtitle"
                style={{
                  ...titleStyleCss,
                }}
              >
                Número de identificación:
              </h3>
              <h3
                style={{
                  ...subtitleStyleCss,
                  color: "#3F97AF",
                  textAlign: "end",
                }}
              >
                {idNumberPatientState}
              </h3>
              <Divider style={{ marginBlock: 2, borderWidth: "1.3px" }} />
              <h3
                className="id-number-subtitle"
                style={{
                  ...titleStyleCss,
                }}
              >
                EPS de afiliación:
              </h3>
              <h3
                style={{
                  ...subtitleStyleCss,
                  color: "#3F97AF",
                  textAlign: "end",
                }}
              >
                {affiliationEpsPatientState}
              </h3>
              <Divider style={{ marginBlock: 2, borderWidth: "1.3px" }} />
            </Col>
          </Row>
        </Card>
      )}
    </>
  );
};

export default PatientHomepageContent;
