"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button, Divider, Form, Input, Modal } from "antd";
import { MdPassword } from "react-icons/md";
import CustomMessage from "../common/custom_messages/CustomMessage";
import CustomLoadingOverlay from "../common/custom_loading_overlay/CustomLoadingOverlay";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CountdownTimer from "../common/countdown_timer/CountdownTimer";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

import {
  setIdTypeLoginEps,
  setPasswordLoginEps,
  setVerificationCodeLoginEps,
  setErrorsLoginEps,
} from "@/redux/features/login/epsUserLoginSlice";

import { useGetUserByIdNumberEpsQuery } from "@/redux/apis/users/usersApi";
import { useResendUserVerificationCodeMutation } from "@/redux/apis/auth/loginUsersApi";

const EpsModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const epsModalIsOpen = useAppSelector((state) => state.modal.epsModalIsOpen);

  const idTypeEpsState = useAppSelector((state) => state.epsUserLogin.id_type);
  const idNumberEpsState = useAppSelector(
    (state) => state.epsUserLogin.id_number
  );
  const verificationCodeEpsState = useAppSelector(
    (state) => state.epsUserLogin.verification_code
  );

  const [isHomepageLoading, setIsHomepageLoading] = useState(false);
  const [isSubmittingConfirm, setIsSubmittingConfirm] = useState(false);
  const [isSubmittingResendCode, setIsSubmittingResendCode] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [resendCodeDisable, setResendCodeDisable] = useState(true);

  const {
    data: isUserEpsData,
    isLoading: isUserEpsLoading,
    isFetching: isUserEpsFetching,
    isSuccess: isUserEpsSuccess,
    isError: isUserEpsError,
  } = useGetUserByIdNumberEpsQuery(idNumberEpsState);

  const [
    resendUserVerificationCodeEps,
    {
      data: resendCodeData,
      isLoading: isResendCodeLoading,
      isSuccess: isResendCodeSuccess,
      isError: isResendCodeError,
    },
  ] = useResendUserVerificationCodeMutation({
    fixedCacheKey: "resendEpsCodeData",
  });

  useEffect(() => {
    if (!idNumberEpsState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error al obtener los datos del usuario!");
    }
  }, [idNumberEpsState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirm(true);

      const verificationCode = verificationCodeEpsState
        ? parseInt(verificationCodeEpsState?.toString(), 10)
        : "";

      const idNumber = idNumberEpsState
        ? parseInt(idNumberEpsState?.toString(), 10)
        : "";

      const responseNextAuth = await signIn("users-auth", {
        verification_code: verificationCode,
        id_number: idNumber,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        dispatch(setErrorsLoginEps(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      }

      if (responseNextAuth?.status === 200) {
        setShowSuccessMessage(true);
        setSuccessMessage("Ingresando al portal, por favor espere...");
        dispatch(setIdTypeLoginEps(""));
        dispatch(setPasswordLoginEps(""));
        dispatch(setVerificationCodeLoginEps(""));

        await router.replace("/eps/homepage", {
          scroll: false,
        });

        await new Promise((resolve) => setTimeout(resolve, 4000));

        setIsHomepageLoading(false);
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

      const response: any = await resendUserVerificationCodeEps({
        id_type: idTypeEpsState,
        id_number: idNumberEpsState,
      });

      var isResponseError = response.error;

      if (!isResendCodeSuccess && !isResendCodeLoading && isResendCodeError) {
        dispatch(setErrorsLoginEps(isResponseError?.data.message));
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
    dispatch(setErrorsLoginEps([]));
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
        open={epsModalIsOpen}
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
            {isUserEpsData?.email}
          </h5>

          <CustomLoadingOverlay isLoading={isHomepageLoading} />

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
                value={verificationCodeEpsState}
                onChange={(e) =>
                  dispatch(setVerificationCodeLoginEps(e.target.value))
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

export default EpsModalVerificationCode;
