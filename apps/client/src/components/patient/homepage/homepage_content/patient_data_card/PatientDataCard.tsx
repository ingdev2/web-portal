"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Card, Row, Col, Divider } from "antd";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";

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
  setGenderUserPatient,
  setGenderAbbrevUserPatient,
  setAuthMethodUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useGetIdTypeByIdQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetGenderByIdQuery } from "@/redux/apis/genders/gendersApi";

const PatientDataCard: React.FC = () => {
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
  const genderNumberPatientState = useAppSelector(
    (state) => state.patient.user_gender
  );
  const genderNamePatientState = useAppSelector(
    (state) => state.patient.user_gender_abbrev
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

  const {
    data: genderNameUserData,
    isLoading: genderNameUserLoading,
    isFetching: genderNameUserFetching,
    error: genderNameUserError,
  } = useGetGenderByIdQuery(genderNumberPatientState);

  useEffect(() => {
    if (idNumberPatientState && userPatientData) {
      dispatch(setNameUserPatient(userPatientData?.name));
      dispatch(setIdTypeUserPatient(userPatientData?.user_id_type));
      dispatch(setGenderUserPatient(userPatientData?.user_gender));
      dispatch(setEmailUserPatient(userPatientData?.email));
      dispatch(setCellphoneUserPatient(userPatientData?.cellphone));
      dispatch(setWhatsappUserPatient(userPatientData?.whatsapp));
      dispatch(
        setResidenceAddressUserPatient(userPatientData?.residence_address)
      );
      dispatch(setAffiliationEpsUserPatient(userPatientData?.affiliation_eps));
      dispatch(
        setAuthMethodUserPatient(userPatientData?.authentication_method)
      );
    }
    if (idTypeNumberPatientState && idTypeNameUserData) {
      dispatch(setIdTypeAbbrevUserPatient(idTypeNameUserData.name));
    }
    if (genderNumberPatientState && genderNameUserData) {
      dispatch(setGenderAbbrevUserPatient(genderNameUserData.name));
    }
  }, [
    idNumberPatientState,
    userPatientData,
    idTypeNumberPatientState,
    idTypeNameUserData,
  ]);

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100vw",
        maxWidth: "720px",
        minWidth: "231px",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        padding: "0px",
        margin: "0px",
      }}
    >
      {showErrorMessagePatient && (
        <CustomMessage
          typeMessage="error"
          message={errorsPatientState?.toString() || "¡Error en la petición!"}
        />
      )}

      {userPatientLoading && userPatientFetching ? (
        <CustomSpin />
      ) : (
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          style={{
            width: "100vw",
            maxWidth: "720px",
            minWidth: "345px",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            padding: "0px",
            margin: "0px",
          }}
        >
          <Card
            key={"card-patient-data-homepage"}
            style={{
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#fcfcfc",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
              padding: "0px",
              marginInline: "13px",
            }}
          >
            <Row
              justify={"space-between"}
              align={"top"}
              style={{ width: "100%", display: "flex", flexFlow: "row wrap" }}
            >
              <Col
                xs={24}
                sm={24}
                md={24}
                lg={24}
                style={{
                  padding: "2px 2px",
                  textAlign: "center",
                }}
              >
                <h3
                  className="patient-welcome-card-title"
                  style={{
                    ...titleStyleCss,
                    marginBottom: "0px",
                  }}
                >
                  Bienvenido señor(a):
                </h3>

                <h3
                  className="patient-name-data"
                  style={{
                    color: "#3F97AF",
                    fontSize: 20,
                    lineHeight: 1.3,
                    fontWeight: "bold",
                    textAlign: "center",
                    marginTop: "0px",
                    marginBottom: "8px",
                  }}
                >
                  {namePatientState}
                </h3>
              </Col>

              <Col
                xs={24}
                sm={10}
                md={10}
                lg={10}
                style={{
                  padding: "2px 13px",
                  textAlign: "start",
                }}
              >
                <h3
                  className="patient-id-type-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Número de identificación:
                </h3>

                <h3
                  className="patient-id-type-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {idNumberPatientState}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />

                <h3
                  className="patient-affiliation-eps-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  EPS de afiliación:
                </h3>

                <h3
                  className="patient-affiliation-eps-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {affiliationEpsPatientState}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />
              </Col>

              <Col
                xs={24}
                sm={14}
                md={14}
                lg={14}
                style={{
                  padding: "2px 13px",
                  textAlign: "start",
                }}
              >
                <h3
                  className="patient-email-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Correo electrónico:
                </h3>

                <h3
                  className="patient-email-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {emailPatientState}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />

                <h3
                  className="patient-cellphone-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Número de celular:
                </h3>

                <h3
                  className="patient-cellphone-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {cellphonePatientState}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />
              </Col>
            </Row>
          </Card>
        </Col>
      )}
    </Col>
  );
};

export default PatientDataCard;
