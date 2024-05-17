"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import { IoMdArrowRoundBack } from "react-icons/io";
import CustomEmptyButton from "@/components/common/custom_empty_button/CustomEmptyButton";

import {
  setIdUserPatient,
  setMedicalReqUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import {
  useGetAllMedicalReqOfAUsersQuery,
  useGetAllMedicalReqOfAFamiliarQuery,
} from "@/redux/apis/medical_req/medicalReqApi";
import CustomEmpty from "@/components/common/custom_empty/CustomEmpty";

const ListOfRequests: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idNumberUserPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const medicalReqErrorsState = useAppSelector(
    (state) => state.medicalReq.errors
  );

  const [modalOpenRequestDetails, setModalOpenRequestDetails] = useState(false);
  const [showErrorMessageMedicalReq, setShowErrorMessageMedicalReq] =
    useState(false);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  const {
    data: userMedicalReqData,
    isLoading: userMedicalReqLoading,
    isFetching: userMedicalReqFetching,
    error: userMedicalReqError,
  } = useGetAllMedicalReqOfAUsersQuery(idUserPatientState, {
    refetchOnMountOrArgChange: true,
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
    userMedicalReqData,
    userMedicalReqLoading,
    userMedicalReqFetching,
  ]);

  return (
    <>
      <Col
        xs={24}
        sm={24}
        md={24}
        lg={24}
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "column wrap",
          alignContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "flex-start",
            paddingBlock: "7px",
            paddingInline: "20px",
          }}
        >
          <Button
            style={{
              paddingInline: 17,
              color: "#015E90",
              fontWeight: "bold",
              display: "flex",
              flexFlow: "row wrap",
              alignContent: "center",
              alignItems: "center",
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
        </div>

        <Card
          key={"card-create-medical-req-form"}
          style={{
            width: "max-content",
            height: "max-content",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
            marginBottom: "31px",
            marginInline: "31px",
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

          <Col
            xs={24}
            sm={24}
            md={24}
            lg={24}
            style={{
              padding: "0 2px",
              width: "100vw",
              minWidth: "270px",
              maxWidth: "321px",
            }}
          >
            {!userMedicalReqData &&
            userMedicalReqLoading &&
            userMedicalReqFetching ? (
              <CustomSpin />
            ) : Array.isArray(userMedicalReqData) ? (
              <ul>
                {userMedicalReqData.map((req) => (
                  <li key={req.id}>
                    <p>Filing Number: {req.filing_number}</p>
                    <p>Aplicant Name: {req.aplicant_name}</p>
                    <p>User Message: {req.user_message}</p>
                    <p>Req Type: {req.requirement_type}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <CustomEmptyButton
                titleCustomEmpty="Sin solicitudes"
                buttonCustomEmpty="Crear nueva solicitud"
                handleClickCustomEmpty={() => {
                  router.push("/patient/homepage/create_request", {
                    scroll: true,
                  });
                }}
              />
            )}
          </Col>
        </Card>
      </Col>
    </>
  );
};

export default ListOfRequests;
