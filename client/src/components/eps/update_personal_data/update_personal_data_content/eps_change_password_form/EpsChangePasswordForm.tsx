"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button, Card, Col, Form, Input, Select } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { LockOutlined } from "@ant-design/icons";

import {
  setIdUserEps,
  setNameUserEps,
  setLastNameUserEps,
  setIdNumberUserEps,
  setCellphoneUserEps,
  setErrorsUserEps,
} from "@/redux/features/eps/epsSlice";
import { setEpsModalIsOpen } from "@/redux/features/common/modal/modalSlice";

import {
  useUpdatePasswordMutation,
  useGetUserByIdNumberEpsQuery,
} from "@/redux/apis/users/usersApi";

const EpsChangePasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const idUserEpsState = useAppSelector((state) => state.eps.id);
  const idNumberUserEpsState = useAppSelector((state) => state.eps.id_number);
  const nameEpsState = useAppSelector((state) => state.eps.name);
  const lastNameEpsState = useAppSelector((state) => state.eps.last_name);
  const idNumberEpsState = useAppSelector((state) => state.eps.id_number);
  const cellphoneEpsState = useAppSelector((state) => state.eps.cellphone);
  const errorsEpsState = useAppSelector((state) => state.eps.errors);

  const [oldPasswordEpsLocalState, setOldPasswordEpsLocalState] = useState("");
  const [newPasswordEpsLocalState, setNewPasswordEpsLocalState] = useState("");

  const [isSubmittingChangePassword, setIsSubmittingChangePassword] =
    useState(false);
  const [
    showSuccessMessageChangePassword,
    setShowSuccessMessageChangePassword,
  ] = useState(false);
  const [showErrorMessageChangePassword, setShowErrorMessageChangePassword] =
    useState(false);

  const [
    updatePasswordEps,
    {
      data: updatePasswordEpsData,
      isLoading: updatePasswordEpsLoading,
      isSuccess: updatePasswordEpsSuccess,
      isError: updatePasswordEpsError,
    },
  ] = useUpdatePasswordMutation({
    fixedCacheKey: "updatePasswordEpsData",
  });

  const {
    data: userEpsData,
    isLoading: userEpsDataLoading,
    isFetching: userEpsDataFetching,
    isError: userEpsDataError,
  } = useGetUserByIdNumberEpsQuery(idNumberUserEpsState);

  useEffect(() => {
    if (
      !idUserEpsState &&
      idNumberUserEpsState &&
      userEpsData &&
      !userEpsDataLoading &&
      !userEpsDataFetching
    ) {
      dispatch(setIdUserEps(userEpsData?.id));

      dispatch(setNameUserEps(userEpsData?.name));
      dispatch(setLastNameUserEps(userEpsData?.last_name));
      dispatch(setIdNumberUserEps(userEpsData?.id_number));
      dispatch(setCellphoneUserEps(userEpsData?.cellphone));
    }
  }, [idUserEpsState, idNumberUserEpsState, userEpsData]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingChangePassword(true);

      if (
        idUserEpsState &&
        oldPasswordEpsLocalState &&
        newPasswordEpsLocalState
      ) {
        const response: any = await updatePasswordEps({
          id: idUserEpsState,
          passwords: {
            oldPassword: oldPasswordEpsLocalState,
            newPassword: newPasswordEpsLocalState,
          },
        });

        var validationPatientData = response.data?.status;

        var validationPatientError = response.error?.status;

        if (validationPatientError !== 200 && !validationPatientData) {
          const errorMessage = response.error?.data?.message;

          dispatch(setErrorsUserEps(errorMessage));
          setShowErrorMessageChangePassword(true);
        }
        if (validationPatientData === 202 && !validationPatientError) {
          setShowSuccessMessageChangePassword(true);
          setOldPasswordEpsLocalState("");
          setNewPasswordEpsLocalState("");

          setTimeout(() => {
            dispatch(setEpsModalIsOpen(false));
          }, 4000);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingChangePassword(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserEps([]));
    setShowErrorMessageChangePassword(false);
    setShowSuccessMessageChangePassword(false);
  };

  const handleOnChangeValidatorNewPasswordForm = (_: any, value: string) => {
    if (
      !nameEpsState ||
      !lastNameEpsState ||
      !idNumberEpsState ||
      !cellphoneEpsState
    ) {
      return Promise.resolve();
    }

    const passwordUpperCase = value?.toUpperCase();

    const nameWords = nameEpsState?.toUpperCase().split(" ");

    const lastNameWords = lastNameEpsState?.toUpperCase().split(" ");

    const idNumber = String(idNumberEpsState);

    const cellphoneNumber = String(cellphoneEpsState);

    if (nameWords?.some((word) => passwordUpperCase?.includes(word))) {
      return Promise.reject(
        new Error(
          "¡La contraseña no puede contener datos del nombre del usuario!"
        )
      );
    }

    if (lastNameWords?.some((word) => passwordUpperCase?.includes(word))) {
      return Promise.reject(
        new Error(
          "¡La contraseña no puede contener datos del apellido del usuario!"
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
          message={errorsEpsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessageChangePassword && (
        <CustomMessage
          typeMessage="success"
          message={"¡Contraseña cambiada correctamente!"}
        />
      )}

      <Form
        id="change-password-form-eps"
        name="change-password-form-eps"
        className="change-password-form-eps"
        onFinish={handleChangePassword}
        initialValues={{ remember: false }}
        autoComplete="false"
        layout="vertical"
      >
        <h2
          className="title-change-password-eps"
          style={{
            ...titleStyleCss,
            marginBlock: 22,
            textAlign: "center",
          }}
        >
          Cambiar contraseña de cuenta
        </h2>

        <Form.Item
          id="old-password-eps"
          name="old-password-eps"
          className="old-password-eps"
          label="Contraseña antigua"
          style={{ marginBottom: 13 }}
          rules={[
            {
              required: true,
              message: "¡Por favor ingresa tu contraseña antigua!",
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
            value={oldPasswordEpsLocalState}
            placeholder="Contraseña antigua"
            onChange={(e) => {
              setOldPasswordEpsLocalState(e.target.value.trim());
            }}
          />
        </Form.Item>

        <Form.Item
          id="new-password-eps"
          name="new-password-eps"
          className="new-password-eps"
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
            value={newPasswordEpsLocalState}
            placeholder="Contraseña nueva"
            onChange={(e) => {
              setNewPasswordEpsLocalState(e.target.value.trim());
            }}
          />
        </Form.Item>

        <Form.Item
          id="verify-new-password-eps"
          name="verify-new-password-eps"
          className="verify-new-password-eps"
          label="Verificar contraseña nueva"
          style={{ marginBottom: 22 }}
          dependencies={["new-password-eps"]}
          rules={[
            {
              required: true,
              message: "¡Por favor verifica tu contraseña!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new-password-eps") === value) {
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
            value={newPasswordEpsLocalState}
            placeholder="Verificar contraseña nueva"
            onChange={(e) => {
              setNewPasswordEpsLocalState(e.target.value.trim());
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
              className="change-password-form-button-eps"
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

export default EpsChangePasswordForm;
