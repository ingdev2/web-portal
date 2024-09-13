"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import FamiliarRequestCardList from "../eps_request_card_list/FamiliarRequestCardList";
import CustomEmptyButton from "@/components/common/custom_empty_button/CustomEmptyButton";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdPostAdd } from "react-icons/md";

import { setIdUserFamiliar } from "@/redux/features/familiar/familiarSlice";

import { useGetFamiliarByIdQuery } from "@/redux/apis/relatives/relativesApi";
import { useGetAllMedicalReqOfAFamiliarQuery } from "@/redux/apis/medical_req/medicalReqApi";

const FamiliarListOfRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idUserFamiliarState = useAppSelector((state) => state.familiarLogin.id);
  const medicalReqErrorsState = useAppSelector(
    (state) => state.medicalReq.errors
  );

  const [showErrorMessageMedicalReq, setShowErrorMessageMedicalReq] =
    useState(false);

  const {
    data: userFamiliarData,
    isLoading: userFamiliarLoading,
    isFetching: userFamiliarFetching,
    error: userFamiliarError,
  } = useGetFamiliarByIdQuery(idUserFamiliarState);

  const {
    data: userMedicalReqData,
    isLoading: userMedicalReqLoading,
    isFetching: userMedicalReqFetching,
    error: userMedicalReqError,
  } = useGetAllMedicalReqOfAFamiliarQuery(idUserFamiliarState, {
    // pollingInterval: 7000,
    // skipPollingIfUnfocused: true,
  });

  useEffect(() => {
    if (
      userFamiliarData &&
      !userFamiliarLoading &&
      !userFamiliarFetching &&
      !idUserFamiliarState
    ) {
      dispatch(setIdUserFamiliar(userFamiliarData.id));
    }
  }, [
    userFamiliarData,
    userFamiliarLoading,
    userFamiliarFetching,
    idUserFamiliarState,
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
          message={
            medicalReqErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBlock: "7px",
          paddingInline: "7px",
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
            router.push("/familiar/homepage", {
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
          className="go-to-create-request-page-button-familiar"
          icon={<MdPostAdd size={17} />}
          onClick={() => {
            router.push("/familiar/homepage/create_request", {
              scroll: true,
            });
          }}
        >
          Crear solicitud
        </Button>
      </div>

      {!userMedicalReqData &&
      userMedicalReqLoading &&
      userMedicalReqFetching ? (
        <CustomSpin />
      ) : Array.isArray(userMedicalReqData) ? (
        <Card
          key={"card-list-of-request-content-familiar"}
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
            Total de <b>{userMedicalReqData.length} solicitud(es)</b>
          </h2>

          <FamiliarRequestCardList requestCardListData={userMedicalReqData} />
        </Card>
      ) : (
        <Card
          key={"card-list-of-request-content-familiar"}
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
            titleCustomEmpty="Sin solicitudes"
            buttonCustomEmpty="Crear nueva solicitud"
            handleClickCustomEmpty={() => {
              router.push("/familiar/homepage/create_request", {
                scroll: true,
              });
            }}
          />
        </Card>
      )}
    </Col>
  );
};

export default FamiliarListOfRequests;
