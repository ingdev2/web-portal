"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { notFound, useRouter } from "next/navigation";
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
import PhoneInput from "antd-phone-input";
import { titleStyleCss } from "@/theme/text_styles";
import { LockOutlined, WhatsAppOutlined } from "@ant-design/icons";
import CustomSpin from "../../common/custom_spin/CustomSpin";
import CustomMessage from "../../common/custom_messages/CustomMessage";
import { FcHighPriority } from "react-icons/fc";
import { FcInfo } from "react-icons/fc";

import {
  setPasswordUserPatient,
  setAuthMethodUserPatient,
  setErrorsUserPatient,
  setIdUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useCreateUserPatientMutation } from "@/redux/apis/register/registerUsersApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";

import CustomModalTwoOptions from "../../common/custom_modal_two_options/CustomModalTwoOptions";
import {
  checkboxProcessingPersonalDataValidator,
  checkboxMessagesValidator,
} from "@/helpers/checkbox_validator/checkbox_validator";

import { CONTACT_PBX } from "@/utils/constants/constants";

const ValidatePatientData: React.FC = () => {
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const NOT_REGISTER: string = "NO REGISTRA";

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

  const [isCheckboxMessagesChecked, setIsCheckboxMessagesChecked] =
    useState(false);
  const [showCustomCancelModal, setShowCustomCancelModal] = useState(false);
  const [showCustomConfirmModal, setShowCustomConfirmModal] = useState(false);

  const [allAuthMethodsData, setAllAuthMethodsData]: any[] = useState([]);

  const [countryCode, setCountryCode] = useState(0);
  const [areaCode, setAreaCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
    if (
      status === "authenticated" ||
      (!idTypeAbbrevPatientState && !idNumberPatientState)
    ) {
      notFound();
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
    areaCode,
    phoneNumber,
    passwordUserPatientLocalState,
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

      if (countryCode && areaCode && phoneNumber) {
        const fullWhatsappNumber = `${countryCode}${areaCode}${phoneNumber}`;

        patientData.whatsapp = fullWhatsappNumber;
      }

      const response: any = await createUserPatient(patientData);

      let createUserPatientData = response?.data;

      let errorMessage = response.data?.message;

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

  const handlePhoneInputChange = (value: any) => {
    if (value) {
      setCountryCode(value.countryCode || 0);
      setAreaCode(value.areaCode || "");
      setPhoneNumber(value.phoneNumber || "");
    }
  };

  const combinePhoneDetails = () => {
    return `${areaCode}${phoneNumber}`;
  };

  const validatorWhatsappInput = (_: any, value: any) => {
    const combinedPhone = combinePhoneDetails();

    if (!combinedPhone) {
      return Promise.resolve();
    }

    const phonePattern = /^[0-9]+$/;

    if (
      phonePattern.test(combinedPhone) &&
      combinedPhone.length >= 7 &&
      combinedPhone.length <= 17
    ) {
      return Promise.resolve();
    }

    return Promise.reject("Número de teléfono inválido");
  };

  const handleCheckboxChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxChecked(e.target.checked);
  };

  const handleCheckboxMessageChange: CheckboxProps["onChange"] = (e) => {
    setIsCheckboxMessagesChecked(e.target.checked);
  };

  return (
    <Col
      xs={24}
      lg={24}
      style={{
        width: "100vw",
        maxWidth: "720px",
        minWidth: "231px",
        padding: "0 2px",
      }}
    >
      <Card
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          marginBottom: "72px",
          marginInline: "13px",
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
                ...titleStyleCss,
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
              contrario debe comunicarse a nuestra línea PBX:
              <b>{CONTACT_PBX}</b> para realizar la actualización de sus datos
              personales.
            </p>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Nombre de paciente:
              </Typography.Title>
              <Input
                id="name-patient-auto-input"
                name="name-patient-auto-input"
                className="name-patient-auto-input"
                value={namePatientState || NOT_REGISTER}
                disabled
              />
            </div>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Tipo de documento:
              </Typography.Title>
              <Input
                id="id-type-patient-auto-input"
                name="id-type-patient-auto-input"
                className="id-type-patient-auto-input"
                value={idTypeAbbrevPatientState || NOT_REGISTER}
                disabled
              />
            </div>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Número de documento:
              </Typography.Title>
              <Input
                id="patient-id-number-hosvital"
                name="patient-id-number-hosvital"
                className="patient-id-number-hosvital"
                value={idNumberPatientState || NOT_REGISTER}
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
                name="patient-email-hosvital"
                className="patient-email-hosvital"
                value={emailPatientState || NOT_REGISTER}
                disabled
              />
            </div>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Número de celular:
              </Typography.Title>
              <Input
                id="patient-cellphone-hosvital"
                name="patient-cellphone-hosvital"
                className="patient-cellphone-hosvital"
                value={cellphonePatientState || NOT_REGISTER}
                disabled
              />
            </div>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Género:
              </Typography.Title>
              <Input
                id="patient-gender-hosvital"
                name="patient-gender-hosvital"
                className="patient-gender-hosvital"
                value={genderPatientAbbrevState || NOT_REGISTER}
                disabled
              />
            </div>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Fecha de nacimiento:
              </Typography.Title>
              <Input
                id="patient-birthdate-hosvital"
                name="patient-birthdate-hosvital"
                className="patient-birthdate-hosvital"
                value={birthdatePatientState || NOT_REGISTER}
                disabled
              />
            </div>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Afiliado a EPS:
              </Typography.Title>
              <Input
                id="patient-affiliationeps-hosvital"
                name="patient-affiliationeps-hosvital"
                className="patient-affiliationeps-hosvital"
                value={affiliationEpsPatientState || NOT_REGISTER}
                disabled
              />
            </div>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Dirección de residencia:
              </Typography.Title>
              <Input
                id="patient-residenceaddress-hosvital"
                name="patient-residenceaddress-hosvital"
                className="patient-residenceaddress-hosvital"
                value={residenceAddressPatientState || NOT_REGISTER}
                disabled
              />
            </div>
          </Col>

          <Col xs={24} md={12} lg={12} style={{ padding: "0 13px" }}>
            <h2
              className="title-register-patient"
              style={{
                ...titleStyleCss,
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
                id="radio-select-auth-method"
                name="radio-select-auth-method"
                label="Método de autenticación"
                tooltip="El método seleccionado es solo para envío de códigos de acceso a la plataforma."
                style={{ marginBottom: 22 }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor selecciona un método de autenticación!",
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
                id="patient-user-whatsapp-register"
                name="patient-user-whatsapp-register"
                className="patient-user-whatsapp-register"
                tooltip="El número de WhatsApp no es un medio autorizado para enviar código de acceso a la plataforma, este es para comunicación vía chat de texto en caso de que el número de celular indicado no esté habilitado."
                label="Número de WhatsApp (opcional)"
                style={{ marginBottom: 13 }}
                normalize={(value) => {
                  if (!value || typeof value !== "string") return "";

                  return value.replace(/[^\d+]/g, "");
                }}
                rules={[
                  {
                    required: false,
                    message:
                      "¡Por favor ingresa el número de WhatsApp del paciente!",
                  },
                  {
                    validator: validatorWhatsappInput,
                  },
                ]}
              >
                <PhoneInput
                  prefix={<WhatsAppOutlined className="site-form-item-icon" />}
                  type="tel"
                  value={{ countryCode, areaCode, phoneNumber }}
                  placeholder="Número de WhatsApp"
                  onChange={handlePhoneInputChange}
                  autoComplete="off"
                  min={0}
                  enableSearch
                />
              </Form.Item>

              <Form.Item
                id="patient-user-password-register"
                name="patient-user-password-register"
                className="patient-user-password-register"
                label="Contraseña"
                style={{ marginBottom: 22 }}
                rules={[
                  {
                    required: true,
                    message: "¡Por favor ingresa tu contraseña!",
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
                    validator: (_, value) => {
                      if (
                        !passwordUserPatientLocalState ||
                        (!areaCode && !phoneNumber)
                      ) {
                        return Promise.resolve();
                      }

                      const passwordUpperCase = value?.toUpperCase();

                      const nameWords = namePatientState
                        ?.toUpperCase()
                        .split(" ");

                      const idNumber = String(idNumberPatientState);

                      const cellphoneNumber = String(cellphonePatientState);

                      const whatsAppNumber = areaCode && phoneNumber;

                      const birthdate = birthdatePatientState
                        ?.replace(/\s+/g, "")
                        .split("-");

                      if (
                        nameWords?.some((word) =>
                          passwordUpperCase?.includes(word)
                        )
                      ) {
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

                      if (passwordUpperCase?.includes(whatsAppNumber)) {
                        return Promise.reject(
                          new Error(
                            "¡La contraseña no puede contener datos del número de WhatsApp del usuario!"
                          )
                        );
                      }

                      if (
                        birthdate?.some((date) =>
                          passwordUpperCase?.includes(date)
                        )
                      ) {
                        return Promise.reject(
                          new Error(
                            "¡La contraseña no puede contener datos de la fecha de nacimiento del usuario!"
                          )
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
                  value={passwordUserPatientLocalState}
                  placeholder="Contraseña"
                  onChange={(e) =>
                    setPasswordUserPatientLocalState(e.target.value.trim())
                  }
                />
              </Form.Item>

              <Form.Item
                id="patient-user-password-verify-register"
                name="patient-user-password-verify-register"
                className="patient-user-password-verify-register"
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
                        getFieldValue("patient-user-password-register") ===
                          value
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
                id="checkbox-data-autorization"
                name="checkbox-data-autorization"
                className="checkbox-data-autorization"
                valuePropName="checked"
                style={{ textAlign: "center", marginBottom: 13 }}
                rules={[
                  {
                    validator: checkboxProcessingPersonalDataValidator,
                  },
                ]}
              >
                <div style={{ marginBlock: 7 }}>
                  <div style={{ marginBottom: 13 }}>
                    <a
                      className="data-processing-autorization-link"
                      href={
                        process.env
                          .NEXT_PUBLIC_DATA_PROCESSING_AUTORIZATION_LINK
                      }
                      target="_blank"
                      style={{ textDecoration: "underline" }}
                    >
                      Leer Política de Tratamiento de Datos Personales
                    </a>
                  </div>
                  <Checkbox
                    checked={isCheckboxChecked}
                    onChange={handleCheckboxChange}
                  >
                    Declaro haber leído, entendido y aceptado la Política de
                    Tratamiento de Datos Personales
                  </Checkbox>
                </div>
              </Form.Item>

              <Form.Item
                name="checkbox-authorization-send-messages"
                valuePropName="checked"
                style={{ textAlign: "center", marginBottom: 13 }}
                rules={[
                  {
                    validator: checkboxMessagesValidator,
                  },
                ]}
              >
                <div style={{ marginBottom: 13 }}>
                  <Checkbox
                    checked={isCheckboxMessagesChecked}
                    onChange={handleCheckboxMessageChange}
                  >
                    Acepto el uso de medios electrónicos vía email o celular
                    para recibir mensajes informativos
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
    </Col>
  );
};

export default ValidatePatientData;
