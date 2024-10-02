"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Card, Row, Col, Divider } from "antd";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/../common/custom_spin/CustomSpin";
import CustomMessage from "@/../common/custom_messages/CustomMessage";

import {
  setIdUserEps,
  setNameUserEps,
  setLastNameUserEps,
  setIdTypeUserEps,
  setIdNumberUserEps,
  setEmailUserEps,
  setCellphoneUserEps,
  setCompanyAreaUserEps,
  setEpsCompanyUserEps,
  setErrorsUserEps,
  setDefaultValuesUserEps,
  setIdTypeAbbrevUserEps,
  setGenderUserEps,
  setGenderAbbrevUserEps,
  setEpsCompanyAbbrevUserEps,
  setAuthMethodUserEps,
} from "@/redux/features/eps/epsSlice";

import { useGetUserByIdNumberEpsQuery } from "@/redux/apis/users/usersApi";
import { useGetEpsCompanyByIdQuery } from "@/redux/apis/eps_company/epsCompanyApi";
import { useGetIdTypeByIdQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetGenderByIdQuery } from "@/redux/apis/genders/gendersApi";

const EpsDataCard: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const nameEpsState = useAppSelector((state) => state.eps.name);
  const lastNameEpsState = useAppSelector((state) => state.eps.last_name);
  const idTypeNumberEpsState = useAppSelector(
    (state) => state.eps.user_id_type
  );
  const idTypeNameEpsState = useAppSelector(
    (state) => state.eps.id_type_abbrev
  );
  const idNumberEpsState = useAppSelector((state) => state.eps.id_number);
  const genderNumberEpsState = useAppSelector((state) => state.eps.user_gender);
  const genderNameEpsState = useAppSelector(
    (state) => state.eps.user_gender_abbrev
  );
  const emailEpsState = useAppSelector((state) => state.eps.email);
  const cellphoneEpsState = useAppSelector((state) => state.eps.cellphone);
  const epsCompanyEpsState = useAppSelector((state) => state.eps.eps_company);
  const epsCompanyNameEpsState = useAppSelector(
    (state) => state.eps.eps_company_abbrev
  );
  const errorsPatientState = useAppSelector((state) => state.eps.errors);

  const [showErrorMessageEps, setShowErrorMessagePatient] = useState(false);

  const {
    data: userEpsData,
    isLoading: userEpsLoading,
    isFetching: userEpsFetching,
    error: userEpsError,
  } = useGetUserByIdNumberEpsQuery(idNumberEpsState);

  const {
    data: idTypeNameUserData,
    isLoading: idTypeNameUserLoading,
    isFetching: idTypeNameUserFetching,
    error: idTypeNameUserError,
  } = useGetIdTypeByIdQuery(idTypeNumberEpsState);

  const {
    data: genderNameUserData,
    isLoading: genderNameUserLoading,
    isFetching: genderNameUserFetching,
    error: genderNameUserError,
  } = useGetGenderByIdQuery(genderNumberEpsState);

  const {
    data: epsCompanyUserEpsData,
    isLoading: epsCompanyUserEpsLoading,
    isFetching: epsCompanyUserEpsFetching,
    error: epsCompanyUserEpsError,
  } = useGetEpsCompanyByIdQuery(epsCompanyEpsState);

  useEffect(() => {
    if (idNumberEpsState && userEpsData) {
      dispatch(setNameUserEps(userEpsData?.name));
      dispatch(setLastNameUserEps(userEpsData?.last_name));
      dispatch(setIdTypeUserEps(userEpsData?.user_id_type));
      dispatch(setGenderUserEps(userEpsData?.user_gender));
      dispatch(setEmailUserEps(userEpsData?.email));
      dispatch(setCellphoneUserEps(userEpsData?.cellphone));
      dispatch(setAuthMethodUserEps(userEpsData?.authentication_method));
      dispatch(setEpsCompanyUserEps(userEpsData?.eps_company));
      dispatch(setCompanyAreaUserEps(userEpsData?.company_area));
    }
    if (idTypeNumberEpsState && idTypeNameUserData) {
      dispatch(setIdTypeAbbrevUserEps(idTypeNameUserData.name));
    }
    if (genderNumberEpsState && genderNameUserData) {
      dispatch(setGenderAbbrevUserEps(genderNameUserData.name));
    }
    if (epsCompanyEpsState && epsCompanyUserEpsData) {
      dispatch(setEpsCompanyAbbrevUserEps(epsCompanyUserEpsData.name));
    }
  }, [
    idNumberEpsState,
    userEpsData,
    idTypeNumberEpsState,
    idTypeNameUserData,
    epsCompanyUserEpsData,
  ]);

  return (
    <>
      {userEpsLoading && userEpsFetching && !epsCompanyUserEpsData ? (
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
          {showErrorMessageEps && (
            <CustomMessage
              typeMessage="error"
              message={
                errorsPatientState?.toString() || "¡Error en la petición!"
              }
            />
          )}

          <Card
            key={"card-eps-data-homepage"}
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
                  className="eps-welcome-card-title"
                  style={{
                    ...titleStyleCss,
                    marginBottom: "0px",
                  }}
                >
                  Bienvenido señor(a):
                </h3>

                <h3
                  className="eps-name-data"
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
                  {`${nameEpsState} ${lastNameEpsState}`}
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
                  className="eps-id-type-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Número de identificación:
                </h3>

                <h3
                  className="eps-id-type-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {idNumberEpsState}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />

                <h3
                  className="eps-affiliation-eps-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  EPS de usuario:
                </h3>

                <h3
                  className="eps-company-eps-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {epsCompanyNameEpsState}
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
                  className="eps-email-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Correo electrónico:
                </h3>

                <h3
                  className="eps-email-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {emailEpsState}
                </h3>

                <Divider style={{ marginBlock: "7px", borderWidth: "1.3px" }} />

                <h3
                  className="eps-cellphone-subtitle"
                  style={{
                    ...titleStyleCss,
                  }}
                >
                  Número de celular:
                </h3>

                <h3
                  className="eps-cellphone-data"
                  style={{
                    ...subtitleStyleCss,
                    color: "#3F97AF",
                    textAlign: "end",
                  }}
                >
                  {cellphoneEpsState || NOT_REGISTER}
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

export default EpsDataCard;
