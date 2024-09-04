"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button, Card, Col, Form, Input, Select } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { LockOutlined } from "@ant-design/icons";

import {
  setIdUserPatient,
  setNameUserPatient,
  setLastNameUserPatient,
  setIdNumberUserPatient,
  setCellphoneUserPatient,
  setErrorsUserPatient,
} from "@/redux/features/patient/patientSlice";
import { setPatientModalIsOpen } from "@/redux/features/common/modal/modalSlice";

import {
  useUpdatePasswordMutation,
  useGetUserByIdNumberPatientQuery,
} from "@/redux/apis/users/usersApi";

const PatientChangePasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const idNumberUserPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const namePatientState = useAppSelector((state) => state.patient.name);
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const cellphonePatientState = useAppSelector(
    (state) => state.patient.cellphone
  );
  const errorsPatientState = useAppSelector((state) => state.patient.errors);

  const [oldPasswordPatientLocalState, setOldPasswordPatientLocalState] =
    useState("");
  const [newPasswordPatientLocalState, setNewPasswordPatientLocalState] =
    useState("");

  const [isSubmittingChangePassword, setIsSubmittingChangePassword] =
    useState(false);
  const [
    showSuccessMessageChangePassword,
    setShowSuccessMessageChangePassword,
  ] = useState(false);
  const [showErrorMessageChangePassword, setShowErrorMessageChangePassword] =
    useState(false);

  const [
    updatePasswordPatient,
    {
      data: updatePasswordPatientData,
      isLoading: updatePasswordPatientLoading,
      isSuccess: updatePasswordPatientSuccess,
      isError: updatePasswordPatientError,
    },
  ] = useUpdatePasswordMutation({
    fixedCacheKey: "updatePasswordPatientData",
  });

  const {
    data: userPatientData,
    isLoading: userPatientDataLoading,
    isFetching: userPatientDataFetching,
    isError: userPatientDataError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  useEffect(() => {
    if (
      !idUserPatientState &&
      idNumberUserPatientState &&
      userPatientData &&
      !userPatientDataLoading &&
      !userPatientDataFetching
    ) {
      dispatch(setIdUserPatient(userPatientData?.id));

      dispatch(setNameUserPatient(userPatientData?.name));
      dispatch(setLastNameUserPatient(userPatientData?.last_name));
      dispatch(setIdNumberUserPatient(userPatientData?.id_number));
      dispatch(setCellphoneUserPatient(userPatientData?.cellphone));
    }
  }, [idUserPatientState, idNumberUserPatientState, userPatientData]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingChangePassword(true);

      if (
        idUserPatientState &&
        oldPasswordPatientLocalState &&
        newPasswordPatientLocalState
      ) {
        const response: any = await updatePasswordPatient({
          id: idUserPatientState,
          passwords: {
            oldPassword: oldPasswordPatientLocalState,
            newPassword: newPasswordPatientLocalState,
          },
        });

        let validationPatientData = response.data?.status;

        let validationPatientError = response.error?.status;

        if (validationPatientError !== 200 && !validationPatientData) {
          const errorMessage = response.error?.data?.message;

          dispatch(setErrorsUserPatient(errorMessage));
          setShowErrorMessageChangePassword(true);

          setIsSubmittingChangePassword(false);
        }
        if (validationPatientData === 202 && !validationPatientError) {
          setShowSuccessMessageChangePassword(true);
          setOldPasswordPatientLocalState("");
          setNewPasswordPatientLocalState("");

          setTimeout(() => {
            dispatch(setPatientModalIsOpen(false));
          }, 4000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserPatient([]));
    setShowErrorMessageChangePassword(false);
    setShowSuccessMessageChangePassword(false);
  };

  const handleOnChangeValidatorNewPasswordForm = (_: any, value: string) => {
    if (!namePatientState || !idNumberPatientState || !cellphonePatientState) {
      return Promise.resolve();
    }

    const passwordUpperCase = value?.toUpperCase();

    const nameWords = namePatientState?.toUpperCase().split(" ");

    const idNumber = String(idNumberPatientState);

    const cellphoneNumber = String(cellphonePatientState);

    if (nameWords?.some((word) => passwordUpperCase?.includes(word))) {
      return Promise.reject(
        new Error(
          "¡La contraseña no puede contener datos del nombre del usuario!"
        )
      );
    }

    if (passwordUpperCase?.includes(idNumber)) {
      return Promise.reject(
        new Error(
          "¡La contraseña no puede contener datos del número de cédula del usuario!"
        )
      );
    }

    if (passwordUpperCase?.includes(cellphoneNumber)) {
      return Promise.reject(
        new Error(
          "¡La contraseña no puede contener datos del número de celular del usuario!"
        )
      );
    }

    return Promise.resolve();
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
      {showErrorMessageChangePassword && (
        <CustomMessage
          typeMessage="error"
          message={errorsPatientState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessageChangePassword && (
        <CustomMessage
          typeMessage="success"
          message={"¡Contraseña cambiada correctamente!"}
        />
      )}

      <Form
        id="change-password-form-patient"
        name="change-password-form-patient"
        className="change-password-form-patient"
        onFinish={handleChangePassword}
        initialValues={{ remember: false }}
        autoComplete="false"
        layout="vertical"
      >
        <h2
          className="title-change-password-patient"
          style={{
            ...titleStyleCss,
            marginBlock: 22,
            textAlign: "center",
          }}
        >
          Cambiar contraseña de cuenta
        </h2>

        <Form.Item
          id="current-password-patient"
          name="current-password-patient"
          className="current-password-patient"
          label="Contraseña actual"
          style={{ marginBottom: 13 }}
          rules={[
            {
              required: true,
              message: "¡Por favor ingresa tu contraseña actual!",
            },
            {
              min: 8,
              message: "¡La contraseña debe tener mínimo 8 caracteres!",
            },
            {
              max: 31,
              message: "¡La contraseña debe tener máximo 31 caracteres!",
            },
            {
              validator: (_, value) => {
                const containsLowercase = /[a-z]/.test(value ?? "");
                const containsUppercase = /[A-Z]/.test(value ?? "");
                if (!containsLowercase || !containsUppercase) {
                  return Promise.reject(
                    "¡La contraseña debe contener al menos una letra minúscula y una letra mayúscula!"
                  );
                }
                return Promise.resolve();
              },
            },
            {
              validator: (_, value) => {
                const containsSpecialChar = /[_\-*&%#$\/.,+=]/.test(
                  value ?? ""
                );
                if (!containsSpecialChar) {
                  return Promise.reject(
                    "La contraseña debe contener al menos un carácter especial (_ - * & % # $ / . , + =)"
                  );
                }
                return Promise.resolve();
              },
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            value={oldPasswordPatientLocalState}
            placeholder="Contraseña actual"
            onChange={(e) => {
              setOldPasswordPatientLocalState(e.target.value.trim());
            }}
          />
        </Form.Item>

        <Form.Item
          id="new-password-patient"
          name="new-password-patient"
          className="new-password-patient"
          label="Contraseña nueva"
          style={{ marginBottom: 13 }}
          rules={[
            {
              required: true,
              message: "¡Por favor ingresa tu contraseña nueva!",
            },
            {
              min: 8,
              message: "¡La contraseña debe tener mínimo 8 caracteres!",
            },
            {
              max: 31,
              message: "¡La contraseña debe tener máximo 31 caracteres!",
            },
            {
              validator: (_, value) => {
                const containsLowercase = /[a-z]/.test(value ?? "");
                const containsUppercase = /[A-Z]/.test(value ?? "");
                if (!containsLowercase || !containsUppercase) {
                  return Promise.reject(
                    "¡La contraseña debe contener al menos una letra minúscula y una letra mayúscula!"
                  );
                }
                return Promise.resolve();
              },
            },
            {
              validator: (_, value) => {
                const containsSpecialChar = /[_\-*&%#$\/.,+=]/.test(
                  value ?? ""
                );
                if (!containsSpecialChar) {
                  return Promise.reject(
                    "La contraseña debe contener al menos un carácter especial (_ - * & % # $ / . , + =)"
                  );
                }
                return Promise.resolve();
              },
            },
            {
              validator: handleOnChangeValidatorNewPasswordForm,
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            value={newPasswordPatientLocalState}
            placeholder="Contraseña nueva"
            onChange={(e) => {
              setNewPasswordPatientLocalState(e.target.value.trim());
            }}
          />
        </Form.Item>

        <Form.Item
          id="verify-new-password-patient"
          name="verify-new-password-patient"
          className="verify-new-password-patient"
          label="Verificar contraseña nueva"
          style={{ marginBottom: 22 }}
          dependencies={["new-password-patient"]}
          rules={[
            {
              required: true,
              message: "¡Por favor verifica tu contraseña!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new-password-patient") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("Las contraseñas no coinciden.");
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            value={newPasswordPatientLocalState}
            placeholder="Verificar contraseña nueva"
            onChange={(e) => {
              setNewPasswordPatientLocalState(e.target.value.trim());
            }}
          />
        </Form.Item>

        <Form.Item
          style={{
            textAlign: "center",
          }}
        >
          {isSubmittingChangePassword ? (
            <CustomSpin />
          ) : (
            <Button
              size="large"
              style={{
                paddingInline: 45,
                borderRadius: 31,
                backgroundColor: "#015E90",
                color: "#f2f2f2",
                marginBlock: 7,
              }}
              htmlType="submit"
              className="change-password-form-button-patient"
              onClick={handleButtonClick}
            >
              Cambiar contraseña
            </Button>
          )}
        </Form.Item>
      </Form>
    </Col>
    // </Card>
  );
};

export default PatientChangePasswordForm;
