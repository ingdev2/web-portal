"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button, Col, Form, Input } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { LockOutlined } from "@ant-design/icons";

import {
  setIdAdmin,
  setNameAdmin,
  setLastNameAdmin,
  setIdNumberAdmin,
  setCorporateEmailAdmin,
  setErrorsAdmin,
} from "@/redux/features/admin/adminSlice";
import { setAdminModalIsOpen } from "@/redux/features/common/modal/modalSlice";

import {
  useUpdatePasswordMutation,
  useGetAdminByIdNumberQuery,
} from "@/redux/apis/admins/adminsApi";

const AdminChangePasswordForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const idAdminState = useAppSelector((state) => state.admin.id);
  const idNumberAdminState = useAppSelector((state) => state.admin.id_number);
  const nameAdminState = useAppSelector((state) => state.admin.name);
  const lastNameEpsState = useAppSelector((state) => state.admin.last_name);
  const idNumberEpsState = useAppSelector((state) => state.admin.id_number);
  const emailAdminState = useAppSelector(
    (state) => state.admin.corporate_email
  );
  const errorsEpsState = useAppSelector((state) => state.admin.errors);

  const [oldPasswordAdminLocalState, setOldPasswordAdminLocalState] =
    useState("");
  const [newPasswordAdminLocalState, setNewPasswordAdminLocalState] =
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
    updatePasswordAdmin,
    {
      data: updatePasswordAdminData,
      isLoading: updatePasswordAdminLoading,
      isSuccess: updatePasswordAdminSuccess,
      isError: updatePasswordAdminError,
    },
  ] = useUpdatePasswordMutation({
    fixedCacheKey: "updatePasswordAdminData",
  });

  const {
    data: adminData,
    isLoading: adminDataLoading,
    isFetching: adminDataFetching,
    isError: adminDataError,
  } = useGetAdminByIdNumberQuery(idNumberAdminState);

  useEffect(() => {
    if (
      !idAdminState &&
      idNumberAdminState &&
      adminData &&
      !adminDataLoading &&
      !adminDataFetching
    ) {
      dispatch(setIdAdmin(adminData?.id));

      dispatch(setNameAdmin(adminData?.name));
      dispatch(setLastNameAdmin(adminData?.last_name));
      dispatch(setIdNumberAdmin(adminData?.id_number));
      dispatch(setCorporateEmailAdmin(adminData?.corporate_email));
    }
  }, [idAdminState, idNumberAdminState, adminData]);

  const handleChangePassword = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingChangePassword(true);

      if (
        idAdminState &&
        oldPasswordAdminLocalState &&
        newPasswordAdminLocalState
      ) {
        const response: any = await updatePasswordAdmin({
          id: idAdminState,
          passwords: {
            oldPassword: oldPasswordAdminLocalState,
            newPassword: newPasswordAdminLocalState,
          },
        });

        let validationData = response.data?.status;

        let validationDataError = response.error?.status;

        if (validationDataError !== 200 && !validationData) {
          const errorMessage = response.error?.data?.message;

          dispatch(setErrorsAdmin(errorMessage));
          setShowErrorMessageChangePassword(true);

          setIsSubmittingChangePassword(false);
        }
        if (validationData === 202 && !validationDataError) {
          setShowSuccessMessageChangePassword(true);
          setOldPasswordAdminLocalState("");
          setNewPasswordAdminLocalState("");

          setTimeout(() => {
            dispatch(setAdminModalIsOpen(false));
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
    dispatch(setErrorsAdmin([]));
    setShowErrorMessageChangePassword(false);
    setShowSuccessMessageChangePassword(false);
  };

  const handleOnChangeValidatorNewPasswordForm = (_: any, value: string) => {
    if (
      !nameAdminState ||
      !lastNameEpsState ||
      !idNumberEpsState ||
      !emailAdminState
    ) {
      return Promise.resolve();
    }

    const passwordUpperCase = value.toUpperCase();
    const idNumber = String(idNumberEpsState);

    const corporateEmailLocalPart = emailAdminState
      .split("@")[0]
      ?.toUpperCase();

    const forbiddenWords = [
      ...nameAdminState.toUpperCase().split(" "),
      ...lastNameEpsState.toUpperCase().split(" "),
      idNumber,
      corporateEmailLocalPart,
    ];

    if (forbiddenWords.some((word) => passwordUpperCase.includes(word))) {
      return Promise.reject(
        new Error(
          "¡La contraseña no puede contener datos personales del usuario!"
        )
      );
    }

    return Promise.resolve();
  };

  return (
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
        id="change-password-form-admin"
        name="change-password-form-admin"
        className="change-password-form-admin"
        onFinish={handleChangePassword}
        initialValues={{ remember: false }}
        autoComplete="false"
        layout="vertical"
      >
        <h2
          className="title-change-password-admin"
          style={{
            ...titleStyleCss,
            marginBlock: 22,
            textAlign: "center",
          }}
        >
          Cambiar contraseña de cuenta
        </h2>

        <Form.Item
          id="current-password-admin"
          name="current-password-admin"
          className="current-password-admin"
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
            value={oldPasswordAdminLocalState}
            placeholder="Contraseña actual"
            onChange={(e) => {
              setOldPasswordAdminLocalState(e.target.value.trim());
            }}
          />
        </Form.Item>

        <Form.Item
          id="new-password-admin"
          name="new-password-admin"
          className="new-password-admin"
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
            value={newPasswordAdminLocalState}
            placeholder="Contraseña nueva"
            onChange={(e) => {
              setNewPasswordAdminLocalState(e.target.value.trim());
            }}
          />
        </Form.Item>

        <Form.Item
          id="verify-new-password-admin"
          name="verify-new-password-admin"
          className="verify-new-password-admin"
          label="Verificar contraseña nueva"
          style={{ marginBottom: 22 }}
          dependencies={["new-password-admin"]}
          rules={[
            {
              required: true,
              message: "¡Por favor verifica tu contraseña!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("new-password-admin") === value) {
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
            value={newPasswordAdminLocalState}
            placeholder="Verificar contraseña nueva"
            onChange={(e) => {
              setNewPasswordAdminLocalState(e.target.value.trim());
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
              className="change-password-form-button-admin"
              onClick={handleButtonClick}
            >
              Cambiar contraseña
            </Button>
          )}
        </Form.Item>
      </Form>
    </Col>
  );
};

export default AdminChangePasswordForm;
