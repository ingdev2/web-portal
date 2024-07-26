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
  setIdTypeLoginAdmin,
  setPasswordLoginAdmin,
  setVerificationCodeLoginAdmin,
  setErrorsLoginAdmin,
} from "@/redux/features/login/adminLoginSlice";
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

import { useGetAdminByIdNumberQuery } from "@/redux/apis/admins/adminsApi";
import { useResendAdminVerificationCodeMutation } from "@/redux/apis/auth/loginAdminApi";

import { maskEmail } from "@/helpers/mask_email/mask_email";

const AdminModalVerificationCode: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const adminModalIsOpen = useAppSelector(
    (state) => state.modal.adminModalIsOpen
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  const idTypeAdminState = useAppSelector((state) => state.adminLogin.id_type);
  const idNumberAdminState = useAppSelector(
    (state) => state.adminLogin.id_number
  );
  const verificationCodeAdminState = useAppSelector(
    (state) => state.adminLogin.verification_code
  );

  const [isSubmittingConfirm, setIsSubmittingConfirm] = useState(false);
  const [isSubmittingResendCode, setIsSubmittingResendCode] = useState(false);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [resendCodeDisable, setResendCodeDisable] = useState(true);

  const {
    data: isAdminData,
    isLoading: isAdminLoading,
    isFetching: isAdminFetching,
    isSuccess: isAdminSuccess,
    isError: isAdminError,
  } = useGetAdminByIdNumberQuery(idNumberAdminState);

  const [
    resendUserVerificationCodeAdmin,
    {
      data: resendCodeData,
      isLoading: isResendCodeLoading,
      isSuccess: isResendCodeSuccess,
      isError: isResendCodeError,
    },
  ] = useResendAdminVerificationCodeMutation({
    fixedCacheKey: "resendAdminCodeData",
  });

  useEffect(() => {
    if (!idNumberAdminState) {
      setShowErrorMessage(true);
      setErrorMessage("¡Error al obtener los datos del administrador!");
    }
  }, [idNumberAdminState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingConfirm(true);

      const verificationCode = verificationCodeAdminState
        ? parseInt(verificationCodeAdminState?.toString(), 10)
        : "";

      const idNumber = idNumberAdminState
        ? parseInt(idNumberAdminState?.toString(), 10)
        : "";

      const responseNextAuth = await signIn(
        process.env.NEXT_PUBLIC_NAME_AUTH_CREDENTIALS_ADMINS,
        {
          verification_code: verificationCode,
          id_number: idNumber,
          redirect: false,
        }
      );

      if (responseNextAuth?.error) {
        dispatch(setErrorsLoginAdmin(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      }

      if (responseNextAuth?.status === 200) {
        dispatch(setIsPageLoading(true));

        setShowSuccessMessage(true);
        setSuccessMessage(
          "Ingresando al panel de administradores, por favor espere..."
        );
        dispatch(setIdTypeLoginAdmin(0));
        dispatch(setPasswordLoginAdmin(""));
        dispatch(setVerificationCodeLoginAdmin(0));

        await router.replace("/admin/dashboard", { scroll: false });

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

      const response: any = await resendUserVerificationCodeAdmin({
        id_type: idTypeAdminState,
        id_number: idNumberAdminState,
      });

      var isResponseError = response.error;

      if (!isResendCodeSuccess && !isResendCodeLoading && isResendCodeError) {
        dispatch(setErrorsLoginAdmin(isResponseError?.data.message));
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
    <Link href="/login_admin" scroll={false} />;
    window.location.reload();
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginAdmin([]));
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
        className="modal-verification-code-admin"
        open={adminModalIsOpen}
        confirmLoading={isSubmittingConfirm}
        onCancel={handleCancel}
        destroyOnClose={true}
        width={371}
        footer={null}
        maskClosable={false}
        centered
      >
        <div
          className="content-modal-admin"
          style={{
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBlock: 13,
            marginInline: 7,
          }}
        >
          <h2
            className="title-modal-admin"
            style={{
              ...titleStyleCss,
              marginTop: 27,
              textAlign: "center",
            }}
          >
            Ingresar código de verificación
          </h2>

          <h4
            className="subtitle-modal-admin"
            style={{
              ...subtitleStyleCss,
              marginBlock: 7,
            }}
          >
            Hemos enviado un código de ingreso al siguiente correo electrónico:
          </h4>

          <h5
            className="user-email-admin"
            style={{
              fontWeight: "bold",
              fontSize: 13,
              color: "#137A2B",
              lineHeight: 1.7,
              letterSpacing: 1.3,
              marginBlock: 7,
            }}
          >
            {maskEmail(isAdminData?.corporate_email)}
          </h5>

          <CustomLoadingOverlay isLoading={isPageLoadingState} />

          <Form
            id="form-verify-code-modal-admin"
            name="form-verify-code-modal-admin"
            initialValues={{ remember: false }}
            autoComplete="false"
            onFinish={handleSubmit}
          >
            <Form.Item
              id="user-code-admin"
              className="user-code-admin"
              name={"user-code-admin"}
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
                id="input-code-admin"
                className="input-code-admin"
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
                value={verificationCodeAdminState}
                onChange={(e) =>
                  dispatch(setVerificationCodeLoginAdmin(e.target.value))
                }
                autoComplete="off"
                min={0}
              />
            </Form.Item>

            {isSubmittingConfirm ? (
              <CustomSpin />
            ) : (
              <Button
                key={"confirm-code-button-admin"}
                className="confirm-code-button-admin"
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
              key="resend-button-admin"
              className="resend-button-admin"
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
            key="cancel-button-admin"
            className="cancel-button-admin"
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

export default AdminModalVerificationCode;
