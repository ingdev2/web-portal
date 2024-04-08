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

import {
  setIdType,
  setPassword,
  setVerificationCode,
  setErrors,
} from "@/redux/features/login/userLoginSlice";

import { useResendUserVerificationCodeMutation } from "@/redux/apis/auth/loginUsersApi";
import { useGetUserByIdNumberQuery } from "@/redux/apis/users/usersApi";
import CountdownTimer from "../common/countdown_timer/CountdownTimer";

const ModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);

  const idTypeState = useAppSelector((state) => state.userLogin.id_type);
  const idNumberState = useAppSelector((state) => state.userLogin.id_number);
  const verificationCodeState = useAppSelector(
    (state) => state.userLogin.verification_code
  );

  const [isSubmittingConfirm, setIsSubmittingConfirm] = useState(false);
  const [isSubmittingResendCode, setIsSubmittingResendCode] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [resendCodeDisable, setResendCodeDisable] = useState(true);

  const {
    data: isUserData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isSuccess: isUserSuccess,
    isError: isUserError,
  } = useGetUserByIdNumberQuery(idNumberState);

  const [
    resendUserVerificationCode,
    {
      data: resendCodeData,
      isLoading: isResendCodeLoading,
      isSuccess: isResendCodeSuccess,
      isError: isResendCodeError,
    },
  ] = useResendUserVerificationCodeMutation({
    fixedCacheKey: "resendUserCodeData",
  });

  useEffect(() => {
    if (!idNumberState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error al obtener los datos del usuario!");
    }
    if (!isUserData && isUserError) {
      setShowErrorMessage(true);
      setErrorMessage("¡Usuario no encontrado!");
    }
  }, [idNumberState, isUserData, isUserError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirm(true);

      const verificationCode = verificationCodeState
        ? parseInt(verificationCodeState?.toString(), 10)
        : "";

      const idNumber = idNumberState
        ? parseInt(idNumberState?.toString(), 10)
        : "";

      const responseNextAuth = await signIn("credentials", {
        verification_code: verificationCode,
        id_number: idNumber,
        redirect: false,
      });

      console.log(responseNextAuth);

      if (responseNextAuth?.error) {
        dispatch(setErrors(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      }
      if (responseNextAuth?.status === 200) {
        router.replace("/dashboard_admin", { scroll: false });
        dispatch(setIdType(""));
        dispatch(setPassword(""));
        dispatch(setVerificationCode(""));
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

      const response: any = await resendUserVerificationCode({
        id_type: idTypeState,
        id_number: idNumberState,
      });

      console.log(response);

      var isResendCodeError = response.error;

      if (!isResendCodeSuccess && !isResendCodeLoading && isResendCodeError) {
        dispatch(setErrors(isResendCodeError?.data.message));
        setShowErrorMessage(true);
      }
      if (isUserData && !isUserError) {
        setShowSuccessMessage(true);
        setSuccessMessage("¡Código Reenviado Correctamente!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingResendCode(false);
      setResendCodeDisable(true);
    }
  };

  const handleCancel = () => {
    <Link href="/users_login" scroll={false} />;
    window.location.reload();
  };

  const handleButtonClick = () => {
    dispatch(setErrors([]));
    setShowErrorMessage(false);
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
        className="modal-design"
        open={modalIsOpen}
        confirmLoading={isSubmittingConfirm}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={371}
        footer={null}
        maskClosable={false}
        centered
      >
        <div
          className="content-modal"
          style={{
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBlock: 13,
            marginInline: 7,
          }}
        >
          <h2
            className="title-modal"
            style={{
              fontWeight: "bold",
              lineHeight: 1.3,
              marginTop: 27,
            }}
          >
            Ingresar código de verificación
          </h2>

          <h4
            className="subtitle-modal"
            style={{
              fontWeight: "normal",
              lineHeight: 1.3,
              marginBlock: 7,
            }}
          >
            Hemos enviado un código de ingreso al siguiente correo electrónico:
          </h4>

          <h5
            className="user-email"
            style={{
              fontWeight: "bold",
              fontSize: 13,
              color: "#137A2B",
              lineHeight: 1.7,
              letterSpacing: 1.3,
              marginBlock: 7,
            }}
          >
            {isUserData?.email}
          </h5>

          <Form
            initialValues={{ remember: false }}
            autoComplete="false"
            onFinish={handleSubmit}
          >
            <Form.Item
              className="user-code"
              name={"user-code"}
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
                value={verificationCodeState}
                onChange={(e) => dispatch(setVerificationCode(e.target.value))}
                min={0}
              />
            </Form.Item>

            {isSubmittingConfirm ? (
              <CustomSpin />
            ) : (
              <Button
                className="confirm-code-button"
                size="large"
                style={{
                  paddingInline: 31,
                  borderRadius: 31,
                  backgroundColor: "#015E90",
                  color: "#f2f2f2",
                  marginTop: 5,
                  marginBottom: 7,
                }}
                htmlType="submit"
                onClick={handleButtonClick}
              >
                Confirmar código
              </Button>
            )}
          </Form>

          <CountdownTimer
            onFinishHandler={() => setResendCodeDisable(false)}
            showCountdown={resendCodeDisable}
          />

          {isSubmittingResendCode && !isResendCodeSuccess ? (
            <CustomSpin />
          ) : (
            <Button
              key="resend-button"
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
                marginBlock: 17,
                borderWidth: 2,
              }}
            />
          </div>

          <Button
            key="cancel-button"
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

export default ModalVerificationCode;
