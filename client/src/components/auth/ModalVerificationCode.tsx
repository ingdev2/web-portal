"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

import { Button, Input, Modal } from "antd";
import { NumberOutlined } from "@ant-design/icons";
import CustomMessage from "../common/custom_messages/CustomMessage";
import CustomSpin from "../common/custom_spin/CustomSpin";

import {
  setVerificationCode,
  setErrors,
} from "@/redux/features/login/userLoginSlice";
import { setModalIsOpen } from "@/redux/features/modal/modalSlice";

import { useLoginUsersMutation } from "@/redux/apis/auth/loginUsersApi";

const ModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);

  const idTypeState = useAppSelector((state) => state.userLogin.id_type);
  const passwordState = useAppSelector((state) => state.userLogin.password);

  const idNumberState = useAppSelector((state) => state.userLogin.id_number);
  const verificationCodeState = useAppSelector(
    (state) => state.userLogin.verification_code
  );

  const [isSubmittingConfirm, setIsSubmittingConfirm] = useState(false);
  const [isSubmittingResendCode, setIsSubmittingResendCode] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [
    loginUsers,
    { data: isLogindata, isLoading: isLoginLoading, isSuccess: isLoginSuccess },
  ] = useLoginUsersMutation({ fixedCacheKey: "loginUserData" });

  useEffect(() => {
    if (!idNumberState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error al obtener los datos del usuario!");
    }
  }, [idNumberState]);

  const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmittingConfirm(true);

      const verificationCode = verificationCodeState
        ? parseInt(verificationCodeState?.toString(), 10)
        : "";

      const idNumber = idNumberState
        ? parseInt(idNumberState?.toString(), 10)
        : "";

      console.log(typeof idNumber);
      console.log(typeof verificationCode);

      const responseNextAuth = await signIn("credentials", {
        verification_code: verificationCode,
        id_number: idNumber,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        dispatch(setErrors(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      } else {
        router.push("/dashboard_admin");
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

      const response: any = await loginUsers({
        id_type: idTypeState,
        id_number: idNumberState,
        password: passwordState,
      });

      var isLoginUserError = response.error;

      if (!isLoginSuccess && !isLoginLoading && isLoginUserError) {
        dispatch(setErrors(isLoginUserError?.data.message));
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingResendCode(false);
    }
  };

  const handleCancel = () => {
    <Link href="/users_login" scroll={false} />;
    dispatch(setModalIsOpen(false));
    dispatch(setVerificationCode(0));
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

      <Modal
        open={modalIsOpen}
        confirmLoading={isSubmittingConfirm}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={321}
        footer={null}
      >
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            className="title-modal"
            style={{ fontWeight: "bold", lineHeight: 1.3, marginBottom: 4 }}
          >
            Ingresar código de verificación
          </h2>

          <h4
            className="title-modal"
            style={{
              fontWeight: "normal",
              lineHeight: 1.3,
              marginTop: 4,
              marginBottom: 7,
            }}
          >
            Hemos enviado un código de ingreso al siguiente correo electrónico:
          </h4>

          <p
            style={{
              fontWeight: "bold",
              fontSize: 20,
              lineHeight: 0.8,
              marginTop: 7,
            }}
          >
            {verificationCodeState}
          </p>

          <span style={{ fontWeight: "bold" }}>
            <Input
              prefix={<NumberOutlined className="input-code-item-icon" />}
              style={{
                width: 213,
                fontSize: 22,
                fontWeight: "bold",
                marginBottom: 13,
              }}
              type="number"
              value={verificationCodeState}
              placeholder="Código"
              onChange={(e) => dispatch(setVerificationCode(e.target.value))}
              min={0}
              maxLength={5}
              required={true}
            />
          </span>

          {isSubmittingConfirm ? (
            <CustomSpin />
          ) : (
            <Button
              key="confirm-button"
              size="middle"
              style={{
                paddingInline: 31,
                borderRadius: 31,
                backgroundColor: "#015E90",
                color: "#f2f2f2",
                marginBottom: 13,
              }}
              onClick={handleSubmit}
              onMouseDown={handleButtonClick}
            >
              Confirmar código
            </Button>
          )}

          {isSubmittingResendCode ? (
            <CustomSpin />
          ) : (
            <Button
              key="resend-button"
              style={{
                paddingInline: 22,
                color: "#015E90",
                borderColor: "#015E90",
                fontWeight: "bold",
                borderRadius: 7,
                borderWidth: 1.3,
                marginBottom: 22,
              }}
              onClick={handleResendCode}
              onMouseDown={handleButtonClick}
            >
              Reenviar código
            </Button>
          )}

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
