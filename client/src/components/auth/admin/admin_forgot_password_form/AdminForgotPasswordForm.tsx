"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col, Form, Input, Select } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { IdcardOutlined } from "@ant-design/icons";
import { MdOutlineEmail } from "react-icons/md";

import { setErrorsAdmin } from "@/redux/features/admin/adminSlice";

import {
  useGetAdminByIdTypeAndNumberQuery,
  useForgotPasswordMutation,
} from "@/redux/apis/admins/adminsApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";

import { maskEmail } from "@/helpers/mask_email/mask_email";

const AdminForgotPasswordForm: React.FC<{
  setOpenModalForgotPassword: (value: React.SetStateAction<boolean>) => void;
}> = ({ setOpenModalForgotPassword }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [linkToResetPasswordSent, setLinkToResetPasswordSent] = useState(false);
  const [isSubmittingGoToLogin, setIsSubmittingGoToLogin] = useState(false);

  const errorsAdminState = useAppSelector((state) => state.admin.errors);

  const [idTypesListAdminLocalState, setIdTypesListAdminLocalState] = useState<
    IdType[] | undefined
  >([]);

  const [idTypeAdminLocalState, setIdTypeAdminLocalState] = useState(0);
  const [idNumberAdminLocalState, setIdNumberAdminLocalState] = useState("");
  const [corporateEmailAdminLocalState, setCorporateEmailAdminLocalState] =
    useState("");

  const [
    corporateEmailAdminOfModalSuccessLocalState,
    setCorporateEmailAdminOfModalSuccessLocalState,
  ] = useState("");

  const [isSubmittingForgotPassword, setIsSubmittingForgotPassword] =
    useState(false);
  const [successMessageForgotPassword, setSuccessMessageForgotPassword] =
    useState("");
  const [
    showSuccessMessageForgotPassword,
    setShowSuccessMessageForgotPassword,
  ] = useState(false);
  const [showErrorMessageForgotPassword, setShowErrorMessageForgotPassword] =
    useState(false);

  const [
    forgotPasswordAdmin,
    {
      data: forgotPasswordEpsData,
      isLoading: forgotPasswordEpsLoading,
      isSuccess: forgotPasswordEpsSuccess,
      isError: forgotPasswordEpsError,
    },
  ] = useForgotPasswordMutation({
    fixedCacheKey: "forgotPasswordAdminData",
  });

  const idNumberAdminLocalStateInt = idNumberAdminLocalState
    ? parseInt(idNumberAdminLocalState?.toString(), 10)
    : 0;

  const {
    data: isAdminData,
    isLoading: isAdminLoading,
    isFetching: isAdminFetching,
    isError: isAdminError,
  } = useGetAdminByIdTypeAndNumberQuery({
    admin_id_type: idTypeAdminLocalState,
    id_number: idNumberAdminLocalStateInt,
  });

  const {
    data: idTypesAdminData,
    isLoading: idTypesAdminLoading,
    isFetching: idTypesAdminFetching,
    error: idTypesAdminError,
  } = useGetAllIdTypesQuery(null);

  useEffect(() => {
    if (isAdminData && !isAdminError) {
      setCorporateEmailAdminOfModalSuccessLocalState(
        isAdminData?.corporate_email
      );
    }
    if (!idTypesAdminLoading && !idTypesAdminFetching && idTypesAdminData) {
      setIdTypesListAdminLocalState(idTypesAdminData);
    }
    if (idTypesAdminError) {
      dispatch(
        setErrorsAdmin("¡No se pudo obtener los tipos de identificación!")
      );
      setShowErrorMessageForgotPassword(true);
      setIdTypesListAdminLocalState(idTypesAdminData);
    }
  }, [
    isAdminData,
    idTypesAdminData,
    idTypeAdminLocalState,
    idNumberAdminLocalState,
    corporateEmailAdminLocalState,
  ]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingForgotPassword(true);

      if (
        idTypeAdminLocalState &&
        idNumberAdminLocalState &&
        corporateEmailAdminLocalState
      ) {
        const idNumberPatientLocalStateInt = idNumberAdminLocalState
          ? parseInt(idNumberAdminLocalState?.toString(), 10)
          : 0;

        const response: any = await forgotPasswordAdmin({
          admin_id_type: idTypeAdminLocalState,
          id_number: idNumberPatientLocalStateInt,
          corporate_email: corporateEmailAdminLocalState,
        });

        let validationPatientData = response.data?.status;

        let validationPatientError = response.error?.status;

        if (validationPatientError !== 200 && !validationPatientData) {
          const errorMessage = response.error?.data?.message;

          dispatch(setErrorsAdmin(errorMessage));
          setShowErrorMessageForgotPassword(true);
        }
        if (validationPatientData === 202 && !validationPatientError) {
          const successMessage = response.data?.message;

          setSuccessMessageForgotPassword(successMessage);
          setShowSuccessMessageForgotPassword(true);
          setLinkToResetPasswordSent(true);

          setIdTypeAdminLocalState(0);
          setIdNumberAdminLocalState("");
          setCorporateEmailAdminLocalState("");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingForgotPassword(false);
    }
  };

  const handleGoToLogin = async () => {
    try {
      setIsSubmittingGoToLogin(true);

      await new Promise((resolve) => setTimeout(resolve, 700));

      await router.replace("/login_admin", {
        scroll: false,
      });

      setCorporateEmailAdminOfModalSuccessLocalState("");

      setOpenModalForgotPassword(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToLogin(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsAdmin([]));
    setShowErrorMessageForgotPassword(false);
    setShowSuccessMessageForgotPassword(false);
  };

  return (
    // <Card
    //   style={{
    //     width: "100%",
    //     maxWidth: "405px",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     backgroundColor: "#fcfcfc",
    //     boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
    //     marginBottom: "31px",
    //   }}
    // >

    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        padding: "0 7px",
        margin: "0px",
      }}
    >
      {showErrorMessageForgotPassword && (
        <CustomMessage
          typeMessage="error"
          message={errorsAdminState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessageForgotPassword && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessageForgotPassword?.toString() ||
            "¡Link para reestablecer contraseña enviado al correo eléctronico registrado por el administrador!"
          }
        />
      )}

      {linkToResetPasswordSent &&
      corporateEmailAdminOfModalSuccessLocalState ? (
        <CustomResultOneButton
          key={"link-to-reset-password-sent-success-custom-result-admin"}
          statusTypeResult={"success"}
          titleCustomResult="¡Link para restablecer contraseña enviado!"
          subtitleCustomResult={
            <p>
              Se ha enviado al correo{" "}
              <b>{maskEmail(corporateEmailAdminOfModalSuccessLocalState)}</b> un
              link para restablecer su contraseña de ingreso.
            </p>
          }
          handleClickCustomResult={handleGoToLogin}
          isSubmittingButton={isSubmittingGoToLogin}
          textButtonCustomResult="Volver al login"
        />
      ) : (
        <Form
          id="forgot-password-form-admin"
          name="forgot-password-form-admin"
          className="forgot-password-form-admin"
          onFinish={handleChangePassword}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-forgot-password-admin"
            style={{
              ...titleStyleCss,
              marginBlock: 22,
              textAlign: "center",
            }}
          >
            Olvide mi contraseña
          </h2>

          {idTypesAdminLoading || idTypesAdminFetching ? (
            <CustomSpin />
          ) : (
            <Form.Item
              name="user-id-type-forgot-password-admin"
              label="Tipo de identificación del colaborador"
              style={{ marginBottom: 7 }}
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingresa tu tipo de identificación!",
                },
              ]}
            >
              <Select
                value={idTypeAdminLocalState}
                placeholder="Tipo de identificación"
                onChange={(e) => setIdTypeAdminLocalState(e)}
              >
                {idTypesListAdminLocalState?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="user-id-number-forgot-password-admin"
            label="Número de identificación del colaborador"
            style={{ marginBottom: 7 }}
            normalize={(value) => {
              if (!value) return "";

              return value.replace(/[^0-9]/g, "");
            }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu número de identificación!",
              },
              {
                pattern: /^[0-9]+$/,
                message:
                  "¡Por favor ingresa número de identificación sin puntos, ni comas!",
              },
              {
                min: 7,
                message: "¡Por favor ingresa mínimo 7 números!",
              },
              {
                max: 11,
                message: "¡Por favor ingresa máximo 11 números!",
              },
            ]}
          >
            <Input
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              type="tel"
              value={idNumberAdminLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberAdminLocalState(e.target.value)}
              autoComplete="off"
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="corporate-email-forgot-password-admin"
            label="Correo electrónico corporativo del colaborador:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el correo electrónico corporativo del colaborador!",
              },
              {
                type: "email",
                message: "¡Por favor ingresa un correo electrónico valido!",
              },
              {
                min: 10,
                message: "¡Por favor ingresa mínimo 10 caracteres!",
              },
              {
                max: 45,
                message: "¡Por favor ingresa máximo 45 caracteres!",
              },
            ]}
          >
            <Input
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              type="email"
              value={corporateEmailAdminLocalState}
              placeholder="Correo electrónico"
              onChange={(e) => {
                setCorporateEmailAdminLocalState(e.target.value.toLowerCase());
              }}
              autoComplete="off"
            />
          </Form.Item>

          <Form.Item
            style={{
              textAlign: "center",
            }}
          >
            {isSubmittingForgotPassword ? (
              <CustomSpin />
            ) : (
              <Button
                size="large"
                style={{
                  paddingInline: 45,
                  borderRadius: 31,
                  backgroundColor: "#015E90",
                  color: "#f2f2f2",
                  marginTop: "13px",
                }}
                htmlType="submit"
                className="forgot-password-form-button-patient"
                onClick={handleButtonClick}
              >
                Restablecer contraseña
              </Button>
            )}
          </Form.Item>
        </Form>
      )}
    </Col>
    // </Card>
  );
};

export default AdminForgotPasswordForm;
