"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getFirstNameAndFirstLastName } from "@/helpers/get_first_name/get_first_name";

import { Card, Row, Col, Divider } from "antd";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";

import {
  setIdUserFamiliar,
  setNameUserFamiliar,
  setLastNameUserFamiliar,
  setIdTypeUserFamiliar,
  setIdTypeAbbrevUserFamiliar,
  setGenderUserFamiliar,
  setGenderAbbrevUserFamiliar,
  setIdNumberUserFamiliar,
  setPatientIdNumberFamiliar,
  setPatientNameFamiliar,
  setEmailUserFamiliar,
  setCellphoneUserFamiliar,
  setAuthMethodUserFamiliar,
  setRelWithPatientFamiliar,
  setRelWithPatientAbbrevFamiliar,
  setErrorsUserFamiliar,
  setDefaultValuesUserFamiliar,
} from "@/redux/features/familiar/familiarSlice";

import { useGetFamiliarByIdQuery } from "@/redux/apis/relatives/relativesApi";
import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useGetIdTypeByIdQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetGenderByIdQuery } from "@/redux/apis/genders/gendersApi";
import { useGetRelationshipTypeByIdQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";

const FamiliarDataCard: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idFamiliarState = useAppSelector((state) => state.familiar.id);
  const nameFamiliarState = useAppSelector((state) => state.familiar.name);
  const lastNameFamiliarState = useAppSelector(
    (state) => state.familiar.last_name
  );
  const idTypeNumberFamiliarState = useAppSelector(
    (state) => state.familiar.user_id_type
  );
  const idNumberFamiliarState = useAppSelector(
    (state) => state.familiar.id_number
  );
  const genderNumberFamiliarState = useAppSelector(
    (state) => state.familiar.user_gender
  );
  const emailFamiliarState = useAppSelector((state) => state.familiar.email);
  const cellphoneFamiliarState = useAppSelector(
    (state) => state.familiar.cellphone
  );
  const patientIdNumberState = useAppSelector(
    (state) => state.familiar.patient_id_number
  );
  const patientNameState = useAppSelector(
    (state) => state.familiar.patient_name
  );
  const relWithPatientNumberState = useAppSelector(
    (state) => state.familiar.rel_with_patient
  );
  const relWithPatientAbbrevState = useAppSelector(
    (state) => state.familiar.rel_with_patient_abbrev
  );
  const errorsFamiliarState = useAppSelector((state) => state.familiar.errors);

  const [showErrorMessageFamiliar, setShowErrorMessageFamiliar] =
    useState(false);

  const {
    data: userFamiliarData,
    isLoading: userFamiliarLoading,
    isFetching: userFamiliarFetching,
    error: userFamiliarError,
  } = useGetFamiliarByIdQuery(idFamiliarState, {
    skip: !idFamiliarState,
  });

  const {
    data: patientUserData,
    isLoading: patientUserLoading,
    isFetching: patientUserFetching,
    error: patientUserError,
  } = useGetUserByIdNumberPatientQuery(patientIdNumberState);

  const {
    data: idTypeNameUserData,
    isLoading: idTypeNameUserLoading,
    isFetching: idTypeNameUserFetching,
    error: idTypeNameUserError,
  } = useGetIdTypeByIdQuery(idTypeNumberFamiliarState);

  const {
    data: genderNameUserData,
    isLoading: genderNameUserLoading,
    isFetching: genderNameUserFetching,
    error: genderNameUserError,
  } = useGetGenderByIdQuery(genderNumberFamiliarState);

  const {
    data: relWithPatientFamiliarData,
    isLoading: relWithPatientFamiliarLoading,
    isFetching: relWithPatientFamiliarFetching,
    error: relWithPatientFamiliarError,
  } = useGetRelationshipTypeByIdQuery(relWithPatientNumberState);

  useEffect(() => {
    if (
      idFamiliarState &&
      userFamiliarData &&
      !userFamiliarFetching &&
      !userFamiliarLoading &&
      !userFamiliarError
    ) {
      dispatch(setNameUserFamiliar(userFamiliarData?.name));
      dispatch(setLastNameUserFamiliar(userFamiliarData?.last_name));
      dispatch(setIdTypeUserFamiliar(userFamiliarData?.user_id_type));
      dispatch(setIdNumberUserFamiliar(userFamiliarData?.id_number));
      dispatch(setGenderUserFamiliar(userFamiliarData?.user_gender));
      dispatch(setEmailUserFamiliar(userFamiliarData?.email));
      dispatch(setCellphoneUserFamiliar(userFamiliarData?.cellphone));
      dispatch(
        setAuthMethodUserFamiliar(userFamiliarData?.authentication_method)
      );
      dispatch(setRelWithPatientFamiliar(userFamiliarData?.rel_with_patient));
      dispatch(setPatientIdNumberFamiliar(userFamiliarData.patient_id_number));
    }
    if (idTypeNumberFamiliarState && idTypeNameUserData) {
      dispatch(setIdTypeAbbrevUserFamiliar(idTypeNameUserData.name));
    }
    if (genderNumberFamiliarState && genderNameUserData) {
      dispatch(setGenderAbbrevUserFamiliar(genderNameUserData.name));
    }
    if (
      patientUserData &&
      !patientUserFetching &&
      !patientUserLoading &&
      !patientUserError
    ) {
      dispatch(
        setPatientNameFamiliar(
          getFirstNameAndFirstLastName(patientUserData.name)
        )
      );
    }
    if (
      relWithPatientFamiliarData &&
      !relWithPatientFamiliarFetching &&
      !relWithPatientFamiliarLoading &&
      !relWithPatientFamiliarError &&
      relWithPatientNumberState
    ) {
      dispatch(
        setRelWithPatientAbbrevFamiliar(relWithPatientFamiliarData.name)
      );
    }
  }, [
    idFamiliarState,
    userFamiliarData,
    userFamiliarError,
    idTypeNumberFamiliarState,
    idTypeNameUserData,
    genderNumberFamiliarState,
    genderNameUserData,
    patientUserData,
    patientUserError,
    relWithPatientFamiliarData,
    relWithPatientFamiliarError,
    relWithPatientNumberState,
  ]);

  return (
    <>
      {userFamiliarLoading &&
      userFamiliarFetching &&
      patientUserFetching &&
      patientUserLoading ? (
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
          {showErrorMessageFamiliar && (
            <CustomMessage
              typeMessage="error"
              message={
                errorsFamiliarState?.toString() || "¡Error en la petición!"
              }
            />
          )}

          <Card
            key={"card-familiar-data-homepage"}
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
                  className="familiar-welcome-card-title"
                  style={{
                    ...titleStyleCss,
                    marginBottom: "0px",
                  }}
                >
                  Bienvenido señor(a):
                </h3>

                <h3
                  className="familiar-name-data"
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
                  {`${nameFamiliarState} ${lastNameFamiliarState}`}
                </h3>
              </Col>

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                style={{
                  padding: "2px 13px",
                  textAlign: "start",
                }}
              >
                <h3
                  className="familiar-id-number-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Número de identificación familiar:
                </h3>

                <h3
                  className="familiar-id-number-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {idNumberFamiliarState}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />

                <h3
                  className="patient-name-familiar-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Nombre de paciente asignado:
                </h3>

                <h3
                  className="patient-name-familiar-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {patientNameState}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />
              </Col>

              <Col
                xs={24}
                sm={12}
                md={12}
                lg={12}
                style={{
                  padding: "2px 13px",
                  textAlign: "start",
                }}
              >
                <h3
                  className="familiar-email-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Correo electrónico familiar:
                </h3>

                <h3
                  className="familiar-email-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {emailFamiliarState}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />

                <h3
                  className="familiar-cellphone-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Parentesco con el paciente asignado:
                </h3>

                <h3
                  className="familiar-relationship-with-patient-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {relWithPatientAbbrevState || NOT_REGISTER}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />
              </Col>
            </Row>
          </Card>
        </Col>
      )}
    </>
  );
};

export default FamiliarDataCard;
