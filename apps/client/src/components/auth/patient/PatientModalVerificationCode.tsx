"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button, Divider, Form, Input, Modal } from "antd";
import { MdPassword } from "react-icons/md";
import CustomMessage from "../../common/custom_messages/CustomMessage";
import CustomLoadingOverlay from "../../common/custom_loading_overlay/CustomLoadingOverlay";
import CustomSpin from "../../common/custom_spin/CustomSpin";
import CountdownTimer from "../../common/countdown_timer/CountdownTimer";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

import {
  setIdTypeLoginPatient,
  setPasswordLoginPatient,
  setVerificationCodeLoginPatient,
  setErrorsLoginPatient,
} from "@/redux/features/login/patientUserLoginSlice";
import {
  setIsPageLoading,
  setPatientModalIsOpen,
} from "@/redux/features/common/modal/modalSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useResendUserVerificationCodeMutation } from "@/redux/apis/auth/loginUsersApi";

import { maskEmail } from "@/helpers/mask_email/mask_email";

const PatientModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const patientModalIsOpen = useAppSelector(
    (state) => state.modal.patientModalIsOpen
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
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
  }, [idNumberPatientState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirm(true);

      const verificationCode = verificationCodePatientState
        ? parseInt(verificationCodePatientState?.toString(), 10)
        : "";

      const idNumber = idNumberPatientState
        ? parseInt(idNumberPatientState?.toString(), 10)
        : "";

      const responseNextAuth = await signIn(
        process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_USERS,
        {
          verification_code: verificationCode,
          id_number: idNumber,
          redirect: false,
        }
      );

      if (responseNextAuth?.error) {
        dispatch(setErrorsLoginPatient(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      }

      if (responseNextAuth?.status === 200) {
        dispatch(setIsPageLoading(true));

        setShowSuccessMessage(true);
        setSuccessMessage("Ingresando al portal, por favor espere...");
        dispatch(setIdTypeLoginPatient(0));
        dispatch(setPasswordLoginPatient(""));
        dispatch(setVerificationCodeLoginPatient(0));

        await router.replace("/patient/homepage", { scroll: false });

        await new Promise((resolve) => setTimeout(resolve, 4000));
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

      let isResponseError = response.error;

      if (!isResendCodeSuccess && !isResendCodeLoading && isResendCodeError) {
        dispatch(setErrorsLoginPatient(isResponseError?.data.message));
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
    dispatch(setPatientModalIsOpen(false));

    <Link href="/login" scroll={false} />;
    window.location.reload();
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginPatient([]));
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
              ...titleStyleCss,
              marginTop: 27,
              textAlign: "center",
            }}
          >
            Ingresar código de verificación
          </h2>

          <h4
            className="subtitle-modal-patient"
            style={{
              ...subtitleStyleCss,
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
            {maskEmail(isUserPatientData?.email)}
          </h5>

          <CustomLoadingOverlay isLoading={isPageLoadingState} />

          <Form
            id="form-verify-code-modal-patient"
            name="form-verify-code-modal-patient"
            initialValues={{ remember: false }}
            autoComplete="false"
            onFinish={handleSubmit}
          >
            <Form.Item
              id="user-code-patient"
              className="user-code-patient"
              name={"user-code-patient"}
              style={{ textAlign: "center" }}
              normalize={(value) => {
                if (!value) return "";

                return value.replace(/[^0-9]/g, "");
              }}
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
                id="input-code-patient"
                className="input-code-patient"
                prefix={
                  <MdPassword
                    className="input-code-item-icon"
                    style={{ paddingInline: "2px", color: "#1D8348" }}
                  />
                }
                style={{
                  width: 183,
                  fontSize: 27,
                  fontWeight: "bold",
                  borderWidth: 2,
                  marginBottom: 4,
                }}
                type="tel"
                placeholder="Código"
                value={verificationCodePatientState}
                onChange={(e) =>
                  dispatch(setVerificationCodeLoginPatient(e.target.value))
                }
                autoComplete="off"
                min={0}
              />
            </Form.Item>

            {isSubmittingConfirm ? (
              <CustomSpin />
            ) : (
              <Button
                key={"confirm-code-button-patient"}
                className="confirm-code-button-patient"
                size="large"
                disabled={isPageLoadingState}
                style={{
                  backgroundColor: isPageLoadingState ? "#D8D8D8" : "#015E90",
                  color: isPageLoadingState ? "#A0A0A0" : "#f2f2f2",
                  paddingInline: 31,
                  borderRadius: 31,
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
              key="resend-button-patient"
              className="resend-button-patient"
              disabled={resendCodeDisable}
              style={{
                backgroundColor: resendCodeDisable ? "#D8D8D8" : "transparent",
                color: resendCodeDisable ? "#A0A0A0" : "#015E90",
                borderColor: resendCodeDisable ? "#A0A0A0" : "#015E90",
                paddingInline: 13,
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
            className="cancel-button-patient"
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
