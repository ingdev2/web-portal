"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import ModalVerificationCode from "./ModalVerificationCode";
import { Button, Card, Form, Input, Select } from "antd";
import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";

import {
  setIdTypeOptions,
  setIdType,
  setIdNumber,
  setPassword,
  setErrors,
} from "@/redux/features/login/userLoginSlice";
import { setModalIsOpen } from "@/redux/features/modal/modalSlice";

import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useLoginUsersMutation } from "@/redux/apis/auth/loginUsersApi";

const UsersLogin: React.FC = () => {
  const dispatch = useAppDispatch();

  const idTypeOptions = useAppSelector(
    (state) => state.userLogin.idTypeOptions
  );
  const idTypeState = useAppSelector((state) => state.userLogin.id_type);
  const idNumberState = useAppSelector((state) => state.userLogin.id_number);
  const passwordState = useAppSelector((state) => state.userLogin.password);
  const errorsState = useAppSelector((state) => state.userLogin.errors);

  const modalIsOpen = useAppSelector((state) => state.modal.modalIsOpen);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const [
    loginUsers,
    { data: isLogindata, isLoading: isLoginLoading, isSuccess: isLoginSuccess },
  ] = useLoginUsersMutation({ fixedCacheKey: "loginUserData" });

  useEffect(() => {
    if (!idTypesLoading && idTypesData) {
      dispatch(setIdTypeOptions(idTypesData));
    }
    if (idTypesError) {
      setShowErrorMessage(true);
      dispatch(setIdTypeOptions(idTypesData));
    }
    if (isLoginSuccess && !isLoginLoading && !isSubmitting) {
      dispatch(setModalIsOpen(true));
    }
  }, [idTypesData, idTypesLoading, idTypesError, isSubmitting]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmitting(true);

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
      setIsSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrors([]));
    setShowErrorMessage(false);
  };

  return (
    <Card
      style={{
        width: 270,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fcfcfc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      {modalIsOpen && <ModalVerificationCode />}

      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      <Form
        name="users-login-form"
        className="users-login-form"
        style={{ width: 231 }}
        onFinish={handleSubmit}
        initialValues={{ remember: false }}
        autoComplete="false"
        layout="vertical"
      >
        {idTypesLoading || idTypesFetching ? (
          <CustomSpin />
        ) : (
          <Form.Item
            name="user-id-type"
            label="Tipo de identificación"
            style={{ marginBottom: 7 }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa tu tipo de identificación!",
              },
            ]}
          >
            <Select
              value={idTypeState}
              placeholder="Tipo de identificación"
              onChange={(e) => dispatch(setIdType(e))}
            >
              {idTypeOptions?.map((option: any) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="user-id-number"
          label="Número de identificación"
          style={{ marginBottom: 7 }}
          rules={[
            {
              required: true,
              message: "¡Por favor ingresa tu número de identificación!",
            },
            {
              pattern: /^[0-9]+$/,
              message:
                "¡Por favor ingresa número de identificación sin puntos!",
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
            type="number"
            value={idNumberState}
            placeholder="Número de identificación"
            onChange={(e) => dispatch(setIdNumber(e.target.value))}
            min={0}
          />
        </Form.Item>

        <Form.Item
          name="user-password"
          label="Contraseña"
          style={{ marginBottom: 13 }}
          rules={[
            {
              required: true,
              message: "¡Por favor ingresa tu contraseña!",
            },
            {
              min: 7,
              message: "¡La contraseña debe tener mínimo 7 caracteres!",
            },
            {
              max: 14,
              message: "¡La contraseña debe tener máximo 14 caracteres!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            value={passwordState}
            placeholder="Contraseña"
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <a
            className="login-form-forgot-user"
            href=""
            style={{
              display: "flow",
              color: "#960202",
              textDecorationLine: "underline",
              fontWeight: 500,
              marginBottom: 13,
            }}
          >
            Olvide mi contraseña
          </a>

          {isSubmitting && isLoginLoading ? (
            <CustomSpin />
          ) : (
            <Button
              size="middle"
              style={{
                paddingInline: 62,
                borderRadius: 31,
                backgroundColor: "#015E90",
                color: "#f2f2f2",
                marginBottom: 7,
              }}
              htmlType="submit"
              className="login-form-button"
              onClick={handleButtonClick}
            >
              Ingresar
            </Button>
          )}

          <hr style={{ marginInline: 13 }} />

          <Button
            style={{
              paddingInline: 22,
              color: "#015E90",
              borderColor: "#015E90",
              fontWeight: "bold",
              borderRadius: 7,
              borderWidth: 1.3,
              marginTop: 7,
            }}
            htmlType="button"
            className="register-button"
          >
            Registrarme
          </Button>
        </Form.Item>
        {/* <Form.ErrorList
          errors={errors?.map((error) => (
            <div
              key={error}
              style={{
                marginTop: 0,
                marginBottom: 13,
                textAlign: "center",
                color: "#960202",
              }}
            >
              {error}
            </div>
          ))}
        /> */}
      </Form>
    </Card>
  );
};

export default UsersLogin;
