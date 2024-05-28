"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col } from "antd";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import { IoMdArrowRoundBack } from "react-icons/io";
import PatientRequestCardList from "@/components/patient/request_list/request_list_content/patient_request_card_list/PatientRequestCardList";
import CustomEmptyButton from "@/components/common/custom_empty_button/CustomEmptyButton";
import CustomTags from "@/components/common/custom_tags/CustomTags";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

import {
  setIdUserPatient,
  setMedicalReqUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import {
  useGetAllMedicalReqOfAUsersQuery,
  useGetAllMedicalReqOfAFamiliarQuery,
} from "@/redux/apis/medical_req/medicalReqApi";

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
  } = useGetAllMedicalReqOfAUsersQuery(idUserPatientState);

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
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        alignContent: "center",
        paddingInline: "22px",
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
          justifyContent: "flex-start",
          paddingBlock: "7px",
          paddingInline: "7px",
        }}
      >
        <Button
          style={{
            paddingInline: "7px",
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

      {!userMedicalReqData &&
      userMedicalReqLoading &&
      userMedicalReqFetching ? (
        <CustomSpin />
      ) : Array.isArray(userMedicalReqData) ? (
        <Card
          key={"card-list-of-request-content"}
          style={{
            width: "100%",
            maxWidth: "450px",
            alignContent: "center",
            backgroundColor: "#fcfcfc",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <h4
            style={{
              ...titleStyleCss,
              fontSize: "13pt",
              textAlign: "center",
              paddingBottom: "7px",
            }}
          >
            Total de <b>{userMedicalReqData.length} solicitud(es)</b>
          </h4>

          <PatientRequestCardList
            requestCardListData={userMedicalReqData}
            titleCardList="N° Radicado:"
            descriptionCardList1="Tipo de solicitud:"
            descriptionCardList2="Estado de solicitud:"
            descriptionCardList3="Fecha de solicitud:"
            descriptionCardList4="Fecha de respuesta:"
            iconButtonDetails={<FaRegEye />}
            titleButtonDetails="Ver detalles"
            backgroundColorButtonDetails="#015E90"
            onClickButtonDetails={() => {}}
            iconButtonDelete={<MdDeleteOutline />}
            titleButtonDelete="Eliminar"
            backgroundColorButtonDelete="#8C1111"
            onClickButtonDelete={() => {}}
          />
        </Card>
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
    </div>
  );
};

export default ListOfRequests;
