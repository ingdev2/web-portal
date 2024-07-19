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
  setIdTypeLoginFamiliar,
  setEmailLoginFamiliar,
  setPatientIdNumberLoginFamiliar,
  setRelationWithPatientLoginFamiliar,
  setVerificationCodeLoginFamiliar,
  setErrorsLoginFamiliar,
  setIdLoginFamiliar,
} from "@/redux/features/login/familiarLoginSlice";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

import { useGetFamiliarByIdQuery } from "@/redux/apis/relatives/relativesApi";
import { useResendFamiliarVerificationCodeMutation } from "@/redux/apis/auth/loginRelativesApi";
import { setIdUserFamiliar } from "@/redux/features/familiar/familiarSlice";

const FamiliarModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const familiarModalIsOpen = useAppSelector(
    (state) => state.modal.familiarModalIsOpen
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idFamiliarState = useAppSelector((state) => state.familiarLogin.id);
  const idTypeFamiliarState = useAppSelector(
    (state) => state.familiarLogin.id_type_familiar
  );
  const idNumberFamiliarState = useAppSelector(
    (state) => state.familiarLogin.id_number_familiar
  );
  const emailFamiliarState = useAppSelector(
    (state) => state.familiarLogin.email_familiar
  );
  const idNumberPatientOfFamiliarState = useAppSelector(
    (state) => state.familiarLogin.patient_id_number
  );
  const relationshipWithPatientState = useAppSelector(
    (state) => state.familiarLogin.rel_with_patient
  );
  const verificationCodeFamiliarState = useAppSelector(
    (state) => state.familiarLogin.verification_code
  );

  const [isSubmittingConfirm, setIsSubmittingConfirm] = useState(false);
  const [isSubmittingResendCode, setIsSubmittingResendCode] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [resendCodeDisable, setResendCodeDisable] = useState(true);

  const {
    data: userFamiliarData,
    isLoading: userFamiliarLoading,
    isFetching: userFamiliarFetching,
    isSuccess: userFamiliarSuccess,
    isError: userFamiliarError,
  } = useGetFamiliarByIdQuery(idFamiliarState, { skip: !idFamiliarState });

  const [
    resendUserVerificationCodeFamiliar,
    {
      data: resendCodeData,
      isLoading: isResendCodeLoading,
      isSuccess: isResendCodeSuccess,
      isError: isResendCodeError,
    },
  ] = useResendFamiliarVerificationCodeMutation({
    fixedCacheKey: "resendFamiliarCodeData",
  });

  useEffect(() => {
    if (!idNumberFamiliarState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error al obtener los datos del usuario!");
    }
  }, [idNumberFamiliarState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirm(true);

      const idNumber = idNumberFamiliarState
        ? parseInt(idNumberFamiliarState?.toString(), 10)
        : "";
      const verificationCode = verificationCodeFamiliarState
        ? parseInt(verificationCodeFamiliarState?.toString(), 10)
        : "";

      const responseNextAuth = await signIn(
        process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_RELATIVES,
        {
          id_number: idNumber,
          verification_code: verificationCode,
          redirect: false,
        }
      );

      if (responseNextAuth?.error) {
        dispatch(setErrorsLoginFamiliar(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      }

      if (responseNextAuth?.status === 200) {
        dispatch(setIsPageLoading(true));

        setShowSuccessMessage(true);
        setSuccessMessage("Ingresando al portal, por favor espere...");
        dispatch(setIdUserFamiliar(userFamiliarData?.id));
        dispatch(setIdLoginFamiliar(userFamiliarData?.id));

        dispatch(setIdTypeLoginFamiliar(0));
        dispatch(setEmailLoginFamiliar(""));
        dispatch(setPatientIdNumberLoginFamiliar(0));
        dispatch(setRelationWithPatientLoginFamiliar(0));
        dispatch(setVerificationCodeLoginFamiliar(0));

        await router.replace("/familiar/homepage", {
          scroll: false,
        });

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

      const response: any = await resendUserVerificationCodeFamiliar({
        id_type: idTypeFamiliarState,
        id_number: idNumberFamiliarState,
      });

      var isResponseError = response.error;

      if (!isResendCodeSuccess && !isResendCodeLoading && isResendCodeError) {
        dispatch(setErrorsLoginFamiliar(isResponseError?.data.message));
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
    <Link href="/login" scroll={false} />;
    window.location.reload();
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginFamiliar([]));
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
        className="modal-verification-code-eps"
        open={familiarModalIsOpen}
        confirmLoading={isSubmittingConfirm}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={371}
        footer={null}
        maskClosable={false}
        centered
      >
        <div
          className="content-modal-eps"
          style={{
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBlock: 13,
            marginInline: 7,
          }}
        >
          <h2
            className="title-modal-eps"
            style={{
              ...titleStyleCss,
              marginTop: 27,
              textAlign: "center",
            }}
          >
            Ingresar código de verificación
          </h2>

          <h4
            className="subtitle-modal-eps"
            style={{
              ...subtitleStyleCss,
              marginBlock: 7,
            }}
          >
            Hemos enviado un código de ingreso al siguiente correo electrónico:
          </h4>

          <h5
            className="user-email-eps"
            style={{
              fontWeight: "bold",
              fontSize: 13,
              color: "#137A2B",
              lineHeight: 1.7,
              letterSpacing: 1.3,
              marginBlock: 7,
            }}
          >
            {userFamiliarData?.email}
          </h5>

          <CustomLoadingOverlay isLoading={isPageLoadingState} />

          <Form
            id="form-verify-code-modal-eps"
            name="form-verify-code-modal-eps"
            initialValues={{ remember: false }}
            autoComplete="false"
            onFinish={handleSubmit}
          >
            <Form.Item
              id="user-code-eps"
              className="user-code-eps"
              name={"user-code-eps"}
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
                id="input-code-eps"
                className="input-code-eps"
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
                value={verificationCodeFamiliarState}
                onChange={(e) =>
                  dispatch(setVerificationCodeLoginFamiliar(e.target.value))
                }
                autoComplete="off"
                min={0}
              />
            </Form.Item>

            {isSubmittingConfirm ? (
              <CustomSpin />
            ) : (
              <Button
                key="confirm-code-button-eps"
                className="confirm-code-button-eps"
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
              key="resend-button-eps"
              className="resend-button-eps"
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
            key="cancel-button-eps"
            className="cancel-button-eps"
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

export default FamiliarModalVerificationCode;
