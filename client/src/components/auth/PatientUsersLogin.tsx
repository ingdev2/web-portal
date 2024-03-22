"use client";

import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button, Card, Form, Input, Select } from "antd";
import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";
import {
  setIdType,
  setIdTypeOptions,
  setIdNumber,
  setPassword,
  setErrors,
} from "@/redux/features/userLoginSlice";
import { useGetAllIdTypesQuery } from "@/redux/apis/idTypesApi";

const PatientUsersLogin: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const idTypeOptions = useAppSelector(
    (state) => state.userLogin.idTypeOptions
  );
  const id_type = useAppSelector((state) => state.userLogin.id_type);
  const id_number = useAppSelector((state) => state.userLogin.id_number);
  const password = useAppSelector((state) => state.userLogin.password);
  const errors = useAppSelector((state) => state.userLogin.errors);

  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  useEffect(() => {
    if (!idTypesLoading && idTypesData) {
      dispatch(setIdTypeOptions(idTypesData));
    }
    if (idTypesError) {
      setShowErrorMessage(true);
      dispatch(setIdTypeOptions(idTypesData));
    }
  }, [idTypesData, idTypesLoading, idTypesError]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      const responseNextAuth = await signIn("credentials", {
        id_type,
        id_number,
        password,
        redirect: false,
      });

      if (responseNextAuth?.error) {
        dispatch(setErrors(responseNextAuth.error.split(",")));
        setShowErrorMessage(true);
      }

      router.push("/dashboard-admin");
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = () => {
    setShowErrorMessage(false);
  };

  return (
    <Card
      style={{
        width: "31vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fcfcfc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={errors.toString() || "¡Error en la petición!"}
        />
      )}
      <Form
        name="normal_login"
        className="login-form"
        style={{ maxWidth: "31vw" }}
        onFinish={handleSubmit}
        initialValues={{ remember: false }}
        autoComplete="false"
        layout="vertical"
      >
        {idTypesLoading || idTypesFetching ? (
          <CustomSpin />
        ) : (
          <Form.Item
            name="patient-user-id-type"
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
              value={id_type}
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
          name="patient-user-id-number"
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
            value={id_number}
            placeholder="Número de identificación"
            onChange={(e) => dispatch(setIdNumber(e.target.value))}
          />
        </Form.Item>
        <Form.Item
          name="patient-user-password"
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
            value={password}
            placeholder="Contraseña"
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
        </Form.Item>
        <center>
          <Form.Item style={{ marginBottom: 7 }}>
            <a
              className="login-form-forgot-patient-user"
              href=""
              style={{
                color: "#960202",
                textDecorationLine: "underline",
                fontWeight: 500,
              }}
            >
              Olvide mi contraseña
            </a>
          </Form.Item>
        </center>
        <Form.Item>
          <center>
            <Button
              style={{
                width: 173,
                borderRadius: 31,
                backgroundColor: "#015E90",
                color: "#f2f2f2",
              }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
              onClick={handleButtonClick}
            >
              Ingresar
            </Button>
            <div style={{ marginBottom: 13 }} />
            <hr
              style={{
                width: 207,
                marginBottom: 13,
              }}
            />
            <Button
              style={{
                width: 123,
                color: "#015E90",
                borderColor: "#015E90",
                fontWeight: "bold",
                borderRadius: 7,
                borderWidth: 1.3,
                padding: 2,
              }}
              type="default"
              htmlType="button"
              className="register-button"
            >
              Registrarme
            </Button>
          </center>
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

export default PatientUsersLogin;
