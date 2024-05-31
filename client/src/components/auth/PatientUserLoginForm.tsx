"use client";

import React, { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { UserRolType } from "../../../../api/src/utils/enums/user_roles.enum";

import { Button, Card, Col, Divider, Form, Input, Select } from "antd";
import { LockOutlined, IdcardOutlined } from "@ant-design/icons";
import PatientModalVerificationCode from "./PatientModalVerificationCode";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";
import { titleStyleCss } from "@/theme/text_styles";

import {
  setIdTypeOptionsLoginPatient,
  setIdTypeLoginPatient,
  setIdNumberLoginPatient,
  setPasswordLoginPatient,
  setVerificationCodeLoginPatient,
  setErrorsLoginPatient,
  resetLoginStatePatient,
} from "@/redux/features/login/patientUserLoginSlice";
import { setPatientModalIsOpen } from "@/redux/features/common/modal/modalSlice";

import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useLoginPatientUsersMutation } from "@/redux/apis/auth/loginUsersApi";
import { setDefaultValuesUserPatient } from "@/redux/features/patient/patientSlice";

const PatientUserLoginForm: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();
  const router = useRouter();

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
  const idPatientState = useAppSelector((state) => state.patient.id);
  const affiliationEpsPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const errorsPatientState = useAppSelector(
    (state) => state.patientUserLogin.errors
  );

  const modalIsOpenPatient = useAppSelector(
    (state) => state.modal.patientModalIsOpen
  );

  const [idTypePatientLocalState, setIdTypePatientLocalState] = useState(0);
  const [idNumberPatientLocalState, setIdNumberPatientLocalState] =
    useState("");
  const [passwordPatientLocalState, setPasswordPatientLocalState] =
    useState("");

  const [isSubmittingRegisterPagePatient, setIsSubmittingRegisterPagePatient] =
    useState(false);
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
      !idTypesPatientLoading &&
      !idTypesPatientFetching &&
      idTypesPatientData
    ) {
      dispatch(setIdTypeOptionsLoginPatient(idTypesPatientData));
    }
    if (idTypesPatientError) {
      dispatch(
        setErrorsLoginPatient(
          "¡No se pudo obtener los tipos de identificación!"
        )
      );
      setShowErrorMessagePatient(true);
      dispatch(setIdTypeOptionsLoginPatient(idTypesPatientData));
    }
    if (
      (status === "authenticated" &&
        session?.user.role === UserRolType.PATIENT) ||
      session?.user.role === UserRolType.EPS
    ) {
      signOut();
    }
  }, [
    idTypesPatientData,
    idTypesPatientLoading,
    idTypesPatientFetching,
    idTypesPatientError,
  ]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingPatient(true);
      dispatch(resetLoginStatePatient());
      dispatch(setDefaultValuesUserPatient());

      const idNumberPatientLocalStateInt = idNumberPatientLocalState
        ? parseInt(idNumberPatientLocalState?.toString(), 10)
        : 0;

      const response: any = await loginPatientUsers({
        id_type: idTypePatientLocalState,
        id_number: idNumberPatientLocalStateInt,
        password: passwordPatientLocalState,
      });

      var isLoginUserError = response.error;

      var isLoginUserSuccess = response.data;

      if (isLoginUserError) {
        const errorMessage = isLoginUserError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsLoginPatient(errorMessage[0]));
          setShowErrorMessagePatient(true);
        }
        if (typeof errorMessage === "string") {
          dispatch(setErrorsLoginPatient(errorMessage));
          setShowErrorMessagePatient(true);
        }
      }

      if (isLoginUserSuccess) {
        dispatch(setIdTypeLoginPatient(idTypePatientLocalState));
        dispatch(setIdNumberLoginPatient(idNumberPatientLocalStateInt));
        dispatch(setPasswordLoginPatient(passwordPatientLocalState));
        dispatch(setErrorsLoginPatient([]));
        setShowErrorMessagePatient(false);
        dispatch(setPatientModalIsOpen(true));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingPatient(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsLoginPatient([]));
    setShowErrorMessagePatient(false);
  };

  return (
    <Card
      key={"card-patient-user-login-form"}
      style={{
        width: "max-content",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fcfcfc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        marginBottom: "31px",
        marginInline: "31px",
      }}
    >
      {modalIsOpenPatient && <PatientModalVerificationCode />}

      {showErrorMessagePatient && (
        <CustomMessage
          typeMessage="error"
          message={errorsPatientState?.toString() || "¡Error en la petición!"}
        />
      )}

      <Col
        xs={24}
        lg={24}
        style={{ padding: "0 2px", width: "100vw", maxWidth: "321px" }}
      >
        <Form
          id="patient-users-login-form"
          name="patient-users-login-form"
          className="patient-users-login-form"
          onFinish={handleSubmit}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-login-patient"
            style={{
              ...titleStyleCss,
              textAlign: "center",
            }}
          >
            Ingreso de usuario <br /> Paciente
          </h2>

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
                value={idTypePatientLocalState}
                placeholder="Tipo de identificación"
                onChange={(e) => setIdTypePatientLocalState(e)}
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
              value={idNumberPatientLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberPatientLocalState(e.target.value)}
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
              value={passwordPatientLocalState}
              placeholder="Contraseña"
              onChange={(e) => setPasswordPatientLocalState(e.target.value)}
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
              ¿No tienes cuenta?
            </Divider>

            {isSubmittingRegisterPagePatient ? (
              <CustomSpin />
            ) : (
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
                onClick={async () => {
                  try {
                    setIsSubmittingRegisterPagePatient(true);

                    await router.push("/patient/register", {
                      scroll: true,
                    });
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setIsSubmittingRegisterPagePatient(false);
                  }
                }}
              >
                Activar cuenta
              </Button>
            )}
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
      </Col>
    </Card>
  );
};

export default PatientUserLoginForm;
