"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Divider, Form, Input, Select } from "antd";
import { IdcardOutlined } from "@ant-design/icons";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";

import {
  setNameUserPatient,
  setIdTypeUserPatient,
  setIdTypeAbbrevUserPatient,
  setIdNumberUserPatient,
  setGenderUserPatient,
  setBirthdateUserPatient,
  setEmailUserPatient,
  setCellphoneUserPatient,
  setPasswordUserPatient,
  setAuthMethodUserPatient,
  setResidenceAddressUserPatient,
  setAffiliationEpsUserPatient,
  setErrorsUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useValidateThatThePatientExistMutation } from "@/redux/apis/register/registerUsersApi";

import { IdTypeAbbrev } from "../../../../api/src/users/enums/id_type_abbrev.enum";

const RegisterPatientForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const namePatientState = useAppSelector((state) => state.patient.name);
  const idTypePatientState = useAppSelector(
    (state) => state.patient.user_id_type
  );
  const idTypeAbbrevPatientState = useAppSelector(
    (state) => state.patient.id_type_abbrev
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const genderPatientState = useAppSelector(
    (state) => state.patient.user_gender
  );
  const passwordPatientState = useAppSelector(
    (state) => state.patient.password
  );
  const birthdatePatientState = useAppSelector(
    (state) => state.patient.birthdate
  );
  const emailPatientState = useAppSelector((state) => state.patient.email);
  const cellphonePatientState = useAppSelector(
    (state) => state.patient.cellphone
  );
  const authMethodPatientState = useAppSelector(
    (state) => state.patient.auth_method
  );
  const affiliationEpsPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const residenceAddressPatientState = useAppSelector(
    (state) => state.patient.residence_address
  );
  const errorsPatientState = useAppSelector((state) => state.patient.errors);

  const [isSubmittingPatient, setIsSubmittingPatient] = useState(false);
  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  const [
    validatePatient,
    {
      data: isValidatePatientData,
      isLoading: isValidatePatientLoading,
      isSuccess: isValidatePatientSuccess,
      isError: isValidatePatientError,
    },
  ] = useValidateThatThePatientExistMutation({
    fixedCacheKey: "validatePatientData",
  });

  const handleValidatePatient = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingPatient(true);

      const response: any = await validatePatient({
        idType: idTypeAbbrevPatientState,
        idNumber: idNumberPatientState,
      });

      var validationPatientData = response.data?.[0].count;

      if (validationPatientData === 0) {
        const errorMessage =
          "El paciente no se encuentra registrado en la clínica";

        dispatch(setErrorsUserPatient(errorMessage));
        setShowErrorMessagePatient(true);
      } else {
        var patientData = response.data?.[0].data?.[0];

        dispatch(setNameUserPatient(patientData.NOMBRE));
        dispatch(setIdTypeUserPatient(patientData.TIPO));
        dispatch(setIdNumberUserPatient(patientData.ID));
        dispatch(setBirthdateUserPatient(patientData.FECHA_NACIMIENTO));
        dispatch(setEmailUserPatient(patientData.CORREO));
        dispatch(setCellphoneUserPatient(patientData.CELULAR));
        dispatch(setAffiliationEpsUserPatient(patientData.EMPRESA));
        dispatch(setResidenceAddressUserPatient(patientData.DIRECCION));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingPatient(false);
    }
  };

  const handleIdTypeChange = (value: string | undefined) => {
    if (value) {
      var idTypeAbbrevPatientString: string = value as IdTypeAbbrev;
      dispatch(setIdTypeAbbrevUserPatient(idTypeAbbrevPatientString));
    }
  };

  const handleGoToUserLogin = () => {
    router.push("/users_login", { scroll: true });
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserPatient([]));
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
        marginBottom: 31,
      }}
    >
      {showErrorMessagePatient && (
        <CustomMessage
          typeMessage="error"
          message={errorsPatientState?.toString() || "¡Error en la petición!"}
        />
      )}

      <h2
        className="title-register-patient"
        style={{
          fontWeight: "500",
          lineHeight: 1.3,
          marginTop: 0,
          textAlign: "center",
        }}
      >
        Registro de usuario Paciente
      </h2>

      <Form
        name="patient-user-register-form"
        className="patient-user-register-form"
        style={{ width: 231, marginTop: 13 }}
        onFinish={handleValidatePatient}
        initialValues={{ remember: false }}
        autoComplete="false"
        layout="vertical"
      >
        {!idTypeAbbrevPatientState ? (
          <CustomSpin />
        ) : (
          <Form.Item
            name="patient-user-id-type-register"
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
              value={idTypeAbbrevPatientState}
              placeholder="Tipo de identificación"
              onChange={handleIdTypeChange}
            >
              {Object.entries(IdTypeAbbrev).map(([key, value]) => (
                <Select.Option key={value} value={value}>
                  {key}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        )}

        <Form.Item
          name="patient-user-id-number-register"
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
            onChange={(e) => dispatch(setIdNumberUserPatient(e.target.value))}
            min={0}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          {isSubmittingPatient ? (
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
              className="patient-register-form-button"
              onClick={handleButtonClick}
            >
              Validar Paciente
            </Button>
          )}

          <Divider
            style={{
              fontSize: 13,
              fontWeight: "normal",
              marginBlock: 4,
              borderWidth: 1.3,
            }}
          >
            ¿Ya tienes cuenta?
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
            onClick={handleGoToUserLogin}
            onMouseDown={handleButtonClick}
          >
            Ingresar con mi cuenta
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegisterPatientForm;
