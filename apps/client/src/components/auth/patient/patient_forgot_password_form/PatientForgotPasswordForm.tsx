"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col, DatePickerProps, Form, Input, Select } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";
import CustomDatePicker from "@/components/common/custom_date_picker/CustomDatePicker";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { IdcardOutlined } from "@ant-design/icons";

import { setErrorsUserPatient } from "@/redux/features/patient/patientSlice";

import {
  useGetUserByIdNumberQuery,
  useForgotPatientPasswordMutation,
} from "@/redux/apis/users/usersApi";
import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";

import { validateRequiredDate } from "@/helpers/validate_required_values/validate_required_files";
import { maskEmail } from "@/helpers/mask_email/mask_email";

const PatientForgotPasswordForm: React.FC<{
  setOpenModalForgotPassword: (value: React.SetStateAction<boolean>) => void;
}> = ({ setOpenModalForgotPassword }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const errorsPatientState = useAppSelector((state) => state.patient.errors);

  const [linkToResetPasswordSent, setLinkToResetPasswordSent] = useState(false);
  const [isSubmittingGoToLogin, setIsSubmittingGoToLogin] = useState(false);

  const [idTypesListPatientLocalState, setIdTypesListPatientLocalState] =
    useState<IdType[] | undefined>([]);

  const [idTypePatientLocalState, setIdTypePatientLocalState] = useState(0);
  const [idNumberPatientLocalState, setIdNumberPatientLocalState] =
    useState("");
  const [birthdatePatientLocalState, setBirthdatePatientLocalState] =
    useState("");
  const [emailPatientLocalState, setEmailPatientLocalState] = useState<
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
    forgotPasswordPatient,
    {
      data: forgotPasswordPatientData,
      isLoading: forgotPasswordPatientLoading,
      isSuccess: forgotPasswordPatientSuccess,
      isError: forgotPasswordPatientError,
    },
  ] = useForgotPatientPasswordMutation({
    fixedCacheKey: "forgotPasswordPatientData",
  });

  const idNumberPatientLocalStateInt = idNumberPatientLocalState
    ? parseInt(idNumberPatientLocalState?.toString(), 10)
    : 0;

  const {
    data: isUserData,
    isLoading: isUserLoading,
    isFetching: isUserFetching,
    isError: isUserError,
  } = useGetUserByIdNumberQuery(
    {
      user_id_type: idTypePatientLocalState,
      id_number: idNumberPatientLocalStateInt,
    },
    { skip: !isSubmittingForgotPassword }
  );

  const {
    data: idTypesPatientData,
    isLoading: idTypesPatientLoading,
    isFetching: idTypesPatientFetching,
    error: idTypesPatientError,
  } = useGetAllIdTypesQuery(null);

  useEffect(() => {
    if (isUserData) {
      setEmailPatientLocalState(isUserData?.email);
    }
    if (
      !idTypesPatientLoading &&
      !idTypesPatientFetching &&
      idTypesPatientData
    ) {
      setIdTypesListPatientLocalState(idTypesPatientData);
    }
    if (idTypesPatientError) {
      dispatch(
        setErrorsUserPatient("¡No se pudo obtener los tipos de identificación!")
      );
      setShowErrorMessageForgotPassword(true);
      setIdTypesListPatientLocalState(idTypesPatientData);
    }
  }, [
    idTypesPatientData,
    idTypePatientLocalState,
    idNumberPatientLocalState,
    birthdatePatientLocalState,
    isUserData,
    emailPatientLocalState,
  ]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingForgotPassword(true);

      if (
        idTypePatientLocalState &&
        idNumberPatientLocalState &&
        birthdatePatientLocalState
      ) {
        const idNumberPatientLocalStateInt = idNumberPatientLocalState
          ? parseInt(idNumberPatientLocalState?.toString(), 10)
          : 0;

        const response: any = await forgotPasswordPatient({
          id_type: idTypePatientLocalState,
          id_number: idNumberPatientLocalStateInt,
          birthdate: birthdatePatientLocalState,
        });

        let validationPatientData = response.data?.status;

        let validationPatientError = response.error?.status;

        if (validationPatientError !== 200 && !validationPatientData) {
          const errorMessage = response.error?.data?.message;

          dispatch(setErrorsUserPatient(errorMessage));
          setShowErrorMessageForgotPassword(true);
        }
        if (validationPatientData === 202 && !validationPatientError) {
          const successMessage = response.data?.message;

          setSuccessMessageForgotPassword(successMessage);
          setShowSuccessMessageForgotPassword(true);
          setLinkToResetPasswordSent(true);

          setIdTypePatientLocalState(0);
          setIdNumberPatientLocalState("");
          setBirthdatePatientLocalState("");
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingForgotPassword(false);
    }
  };

  const onChangeDate: DatePickerProps["onChange"] = (date, dateString) => {
    setBirthdatePatientLocalState(dateString.toString());
  };

  const handleGoToLogin = async () => {
    try {
      setIsSubmittingGoToLogin(true);

      await new Promise((resolve) => setTimeout(resolve, 700));

      await router.replace("/login", {
        scroll: false,
      });

      setEmailPatientLocalState("");

      setOpenModalForgotPassword(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToLogin(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserPatient([]));
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
          message={errorsPatientState?.toString() || "¡Error en la petición!"}
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
          key={"link-to-reset-password-sent-success-custom-result-patient"}
          statusTypeResult={"success"}
          titleCustomResult="¡Link para restablecer contraseña enviado!"
          subtitleCustomResult={
            <p>
              Se ha enviado al correo <b>{maskEmail(emailPatientLocalState)}</b>
              un link para restablecer su contraseña de ingreso.
            </p>
          }
          handleClickCustomResult={handleGoToLogin}
          isSubmittingButton={isSubmittingGoToLogin}
          textButtonCustomResult="Volver al login"
        />
      ) : (
        <Form
          id="forgot-password-form-patient"
          name="forgot-password-form-patient"
          className="forgot-password-form-patient"
          onFinish={handleChangePassword}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-forgot-password-patient"
            style={{
              ...titleStyleCss,
              marginBlock: 22,
              textAlign: "center",
            }}
          >
            Olvide mi contraseña
          </h2>

          {idTypesPatientLoading || idTypesPatientFetching ? (
            <CustomSpin />
          ) : (
            <Form.Item
              name="user-id-type-forgot-password-patient"
              label="Tipo de identificación del paciente"
              style={{ marginBottom: 7 }}
              rules={[
                {
                  required: true,
                  message: "¡Por favor ingresa tu tipo de identificación!",
                },
              ]}
            >
              <Select
                value={idTypePatientLocalState}
                placeholder="Tipo de identificación"
                onChange={(e) => setIdTypePatientLocalState(e)}
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
            name="user-id-number-forgot-password-patient"
            label="Número de identificación del paciente"
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
              value={idNumberPatientLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberPatientLocalState(e.target.value)}
              autoComplete="off"
              min={0}
            />
          </Form.Item>

          <Form.Item
            name="date-picker-forgot-password-patient"
            label="Fecha de nacimiento del paciente"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                validator: validateRequiredDate(
                  birthdatePatientLocalState,
                  "¡Por favor seleccionar la fecha de nacimiento!"
                ),
              },
            ]}
          >
            <CustomDatePicker onChangeDateCustomDatePicker={onChangeDate} />
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

export default PatientForgotPasswordForm;
