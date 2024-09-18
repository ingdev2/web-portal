"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import PatientRelativesCardList from "../patient_relatives_card_list/PatientRelativesCardList";
import CustomEmptyButton from "@/components/common/custom_empty_button/CustomEmptyButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdPostAdd } from "react-icons/md";

import { setIdUserPatient } from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useGetAllAuthorizedPatientRelativesQuery } from "@/redux/apis/users/usersApi";

const ListOfRelatives: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idNumberUserPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const relativesErrorsState = useAppSelector((state) => state.familiar.errors);

  const [showErrorMessageMedicalReq, setShowErrorMessageMedicalReq] =
    useState(false);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  const {
    data: userRelativesData,
    isLoading: userRelativesLoading,
    isFetching: userRelativesFetching,
    error: userRelativesError,
  } = useGetAllAuthorizedPatientRelativesQuery(idUserPatientState, {
    // pollingInterval: 7000,
    // skipPollingIfUnfocused: true,
  });

  useEffect(() => {
    if (
      userPatientData &&
      !userPatientLoading &&
      !userPatientFetching &&
      !idUserPatientState
    ) {
      dispatch(setIdUserPatient(userPatientData.id));
    }
  }, [
    userPatientData,
    userPatientLoading,
    userPatientFetching,
    idUserPatientState,
  ]);

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100vw",
        maxWidth: "450px",
        minWidth: "231px",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        padding: "0px",
        margin: "0px",
      }}
    >
      {showErrorMessageMedicalReq && (
        <CustomMessage
          typeMessage="error"
          message={relativesErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBlock: "7px",
          paddingInline: "13px",
        }}
      >
        <Button
          style={{
            color: "#015E90",
            fontWeight: "bold",
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
            paddingInline: "7px",
          }}
          type="link"
          size="large"
          className="back-to-homepage-button"
          icon={<IoMdArrowRoundBack size={17} />}
          onClick={() => {
            router.push("/patient/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>

        <Button
          style={{
            backgroundColor: "#1D8348",
            color: "#f2f2f2",
            fontWeight: "bold",
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
            paddingInline: "13px",
          }}
          type="primary"
          size="middle"
          className="go-to-create-request-page-button"
          icon={<MdPostAdd size={17} />}
          onClick={() => {
            router.push("/patient/homepage/add_relative", {
              scroll: true,
            });
          }}
        >
          Agregar familiar
        </Button>
      </div>

      {!userRelativesData && userRelativesLoading && userRelativesFetching ? (
        <CustomSpin />
      ) : Array.isArray(userRelativesData) ? (
        <Card
          key={"card-list-of-relatives-content"}
          style={{
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "0px",
            marginInline: "13px",
            marginBlock: "7px",
          }}
        >
          <h2
            style={{
              ...titleStyleCss,
              textAlign: "center",
            }}
          >
            Total de <b>{userRelativesData.length} familiar(es)</b>
          </h2>

          <PatientRelativesCardList relativesCardListData={userRelativesData} />
        </Card>
      ) : (
        <Card
          key={"card-list-of-relatives-content"}
          style={{
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            padding: "0px",
            marginInline: "13px",
            marginBlock: "7px",
          }}
        >
          <CustomEmptyButton
            titleCustomEmpty="Sin familiares"
            buttonCustomEmpty="Agregar nuevo familiar"
            handleClickCustomEmpty={() => {
              router.push("/patient/homepage/add_relative", {
                scroll: true,
              });
            }}
          />
        </Card>
      )}
    </Col>
  );
};

export default ListOfRelatives;
