"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col, Form, Select } from "antd";
import CustomSpin from "../../../../common/custom_spin/CustomSpin";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import CustomUpload from "@/components/common/custom_upload/CustomUpload";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import { titleStyleCss } from "@/theme/text_styles";
import TextArea from "antd/es/input/TextArea";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FcInfo } from "react-icons/fc";

import {
  setTypesMedicalReq,
  setReqTypeMedicalReq,
  setUserMessageMedicalReq,
  setErrorsMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";
import { setIdUserPatient } from "@/redux/features/patient/patientSlice";

import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useCreateMedicalReqPatientMutation } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";

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
  const medicalReqErrorsState = useAppSelector(
    (state) => state.medicalReq.errors
  );

  const [modalIsOpenConfirm, setModalIsOpenConfirm] = useState(false);
  const [modalIsOpenSuccess, setModalIsOpenSuccess] = useState(false);
  const [reqTypeNameLocalState, setReqTypeNameLocalState] = useState("");

  const [isSubmittingConfirmModal, setIsSubmittingConfirmModal] =
    useState(false);
  const [isSubmittingNewMedicalReq, setIsSubmittingNewMedicalReq] =
    useState(false);
  const [
    isSubmittingGoToListOfMedicalReq,
    setIsSubmittingGoToListOfMedicalReq,
  ] = useState(false);
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
  }, [
    reqTypesData,
    reqTypesLoading,
    reqTypesFetching,
    reqTypesError,
    userPatientData,
    userPatientLoading,
    userPatientFetching,
    idUserPatientState,
  ]);

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

      const response: any = await createMedicalReqPatient({
        userId: idUserPatientState,
        medicalReqPatient: {
          requirement_type: reqTypeState,
          user_message: userMessageMedicalReqState,
        },
      });

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

      if (isLoginUserSuccess) {
        setModalIsOpenConfirm(false);
        setModalIsOpenSuccess(true);
      }
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

  const handleGoToListOfMedicalReq = async () => {
    try {
      await router.replace("/patient/homepage/request_list", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setModalIsOpenSuccess(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsMedicalReq([]));
    setShowErrorMessageMedicalReq(false);
  };

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

          {modalIsOpenSuccess && (
            <CustomModalNoContent
              key={"custom-success-modal-create-medical-req"}
              openCustomModalState={modalIsOpenSuccess}
              contentCustomModal={
                <CustomResultOneButton
                  key={"medical-req-created-custom-result"}
                  statusTypeResult={"success"}
                  titleCustomResult="¡Solicitud Creada Correctamente!"
                  subtitleCustomResult="Su requerimiento médico ha sido recibido en nuestro sistema, intentaremos darle respuesta a su solicitud lo más pronto posible."
                  handleClickCustomResult={handleGoToListOfMedicalReq}
                  isSubmittingButton={isSubmittingGoToListOfMedicalReq}
                  textButtonCustomResult="Ver mis solicitudes hechas"
                />
              }
            ></CustomModalNoContent>
          )}

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
                name="upload-files-reference-documents"
                label="Documento(s) de referencia (opcional)"
                style={{ marginBottom: "13px" }}
                rules={[
                  {
                    required: false,
                    message: "¡Por favor adjunta mínimo un documento!",
                  },
                ]}
              >
                <CustomUpload titleCustomUpload="Cargar documento" />
              </Form.Item>

              <Form.Item
                name="observations"
                label="Observaciones y/o comentarios"
                style={{ marginBottom: "31px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor ingresa un mensaje de observación a tu solicitud!",
                  },
                ]}
              >
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 10 }}
                  maxLength={301}
                  value={userMessageMedicalReqState}
                  placeholder="Comentarios adicionales de la solicitud..."
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
      </Col>
    </>
  );
};

export default CreateRequestForm;
