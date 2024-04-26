"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Card,
  Form,
  Button,
  Checkbox,
  CheckboxProps,
  Input,
  Radio,
  Space,
  Typography,
  Col,
  Row,
} from "antd";
import { LockOutlined, WhatsAppOutlined } from "@ant-design/icons";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";
import { FcHighPriority } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";

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
  setWhatsappUserPatient,
  setDefaultValuesUserPatient,
  setIdUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useCreateUserPatientMutation } from "@/redux/apis/register/registerUsersApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";

import CustomModalTwoOptions from "../common/custom_modal_two_options/CustomModalTwoOptions";

const ValidatePatientData: React.FC = () => {
  const { data: session, status } = useSession();

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
  const genderPatientAbbrevState = useAppSelector(
    (state) => state.patient.user_gender_abbrev
  );
  const birthdatePatientState = useAppSelector(
    (state) => state.patient.birthdate
  );
  const emailPatientState = useAppSelector((state) => state.patient.email);
  const cellphonePatientState = useAppSelector(
    (state) => state.patient.cellphone
  );
  const whatsappPatientState = useAppSelector(
    (state) => state.patient.whatsapp
  );
  const affiliationEpsPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const residenceAddressPatientState = useAppSelector(
    (state) => state.patient.residence_address
  );
  const errorsPatientState = useAppSelector((state) => state.patient.errors);

  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  const [showCustomCancelModal, setShowCustomCancelModal] = useState(false);
  const [showCustomConfirmModal, setShowCustomConfirmModal] = useState(false);

  const [allAuthMethodsData, setAllAuthMethodsData]: any = useState([]);

  const [passwordUserPatientLocalState, setPasswordUserPatientLocalState] =
    useState("");
  const [authMethodUserPatientLocalState, setAuthMethodUserPatientLocalState] =
    useState(0);

  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isSubmittingConfirmData, setIsSubmittingConfirmData] = useState(false);
  const [isSubmittingIncorrectData, setIsSubmittingIncorrectData] =
    useState(false);
  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  const [
    createUserPatient,
    {
      data: isCreateUserPatientData,
      isLoading: isCreateUserPatientLoading,
      isSuccess: isCreateUserPatientSuccess,
      isError: isCreateUserPatientError,
    },
  ] = useCreateUserPatientMutation({
    fixedCacheKey: "createUserPatientData",
  });

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/patient/homepage");
    }
    if (!idTypeAbbrevPatientState && !idNumberPatientState) {
      redirect("/login");
    }
    if (!idTypeAbbrevPatientState && !idNumberPatientState) {
      dispatch(setErrorsUserPatient("¡Datos de paciente no encontrados!"));
      setShowErrorMessagePatient(true);
    }
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setAllAuthMethodsData(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsUserPatient(
          "¡No se pudo obtener los métodos de autenticación!"
        )
      );
      setShowErrorMessagePatient(true);
      setAllAuthMethodsData(authMethodData);
    }
  }, [
    status,
    idTypeAbbrevPatientState,
    idNumberPatientState,
    authMethodLoading,
    authMethodFetching,
    authMethodData,
    authMethodError,
  ]);

  const handleCorrectData = () => {
    try {
      setShowCustomConfirmModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingConfirmData(false);
    }
  };

  const handleIncorrectData = () => {
    try {
      setShowCustomCancelModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingIncorrectData(false);
    }
  };

  const handleConfirmConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingConfirmData(true);

      const patientData: any = {
        name: namePatientState,
        user_id_type: idTypePatientState,
        id_number: idNumberPatientState,
        user_gender: genderPatientState,
        birthdate: birthdatePatientState,
        email: emailPatientState,
        cellphone: cellphonePatientState,
        password: passwordUserPatientLocalState,
        affiliation_eps: affiliationEpsPatientState,
        residence_address: residenceAddressPatientState,
        authentication_method: authMethodUserPatientLocalState,
      };

      if (whatsappPatientState) {
        patientData.whatsapp = whatsappPatientState;
      }

      const response: any = await createUserPatient(patientData);

      var createUserPatientData = response?.data;

      var errorMessage = response.data?.message;

      if (createUserPatientData?.status === 409) {
        dispatch(setErrorsUserPatient(errorMessage));
        setShowErrorMessagePatient(true);
      } else {
        dispatch(setIdUserPatient(createUserPatientData?.id));
        dispatch(setAuthMethodUserPatient(authMethodUserPatientLocalState));
        dispatch(setPasswordUserPatient(passwordUserPatientLocalState));

        await router.push("/patient/register/registration_success", {
          scroll: false,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingConfirmData(false);
    }
  };

  const handleConfirmIncorrectDataModal = async (
    e: React.MouseEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingIncorrectData(true);

      await new Promise((resolve) => setTimeout(resolve, 700));

      await router.replace("/login", {
        scroll: false,
      });

      dispatch(setDefaultValuesUserPatient());
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingIncorrectData(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserPatient([]));
    setShowErrorMessagePatient(false);
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const customCheckboxValidator = (_: any, value: boolean) => {
    return new Promise((resolve, reject) => {
      if (!value) {
        reject(
          new Error(
            "¡Para continuar debes aceptar las políticas de tratamientos de datos!"
          )
        );
      } else {
        resolve(
          "¡El usuario aceptó términos y condiciones de tratamiento de datos!"
        );
      }
    });
  };

  return (
    <Card
      style={{
        maxWidth: 720,
        width: "100%",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fcfcfc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        marginBottom: 31,
        padding: 7,
      }}
    >
      {showCustomConfirmModal && (
        <CustomModalTwoOptions
          key={"custom-confirm-modal"}
          iconCustomModal={<FcInfo size={77} />}
          openCustomModalState={showCustomConfirmModal}
          titleCustomModal="¿Deseas activar tu cuenta?"
          subtitleCustomModal="Tu cuenta se activará inmediatamente con el correo electrónico y celular que observaste en la pantalla anterior, si no tienes acceso a ninguno de esos medios de comunicación no podrás ingresar a tu cuenta."
          handleCancelCustomModal={() => setShowCustomConfirmModal(false)}
          handleConfirmCustomModal={handleConfirmConfirmDataModal}
          handleClickCustomModal={handleButtonClick}
          isSubmittingConfirm={isSubmittingConfirmData}
        ></CustomModalTwoOptions>
      )}

      {showCustomCancelModal && (
        <CustomModalTwoOptions
          key={"custom-cancel-modal"}
          iconCustomModal={<FcHighPriority size={77} />}
          openCustomModalState={showCustomCancelModal}
          titleCustomModal="¿Tus datos son incorrectos?"
          subtitleCustomModal="Si tus datos no son correctos, te recomendamos no activar tu cuenta y comunicarte a nuestra línea de PBX para realizar la actualización de tus datos personales."
          handleCancelCustomModal={() => setShowCustomCancelModal(false)}
          handleConfirmCustomModal={handleConfirmIncorrectDataModal}
          handleClickCustomModal={handleButtonClick}
          isSubmittingConfirm={isSubmittingIncorrectData}
        ></CustomModalTwoOptions>
      )}

      {showErrorMessagePatient && (
        <CustomMessage
          typeMessage="error"
          message={errorsPatientState?.toString() || "¡Error en la petición!"}
        />
      )}

      <Row>
        <Col xs={24} md={12} lg={12} style={{ padding: "0 7px" }}>
          <h2
            className="title-register-patient"
            style={{
              fontWeight: "500",
              lineHeight: 1.3,
              marginTop: 2,
              marginBottom: 7,
              textAlign: "center",
            }}
          >
            Verificar datos
          </h2>

          <p
            className="warning-message-verify-data"
            style={{
              display: "flow",
              color: "#960202",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            Por favor, verifique si todos sus datos están correctos, de lo
            contrario debe comunicarse a nuestra línea PBX: (601)3770055 para
            realizar la actualización de sus datos personales.
          </p>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Nombre de paciente:
            </Typography.Title>
            <Input
              id="name-patient-auto-input"
              value={namePatientState}
              disabled
            />
          </div>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Tipo de documento:
            </Typography.Title>
            <Input
              id="id-type-patient-auto-input"
              value={idTypeAbbrevPatientState}
              disabled
            />
          </div>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Número de documento:
            </Typography.Title>
            <Input
              id="patient-id-number-hosvital"
              value={idNumberPatientState}
              disabled
            />
          </div>

          <p
            className="warning-message-auth-method"
            style={{
              display: "flow",
              color: "#960202",
              fontWeight: 500,
              textAlign: "center",
            }}
          >
            El correo electrónico y el número de celular que se muestran a
            continuación serán los canales autorizados que se tomarán para
            realizar el proceso de autenticación.
          </p>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Correo electrónico:
            </Typography.Title>
            <Input
              id="patient-email-hosvital"
              value={emailPatientState}
              disabled
            />
          </div>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Número de celular:
            </Typography.Title>
            <Input
              id="patient-cellphone-hosvital"
              value={cellphonePatientState}
              disabled
            />
          </div>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Sexo:
            </Typography.Title>
            <Input
              id="patient-gender-hosvital"
              value={genderPatientAbbrevState}
              disabled
            />
          </div>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Fecha de nacimiento:
            </Typography.Title>
            <Input
              id="patient-birthdate-hosvital"
              value={birthdatePatientState}
              disabled
            />
          </div>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Afiliado a EPS:
            </Typography.Title>
            <Input
              id="patient-affiliationeps-hosvital"
              value={affiliationEpsPatientState}
              disabled
            />
          </div>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Dirección de residencia:
            </Typography.Title>
            <Input
              id="patient-residenceaddress-hosvital"
              value={residenceAddressPatientState}
              disabled
            />
          </div>
        </Col>

        <Col xs={24} md={12} style={{ padding: "0 13px" }}>
          <h2
            className="title-register-patient"
            style={{
              fontWeight: "500",
              lineHeight: 1.3,
              marginTop: 2,
              marginBottom: 22,
              textAlign: "center",
            }}
          >
            Ingresar datos adicionales
          </h2>

          <Form
            id="patient-user-register-form"
            name="patient-user-register-form"
            className="patient-user-register-form"
            onFinish={handleCorrectData}
            initialValues={{ remember: false }}
            autoComplete="false"
            layout="vertical"
          >
            <Form.Item
              name="radio-select-auth-method"
              label="Método de autenticación"
              style={{ marginBottom: 22 }}
              rules={[
                {
                  required: true,
                  message: "¡Por favor selecciona un método de autenticación!",
                },
              ]}
            >
              <Radio.Group
                value={authMethodUserPatientLocalState}
                onChange={(e) =>
                  setAuthMethodUserPatientLocalState(e.target.value)
                }
                style={{ textAlign: "start" }}
              >
                <Space size={"small"} direction="horizontal">
                  {allAuthMethodsData?.map((option: any) => (
                    <Radio key={option.id} value={option.id}>
                      {option.name}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Form.Item>

            <Form.Item
              name="patient-user-whatsapp-register"
              label="WhatsApp (opcional)"
              style={{ marginBottom: 13 }}
              rules={[
                {
                  required: false,
                },
                {
                  pattern: /^[0-9]+$/,
                  message:
                    "¡Por favor ingresa número de WhatsApp sin puntos ni comas!",
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
                prefix={<WhatsAppOutlined className="site-form-item-icon" />}
                type="number"
                value={whatsappPatientState}
                placeholder="Número de WhatsApp"
                onChange={(e) =>
                  dispatch(setWhatsappUserPatient(e.target.value))
                }
                min={0}
              />
            </Form.Item>

            <Form.Item
              name="patient-user-password-register"
              label="Contraseña"
              style={{ marginBottom: 22 }}
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
                value={passwordUserPatientLocalState}
                placeholder="Contraseña"
                onChange={(e) =>
                  setPasswordUserPatientLocalState(e.target.value.trim())
                }
              />
            </Form.Item>

            <Form.Item
              name="patient-user-password-verify-register"
              label="Verificar contraseña"
              style={{ marginBottom: 22 }}
              dependencies={["patient-user-password-register"]}
              rules={[
                {
                  required: true,
                  message: "¡Por favor verifica tu contraseña!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (
                      !value ||
                      getFieldValue("patient-user-password-register") === value
                    ) {
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
                value={passwordUserPatientLocalState}
                placeholder="Verificar contraseña"
                onChange={(e) =>
                  setPasswordUserPatientLocalState(e.target.value.trim())
                }
              />
            </Form.Item>

            <Form.Item
              name="checkbox-data-autorization"
              valuePropName="checked"
              style={{ textAlign: "center", marginBottom: 13 }}
              rules={[
                {
                  validator: customCheckboxValidator,
                },
              ]}
            >
              <div style={{ marginBlock: 7 }}>
                <div style={{ marginBottom: 13 }}>
                  <a
                    className="data-processing-autorization-link"
                    href={
                      process.env.NEXT_PUBLIC_DATA_PROCESSING_AUTORIZATION_LINK
                    }
                    target="_blank"
                    style={{ textDecoration: "underline" }}
                  >
                    Leer Política de Tratamiento de Datos
                  </a>
                </div>
                <Checkbox
                  checked={isCheckboxChecked}
                  onChange={handleCheckboxChange}
                >
                  Acepto las políticas de tratamiento de datos personales
                </Checkbox>
              </div>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              {isSubmittingConfirmData ? (
                <CustomSpin />
              ) : (
                <Button
                  size="large"
                  style={{
                    paddingInline: 31,
                    borderRadius: 31,
                    backgroundColor: "#015E90",
                    color: "#f2f2f2",
                    marginBlock: 7,
                    marginInline: 7,
                  }}
                  htmlType="submit"
                  className="patient-confirm-data-button"
                  onClick={handleButtonClick}
                >
                  Datos Correctos
                </Button>
              )}

              <Button
                size="large"
                style={{
                  paddingInline: 31,
                  borderRadius: 31,
                  backgroundColor: "#8C1111",
                  color: "#f2f2f2",
                  marginTop: 7,
                  marginInline: 7,
                }}
                className="patient-incorrect-data-button"
                onClick={handleIncorrectData}
                onMouseDown={handleButtonClick}
              >
                Datos Incorrectos
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};

export default ValidatePatientData;
