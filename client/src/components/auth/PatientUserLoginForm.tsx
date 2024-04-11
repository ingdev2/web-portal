"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import PatientModalVerificationCode from "./PatientModalVerificationCode";
import { Button, Card, Divider, Form, Input, Select } from "antd";
import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";

import {
  setIdTypeOptionsPatient,
  setIdTypePatient,
  setIdNumberPatient,
  setPasswordPatient,
  setVerificationCodePatient,
  setErrorsPatient,
} from "@/redux/features/login/patientUserLoginSlice";
import { setPatientModalIsOpen } from "@/redux/features/modal/modalSlice";

import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useLoginPatientUsersMutation } from "@/redux/apis/auth/loginUsersApi";

const PatientUserLoginForm: React.FC = () => {
  const dispatch = useAppDispatch();

  const idTypeOptionsPatient = useAppSelector(
    (state) => state.patientUserLogin.idTypeOptions
  );
  const idTypePatientState = useAppSelector(
    (state) => state.patientUserLogin.id_type
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );
  const passwordPatientState = useAppSelector(
    (state) => state.patientUserLogin.password
  );
  const errorsPatientState = useAppSelector(
    (state) => state.patientUserLogin.errors
  );

  const modalIsOpenPatient = useAppSelector(
    (state) => state.modal.patientModalIsOpen
  );

  const [isSubmittingPatient, setIsSubmittingPatient] = useState(false);
  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  const {
    data: idTypesPatientData,
    isLoading: idTypesPatientLoading,
    isFetching: idTypesPatientFetching,
    error: idTypesPatientError,
  } = useGetAllIdTypesQuery(null);

  const [
    loginPatientUsers,
    {
      data: isLoginPatientData,
      isLoading: isLoginPatientLoading,
      isSuccess: isLoginPatientSuccess,
      isError: isLoginPatientError,
    },
  ] = useLoginPatientUsersMutation({ fixedCacheKey: "loginPatientData" });

  useEffect(() => {
    if (
      !isLoginPatientSuccess &&
      !isSubmittingPatient &&
      !isLoginPatientError &&
      isLoginPatientData
    ) {
      dispatch(setIdTypePatient(""));
      dispatch(setIdNumberPatient(""));
      dispatch(setPasswordPatient(""));
      dispatch(setVerificationCodePatient(""));
    }
    if (!idTypesPatientLoading && idTypesPatientData) {
      dispatch(setIdTypeOptionsPatient(idTypesPatientData));
    }
    if (idTypesPatientError) {
      setShowErrorMessagePatient(true);
      dispatch(setIdTypeOptionsPatient(idTypesPatientData));
    }
    if (
      isLoginPatientSuccess &&
      !isLoginPatientLoading &&
      !isSubmittingPatient
    ) {
      dispatch(setPatientModalIsOpen(true));
    }
  }, [
    idTypesPatientData,
    idTypesPatientLoading,
    idTypesPatientError,
    isSubmittingPatient,
    isLoginPatientError,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingPatient(true);

      const response: any = await loginPatientUsers({
        id_type: idTypePatientState,
        id_number: idNumberPatientState,
        password: passwordPatientState,
      });

      var isLoginUserError = response.error;

      if (
        !isLoginPatientSuccess &&
        !isLoginPatientLoading &&
        isLoginUserError
      ) {
        const errorMessage = isLoginUserError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsPatient(errorMessage[0]));
          setShowErrorMessagePatient(true);
        }
        if (typeof errorMessage === "string") {
          dispatch(setErrorsPatient(errorMessage));
          setShowErrorMessagePatient(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingPatient(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsPatient([]));
    setShowErrorMessagePatient(false);
  };

  return (
    <Card
      style={{
        width: 270,
        height: "min-content",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fcfcfc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      {modalIsOpenPatient && <PatientModalVerificationCode />}

      {showErrorMessagePatient && (
        <CustomMessage
          typeMessage="error"
          message={errorsPatientState?.toString() || "¡Error en la petición!"}
        />
      )}

      <Form
        name="patient-users-login-form"
        className="patient-users-login-form"
        style={{ width: 231, marginTop: 13 }}
        onFinish={handleSubmit}
        initialValues={{ remember: false }}
        autoComplete="false"
        layout="vertical"
      >
        {idTypesPatientLoading || idTypesPatientFetching ? (
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
              value={idTypePatientState}
              placeholder="Tipo de identificación"
              onChange={(e) => dispatch(setIdTypePatient(e))}
            >
              {idTypeOptionsPatient?.map((option: any) => (
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
            value={idNumberPatientState}
            placeholder="Número de identificación"
            onChange={(e) => dispatch(setIdNumberPatient(e.target.value))}
            min={0}
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
            value={passwordPatientState}
            placeholder="Contraseña"
            onChange={(e) => dispatch(setPasswordPatient(e.target.value))}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <a
            className="patient-login-form-forgot-user"
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

          {isSubmittingPatient && isLoginPatientLoading ? (
            <CustomSpin />
          ) : (
            <Button
              size="large"
              style={{
                paddingInline: 62,
                borderRadius: 31,
                backgroundColor: "#015E90",
                color: "#f2f2f2",
                marginBottom: 7,
              }}
              htmlType="submit"
              className="patient-login-form-button"
              onClick={handleButtonClick}
            >
              Ingresar
            </Button>
          )}

          <Divider
            style={{
              fontSize: 13,
              fontWeight: "normal",
              marginBlock: 7,
              borderWidth: 1.3,
            }}
          >
            ¿No estas registrado?
          </Divider>

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
            className="patient-register-button"
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

export default PatientUserLoginForm;
