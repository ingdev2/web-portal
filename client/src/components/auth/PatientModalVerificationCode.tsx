"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button, Divider, Form, Input, Modal } from "antd";
import { NumberOutlined } from "@ant-design/icons";
import CustomMessage from "../common/custom_messages/CustomMessage";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CountdownTimer from "../common/countdown_timer/CountdownTimer";

import {
  setIdTypePatient,
  setPasswordPatient,
  setVerificationCodePatient,
  setErrorsPatient,
} from "@/redux/features/login/patientUserLoginSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useResendUserVerificationCodeMutation } from "@/redux/apis/auth/loginUsersApi";
import { setPatientModalIsOpen } from "@/redux/features/common/modal/modalSlice";

const PatientModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const patientModalIsOpen = useAppSelector(
    (state) => state.modal.patientModalIsOpen
  );

  const idTypePatientState = useAppSelector(
    (state) => state.patientUserLogin.id_type
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const verificationCodePatientState = useAppSelector(
    (state) => state.patientUserLogin.verification_code
  );

  const [isSubmittingConfirm, setIsSubmittingConfirm] = useState(false);
  const [isSubmittingResendCode, setIsSubmittingResendCode] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [resendCodeDisable, setResendCodeDisable] = useState(true);

  const {
    data: isUserPatientData,
    isLoading: isUserPatientLoading,
    isFetching: isUserPatientFetching,
    isSuccess: isUserPatientSuccess,
    isError: isUserPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberPatientState);

  const [
    resendUserVerificationCodePatient,
    {
      data: resendCodeData,
      isLoading: isResendCodeLoading,
      isSuccess: isResendCodeSuccess,
      isError: isResendCodeError,
    },
  ] = useResendUserVerificationCodeMutation({
    fixedCacheKey: "resendPatientCodeData",
  });

  useEffect(() => {
    if (!idNumberPatientState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error al obtener los datos del usuario!");
    }
    if (!isUserPatientData && isUserPatientError) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
    }
  }, [idNumberPatientState, isUserPatientData, isUserPatientError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirm(true);

      const verificationCode = verificationCodePatientState
        ? parseInt(verificationCodePatientState?.toString(), 10)
        : "";

      const idNumber = idNumberPatientState
        ? parseInt(idNumberPatientState?.toString(), 10)
        : "";

      const responseNextAuth = await signIn("PatientAuth", {
        verification_code: verificationCode,
        id_number: idNumber,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        dispatch(setErrorsPatient(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      }
      if (responseNextAuth?.status === 200) {
        router.replace("/dashboard_admin", { scroll: false });
        dispatch(setIdTypePatient(""));
        dispatch(setPasswordPatient(""));
        dispatch(setVerificationCodePatient(""));
        dispatch(setPatientModalIsOpen(false));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingConfirm(false);
    }
  };

  const handleResendCode = async (e: React.MouseEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingResendCode(true);

      const response: any = await resendUserVerificationCodePatient({
        id_type: idTypePatientState,
        id_number: idNumberPatientState,
      });

      var isResponseError = response.error;

      if (!isResendCodeSuccess && !isResendCodeLoading && isResendCodeError) {
        dispatch(setErrorsPatient(isResponseError?.data.message));
        setShowErrorMessage(true);
      }
      if (!isResendCodeError && !isResponseError) {
        setShowSuccessMessage(true);
        setSuccessMessage("¡Código Reenviado Correctamente!");
        setResendCodeDisable(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingResendCode(false);
    }
  };

  const handleCancel = () => {
    <Link href="/users_login" scroll={false} />;
    window.location.reload();
  };

  const handleButtonClick = () => {
    dispatch(setErrorsPatient([]));
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
  };

  return (
    <div>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorMessage || "¡Código Incorrecto!"}
        />
      )}
      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Código Reenviado Correctamente!"}
        />
      )}

      <Modal
        className="modal-verification-code-patient"
        open={patientModalIsOpen}
        confirmLoading={isSubmittingConfirm}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={371}
        footer={null}
        maskClosable={false}
        centered
      >
        <div
          className="content-modal-patient"
          style={{
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBlock: 13,
            marginInline: 7,
          }}
        >
          <h2
            className="title-modal-patient"
            style={{
              fontWeight: "bold",
              lineHeight: 1.3,
              marginTop: 27,
            }}
          >
            Ingresar código de verificación
          </h2>

          <h4
            className="subtitle-modal-patient"
            style={{
              fontWeight: "normal",
              lineHeight: 1.3,
              marginBlock: 7,
            }}
          >
            Hemos enviado un código de ingreso al siguiente correo electrónico:
          </h4>

          <h5
            className="user-email-patient"
            style={{
              fontWeight: "bold",
              fontSize: 13,
              color: "#137A2B",
              lineHeight: 1.7,
              letterSpacing: 1.3,
              marginBlock: 7,
            }}
          >
            {isUserPatientData?.email}
          </h5>

          <Form
            initialValues={{ remember: false }}
            autoComplete="false"
            onFinish={handleSubmit}
          >
            <Form.Item
              className="user-code-patient"
              name={"user-code-patient"}
              style={{ textAlign: "center" }}
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingresa código de verificación!",
                },
                {
                  pattern: /^[0-9]+$/,
                  message: "¡Por favor ingresa solo números!",
                },
                {
                  min: 4,
                  message: "¡Por favor ingresa mínimo 4 números!",
                },
                {
                  max: 5,
                  message: "¡Por favor ingresa máximo 5 números!",
                },
              ]}
            >
              <Input
                className="input-code-patient"
                id="input-code-patient"
                prefix={<NumberOutlined className="input-code-item-icon" />}
                style={{
                  width: 183,
                  fontSize: 27,
                  fontWeight: "bold",
                  borderWidth: 2,
                  marginBottom: 4,
                }}
                type="number"
                placeholder="Código"
                value={verificationCodePatientState}
                onChange={(e) =>
                  dispatch(setVerificationCodePatient(e.target.value))
                }
                min={0}
              />
            </Form.Item>

            {isSubmittingConfirm ? (
              <CustomSpin />
            ) : (
              <Button
                className="confirm-code-button-patient"
                size="large"
                style={{
                  paddingInline: 31,
                  borderRadius: 31,
                  backgroundColor: "#015E90",
                  color: "#f2f2f2",
                  marginTop: 5,
                  marginBottom: 13,
                }}
                htmlType="submit"
                onClick={handleButtonClick}
              >
                Confirmar código
              </Button>
            )}
          </Form>

          {resendCodeDisable && (
            <CountdownTimer
              onFinishHandler={() => {
                setResendCodeDisable(false);
              }}
              showCountdown={resendCodeDisable}
            />
          )}

          {isSubmittingResendCode && !resendCodeDisable ? (
            <CustomSpin />
          ) : (
            <Button
              className="resend-button-patient"
              key="resend-button-patient"
              disabled={resendCodeDisable}
              style={{
                backgroundColor: resendCodeDisable ? "#D8D8D8" : "transparent",
                paddingInline: 13,
                color: resendCodeDisable ? "#A0A0A0" : "#015E90",
                borderColor: resendCodeDisable ? "#A0A0A0" : "#015E90",
                fontWeight: "bold",
                borderRadius: 7,
                borderWidth: 1.3,
              }}
              onClick={handleResendCode}
              onMouseDown={handleButtonClick}
            >
              Reenviar código
            </Button>
          )}

          <div style={{ marginInline: 54 }}>
            <Divider
              style={{
                marginBlock: 13,
                borderWidth: 2,
              }}
            />
          </div>

          <Button
            key="cancel-button-patient"
            style={{
              paddingInline: 45,
              backgroundColor: "#8C1111",
              color: "#f2f2f2",
              borderRadius: 31,
            }}
            onClick={handleCancel}
          >
            Cancelar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PatientModalVerificationCode;
