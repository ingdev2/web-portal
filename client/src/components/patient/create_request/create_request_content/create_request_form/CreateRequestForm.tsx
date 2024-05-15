"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col, Divider, Form, Input, Select } from "antd";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import { titleStyleCss } from "@/theme/text_styles";
import { FcInfo } from "react-icons/fc";

import {
  setIdMedicalReq,
  setTypesMedicalReq,
  setReqTypeMedicalReq,
  setUserMessageMedicalReq,
  setErrorsMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";
import {
  setIdUserPatient,
  setMedicalReqUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useGetUserByIdQuery } from "@/redux/apis/users/usersApi";
import { useCreateMedicalReqPatientMutation } from "@/redux/apis/medical_req/medicalReqApi";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import TextArea from "antd/es/input/TextArea";

const CreateRequestForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const nameUserPatientState = useAppSelector((state) => state.patient.name);
  const idNumberUserPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const typesMedicalReqState = useAppSelector(
    (state) => state.medicalReq.typesMedicalReq
  );
  const reqTypeState = useAppSelector(
    (state) => state.medicalReq.requirement_type
  );
  const userMessageMedicalReqState = useAppSelector(
    (state) => state.medicalReq.user_message
  );
  const medicalReqErrosState = useAppSelector(
    (state) => state.medicalReq.errors
  );

  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [reqTypeNameLocalState, setReqTypeNameLocalState] = useState("");
  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewMedicalReq, setIsSubmittingNewMedicalReq] =
    useState(false);
  const [showErrorMessageMedicalReq, setShowErrorMessageMedicalReq] =
    useState(false);

  const {
    data: reqTypesData,
    isLoading: reqTypesLoading,
    isFetching: reqTypesFetching,
    error: reqTypesError,
  } = useGetAllMedicalReqTypesQuery(null);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  const [
    createMedicalReqPatient,
    {
      data: createMedicalReqPatientData,
      isLoading: createMedicalReqPatientLoading,
      isSuccess: createMedicalReqPatientSuccess,
      isError: createMedicalReqPatientError,
    },
  ] = useCreateMedicalReqPatientMutation({
    fixedCacheKey: "createMedicalReqPatientData",
  });

  useEffect(() => {
    if (!reqTypesLoading && !reqTypesFetching && reqTypesData) {
      dispatch(setTypesMedicalReq(reqTypesData));
    }
    if (
      !userPatientLoading &&
      !userPatientFetching &&
      userPatientData &&
      !idUserPatientState
    ) {
      dispatch(setIdUserPatient(userPatientData.id));
    }
    if (reqTypesError) {
      dispatch(
        setErrorsMedicalReq(
          "¡No se pudo obtener los tipos de requerimientos médicos!"
        )
      );
      setShowErrorMessageMedicalReq(true);
      dispatch(setTypesMedicalReq(setTypesMedicalReq));
    }
  }, [reqTypesData, reqTypesLoading, reqTypesFetching, reqTypesError]);

  const handleCreateRequest = () => {
    try {
      setModalIsOpenConfirm(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewMedicalReq(false);
    }
  };

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingNewMedicalReq(true);

      console.log("TIPO REQ", reqTypeState);
      console.log("MESSAGE", userMessageMedicalReqState);

      const response: any = await createMedicalReqPatient({
        userId: idUserPatientState,
        medicalReqPatient: {
          requirement_type: reqTypeState,
          user_message: userMessageMedicalReqState,
        },
      });

      console.log("DATA HERE", response);

      var isLoginUserError = response.error;

      var isLoginUserSuccess = response.data;

      if (isLoginUserError) {
        const errorMessage = isLoginUserError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsMedicalReq(errorMessage[0]));
          setShowErrorMessageMedicalReq(true);
        }
        if (typeof errorMessage === "string") {
          dispatch(setErrorsMedicalReq(errorMessage));
          setShowErrorMessageMedicalReq(true);
        }
      }

      //   if (isLoginUserSuccess) {

      //   }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingNewMedicalReq(false);
    }
  };

  const handleOnChangeSelect = (value: number) => {
    dispatch(setReqTypeMedicalReq(value));

    const selectedType: any = typesMedicalReqState?.find(
      (type: any) => type.id === value
    );
    setReqTypeNameLocalState(selectedType?.name);
  };

  const handleButtonClick = () => {
    dispatch(setErrorsMedicalReq([]));
    setShowErrorMessageMedicalReq(false);
  };

  return (
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
      {modalIsOpenConfirm && (
        <CustomModalTwoOptions
          key={"custom-confirm-modal-create-medical-req"}
          iconCustomModal={<FcInfo size={77} />}
          openCustomModalState={modalIsOpenConfirm}
          titleCustomModal="¿Deseas crear una nueva solicitud?"
          subtitleCustomModal={`Se realizará un nuevo requerimiento de tipo ${reqTypeNameLocalState}, del paciente ${nameUserPatientState}`}
          handleCancelCustomModal={() => setModalIsOpenConfirm(false)}
          handleConfirmCustomModal={handleConfirmDataModal}
          handleClickCustomModal={handleButtonClick}
          isSubmittingConfirm={isSubmittingNewMedicalReq}
        ></CustomModalTwoOptions>
      )}

      {showErrorMessageMedicalReq && (
        <CustomMessage
          typeMessage="error"
          message={medicalReqErrosState?.toString() || "¡Error en la petición!"}
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
        <Form
          id="create-medical-req-form"
          name="create-medical-req-form"
          className="create-medical-req-form"
          onFinish={handleCreateRequest}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-create-medical-req-form"
            style={{
              ...titleStyleCss,
              textAlign: "center",
              marginBottom: "22px",
            }}
          >
            Crear nueva solicitud de requerimiento médico
          </h2>

          <Form.Item
            name="medical-req-types"
            label="Tipo de requerimiento médico"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor selecciona el tipo de requerimiento a solicitar!",
              },
            ]}
          >
            {reqTypesLoading && reqTypesFetching && !reqTypesData ? (
              <CustomSpin />
            ) : (
              <Select
                value={reqTypeState}
                placeholder="Tipo de requerimiento"
                onChange={handleOnChangeSelect}
              >
                {typesMedicalReqState?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>

          <Form.Item
            name="observations"
            label="Observaciones y/o comentarios"
            style={{ marginBottom: "45px" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa un mensaje de observación a tu solicitud!",
              },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 2, maxRows: 8 }}
              maxLength={301}
              value={userMessageMedicalReqState}
              placeholder="Observaciones a tener en cuenta..."
              onChange={(e) =>
                dispatch(setUserMessageMedicalReq(e.target.value))
              }
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "center", marginBottom: "7px" }}>
            {isSubmittingConfirmModal && !modalIsOpenConfirm ? (
              <CustomSpin />
            ) : (
              <Button
                size="large"
                style={{
                  paddingInline: 62,
                  borderRadius: 31,
                  backgroundColor: "#015E90",
                  color: "#f2f2f2",
                }}
                htmlType="submit"
                className="create-medical-req-form-button"
                onClick={handleButtonClick}
              >
                Crear solicitud
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Card>
  );
};

export default CreateRequestForm;
