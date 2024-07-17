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

import { setErrorsUserEps } from "@/redux/features/eps/epsSlice";

import {
  useGetUserByIdNumberQuery,
  useForgotEpsPasswordMutation,
} from "@/redux/apis/users/usersApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllEpsCompanyQuery } from "@/redux/apis/eps_company/epsCompanyApi";

import { maskEmail } from "@/helpers/mask_email/mask_email";

const EpsForgotPasswordForm: React.FC<{
  setOpenModalForgotPassword: (value: React.SetStateAction<boolean>) => void;
}> = ({ setOpenModalForgotPassword }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [linkToResetPasswordSent, setLinkToResetPasswordSent] = useState(false);
  const [isSubmittingGoToLogin, setIsSubmittingGoToLogin] = useState(false);

  const errorsEpsState = useAppSelector((state) => state.eps.errors);

  const [idTypesListPatientLocalState, setIdTypesListPatientLocalState] =
    useState<IdType[] | undefined>([]);

  const [idTypeEpsLocalState, setIdTypeEpsLocalState] = useState(0);
  const [idNumberEpsLocalState, setIdNumberEpsLocalState] = useState("");
  const [
    epsCompanyNumberUserEpsLocalState,
    setEpsCompanyNumberUserEpsLocalState,
  ] = useState(0);
  const [epsCompanyListLocalState, setEpsCompanyListLocalState]: any = useState(
    []
  );
  const [epsCompanyNameUserEpsLocalState, setEpsCompanyNameUserEpsLocalState] =
    useState("");
  const [emailEpsLocalState, setEmailEpsLocalState] = useState<
    string | undefined
  >("");

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
    forgotPasswordEps,
    {
      data: forgotPasswordEpsData,
      isLoading: forgotPasswordEpsLoading,
      isSuccess: forgotPasswordEpsSuccess,
      isError: forgotPasswordEpsError,
    },
  ] = useForgotEpsPasswordMutation({
    fixedCacheKey: "forgotPasswordEpsData",
  });

  const idNumberPatientLocalStateInt = idNumberEpsLocalState
    ? parseInt(idNumberEpsLocalState?.toString(), 10)
    : 0;

  const {
    data: isUserData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isError: isUserError,
  } = useGetUserByIdNumberQuery({
    user_id_type: idTypeEpsLocalState,
    id_number: idNumberPatientLocalStateInt,
  });

  const {
    data: idTypesEpsData,
    isLoading: idTypesEpsLoading,
    isFetching: idTypesEpsFetching,
    error: idTypesEpsError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: epsCompanyData,
    isLoading: epsCompanyLoading,
    isFetching: epsCompanyFetching,
    error: epsCompanyError,
  } = useGetAllEpsCompanyQuery(null);

  useEffect(() => {
    if (isUserData) {
      setEmailEpsLocalState(isUserData?.email);
    }
    if (!epsCompanyLoading && !epsCompanyFetching && epsCompanyData) {
      setEpsCompanyListLocalState(epsCompanyData);
    }
    if (epsCompanyError) {
      dispatch(setErrorsUserEps("¡No se pudo obtener las empresas!"));
      setShowErrorMessageForgotPassword(true);
      setEpsCompanyListLocalState(epsCompanyData);
    }
    if (!idTypesEpsLoading && !idTypesEpsFetching && idTypesEpsData) {
      setIdTypesListPatientLocalState(idTypesEpsData);
    }
    if (idTypesEpsError) {
      dispatch(
        setErrorsUserEps("¡No se pudo obtener los tipos de identificación!")
      );
      setShowErrorMessageForgotPassword(true);
      setIdTypesListPatientLocalState(idTypesEpsData);
    }
  }, [
    epsCompanyData,
    idTypesEpsData,
    idTypeEpsLocalState,
    idNumberEpsLocalState,
    epsCompanyNumberUserEpsLocalState,
    isUserData,
    emailEpsLocalState,
  ]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingForgotPassword(true);

      if (
        idTypeEpsLocalState &&
        idNumberEpsLocalState &&
        epsCompanyNumberUserEpsLocalState
      ) {
        const idNumberPatientLocalStateInt = idNumberEpsLocalState
          ? parseInt(idNumberEpsLocalState?.toString(), 10)
          : 0;

        const response: any = await forgotPasswordEps({
          id_type: idTypeEpsLocalState,
          id_number: idNumberPatientLocalStateInt,
          eps_company: epsCompanyNumberUserEpsLocalState,
        });

        var validationPatientData = response.data?.status;

        var validationPatientError = response.error?.status;

        if (validationPatientError !== 200 && !validationPatientData) {
          const errorMessage = response.error?.data?.message;

          dispatch(setErrorsUserEps(errorMessage));
          setShowErrorMessageForgotPassword(true);
        }
        if (validationPatientData === 202 && !validationPatientError) {
          const successMessage = response.data?.message;

          setSuccessMessageForgotPassword(successMessage);
          setShowSuccessMessageForgotPassword(true);
          setLinkToResetPasswordSent(true);

          setIdTypeEpsLocalState(0);
          setIdNumberEpsLocalState("");
          setEpsCompanyNumberUserEpsLocalState(0);
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

      await router.replace("/login", {
        scroll: false,
      });

      setEmailEpsLocalState("");

      setOpenModalForgotPassword(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToLogin(false);
    }
  };

  const handleOnChangeSelectEpsCompany = (value: number) => {
    setEpsCompanyNumberUserEpsLocalState(value);

    const selectedEpsCompany: any = epsCompanyListLocalState?.find(
      (type: any) => type.id === value
    );

    setEpsCompanyNameUserEpsLocalState(selectedEpsCompany?.name);
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserEps([]));
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
          message={errorsEpsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessageForgotPassword && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessageForgotPassword?.toString() ||
            "¡Link para reestablecer contraseña enviado al correo eléctronico registrado por el usuario!"
          }
        />
      )}

      {linkToResetPasswordSent ? (
        <CustomResultOneButton
          key={"link-to-reset-password-sent-success-custom-result-eps"}
          statusTypeResult={"success"}
          titleCustomResult="¡Link para restablecer contraseña enviado!"
          subtitleCustomResult={
            <p>
              Se ha enviado al correo <b>{maskEmail(emailEpsLocalState)}</b> un
              link para restablecer su contraseña de ingreso.
            </p>
          }
          handleClickCustomResult={handleGoToLogin}
          isSubmittingButton={isSubmittingGoToLogin}
          textButtonCustomResult="Volver al login"
        />
      ) : (
        <Form
          id="forgot-password-form-eps"
          name="forgot-password-form-eps"
          className="forgot-password-form-eps"
          onFinish={handleChangePassword}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-forgot-password-eps"
            style={{
              ...titleStyleCss,
              marginBlock: 22,
              textAlign: "center",
            }}
          >
            Olvide mi contraseña
          </h2>

          {idTypesEpsLoading || idTypesEpsFetching ? (
            <CustomSpin />
          ) : (
            <Form.Item
              name="user-id-type-forgot-password-eps"
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
                value={idTypeEpsLocalState}
                placeholder="Tipo de identificación"
                onChange={(e) => setIdTypeEpsLocalState(e)}
              >
                {idTypesListPatientLocalState?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="user-id-number-forgot-password-eps"
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
              value={idNumberEpsLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberEpsLocalState(e.target.value)}
              autoComplete="off"
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="eps-company-eps-forgot-password-eps"
            label="Empresa del colaborador:"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor selecciona la empresa en la que labora el colaborador!",
              },
            ]}
          >
            {epsCompanyLoading ? (
              <CustomSpin />
            ) : (
              <Select
                value={epsCompanyNumberUserEpsLocalState}
                placeholder="Seleccionar empresa"
                onChange={handleOnChangeSelectEpsCompany}
              >
                {epsCompanyListLocalState?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
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

export default EpsForgotPasswordForm;
