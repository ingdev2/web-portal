"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import {
  Button,
  Card,
  Col,
  Row,
  Input,
  Typography,
  Radio,
  Space,
  Form,
} from "antd";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";
import CustomMessage from "../../../../common/custom_messages/CustomMessage";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  MdDriveFileRenameOutline,
  MdOutlineEmail,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { IdcardOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { TbGenderBigender } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";

import {
  setAuthMethodUserPatient,
  setCellphoneUserPatient,
  setEmailUserPatient,
  setErrorsUserPatient,
  setResidenceAddressUserPatient,
  setWhatsappUserPatient,
} from "@/redux/features/patient/patientSlice";
import { setIdUserPatient } from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";
import { useUpdateUserPatientMutation } from "@/redux/apis/users/usersApi";
import { useGetAllAuthMethodsQuery } from "@/redux/apis/auth_method/authMethodApi";
import { FiPhone } from "react-icons/fi";

const UpdatePersonalDataForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const NOT_REGISTER: string = "NO REGISTRA";

  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const nameUserPatientState = useAppSelector((state) => state.patient.name);
  const idTypeNameUserPatientState = useAppSelector(
    (state) => state.patient.id_type_abbrev
  );
  const idNumberUserPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const genderNameUserPatientState = useAppSelector(
    (state) => state.patient.user_gender_abbrev
  );
  const affiliationEpsUserPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const emailUserPatientState = useAppSelector((state) => state.patient.email);
  const cellphoneUserPatientState = useAppSelector(
    (state) => state.patient.cellphone
  );
  const whatsappUserPatientState = useAppSelector(
    (state) => state.patient.whatsapp
  );
  const residendeAddressUserPatientState = useAppSelector(
    (state) => state.patient.residence_address
  );
  const authMethodUserPatientState = useAppSelector(
    (state) => state.patient.authentication_method
  );
  const patientErrorsState = useAppSelector((state) => state.patient.errors);

  const [hasChanges, setHasChanges] = useState(false);

  const [emailUserPatientLocalState, setEmailUserPatientLocalState] =
    useState("");
  const [cellphoneUserPatientLocalState, setCellphoneUserPatientLocalState] =
    useState(0);
  const [whatsappUserPatientLocalState, setWhatsappUserPatientLocalState] =
    useState(0);
  const [
    residendeAddressUserPatientLocalState,
    setResidendeAddressUserPatientLocalState,
  ] = useState("");
  const [authMethodPatientLocalState, setAuthMethodPatientLocalState] =
    useState(0);
  const [
    patientAuthMethodsListLocalState,
    setPatientAuthMethodsListLocalState,
  ]: any = useState([]);

  const [isSubmittingUpdatePersonalData, setIsSubmittingUpdatePersonalData] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessagePatient, setShowErrorMessagePatient] = useState(false);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  const {
    data: authMethodData,
    isLoading: authMethodLoading,
    isFetching: authMethodFetching,
    error: authMethodError,
  } = useGetAllAuthMethodsQuery(null);

  const [
    updatePersonalDataPatient,
    {
      data: createMedicalReqPatientData,
      isLoading: createMedicalReqPatientLoading,
      isSuccess: createMedicalReqPatientSuccess,
      isError: createMedicalReqPatientError,
    },
  ] = useUpdateUserPatientMutation({
    fixedCacheKey: "updatePersonalDataPatient",
  });

  useEffect(() => {
    if (
      !userPatientLoading &&
      !userPatientFetching &&
      userPatientData &&
      !idUserPatientState
    ) {
      dispatch(setIdUserPatient(userPatientData.id));
    }
    if (!authMethodLoading && !authMethodFetching && authMethodData) {
      setPatientAuthMethodsListLocalState(authMethodData);
    }
    if (authMethodError) {
      dispatch(
        setErrorsUserPatient(
          "¡No se pudo obtener los métodos de autenticación!"
        )
      );
      setShowErrorMessagePatient(true);
      setPatientAuthMethodsListLocalState(authMethodData);
    }
  }, [
    userPatientData,
    userPatientLoading,
    userPatientFetching,
    idUserPatientState,
  ]);

  const handleConfirmUpdatePersonalData = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingUpdatePersonalData(true);

      const response: any = await updatePersonalDataPatient({
        id: idUserPatientState,
        updateUser: {
          email: emailUserPatientLocalState || emailUserPatientState,
          cellphone:
            cellphoneUserPatientLocalState || cellphoneUserPatientState,
          whatsapp: whatsappUserPatientLocalState || whatsappUserPatientState,
          authentication_method:
            authMethodPatientLocalState || authMethodUserPatientState,
          residence_address:
            residendeAddressUserPatientLocalState ||
            residendeAddressUserPatientState,
        },
      });

      var updatePersonalDataError = response.error;

      var updatePersonalDataSuccess = response.data;

      if (updatePersonalDataError) {
        const errorMessage = updatePersonalDataError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsUserPatient(errorMessage[0]));
          setShowErrorMessagePatient(true);
        }
        if (typeof errorMessage === "string") {
          dispatch(setErrorsUserPatient(errorMessage));
          setShowErrorMessagePatient(true);
        }
      }

      if (updatePersonalDataSuccess) {
        setHasChanges(false);

        dispatch(
          setEmailUserPatient(
            emailUserPatientLocalState || emailUserPatientState
          )
        );
        dispatch(
          setCellphoneUserPatient(
            cellphoneUserPatientLocalState || cellphoneUserPatientState
          )
        );
        dispatch(
          setWhatsappUserPatient(
            whatsappUserPatientLocalState || whatsappUserPatientState
          )
        );
        dispatch(
          setAuthMethodUserPatient(
            authMethodPatientLocalState || authMethodUserPatientState
          )
        );
        dispatch(
          setResidenceAddressUserPatient(
            residendeAddressUserPatientLocalState ||
              residendeAddressUserPatientState
          )
        );

        setSuccessMessage("¡Datos del paciente actualizados correctamente!");
        setShowSuccessMessage(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingUpdatePersonalData(false);
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);
    dispatch(setErrorsUserPatient([]));
    setShowErrorMessagePatient(false);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        alignContent: "center",
        paddingInline: "31px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-start",
          paddingBlock: "7px",
          paddingInline: "7px",
        }}
      >
        <Button
          style={{
            paddingInline: "7px",
            color: "#015E90",
            fontWeight: "bold",
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
          }}
          type="link"
          size="large"
          className="back-to-homepage-button"
          icon={<IoMdArrowRoundBack size={17} />}
          onClick={() => {
            router.push("/patient/homepage", {
              scroll: true,
            });
          }}
        >
          Ir a inicio
        </Button>
      </div>

      <Card
        key={"card-update-personal-data-patient-form"}
        style={{
          width: "100%",
          maxWidth: "450px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          margin: "0px",
          padding: "0px",
        }}
      >
        {showErrorMessagePatient && (
          <CustomMessage
            typeMessage="error"
            message={patientErrorsState?.toString() || "¡Error en la petición!"}
          />
        )}

        {showSuccessMessage && (
          <CustomMessage
            typeMessage="success"
            message={successMessage || "¡Proceso finalizado con éxito!"}
          />
        )}

        <Col xs={24} sm={24} md={24} lg={24} style={{ padding: "0 7px" }}>
          <h2
            className="title-update-personal-data-patient"
            style={{
              ...titleStyleCss,
              marginBottom: 7,
              textAlign: "center",
            }}
          >
            Actualización de datos
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
            realizar la actualización de sus datos personales que no se puedan
            actualizar por este medio.
          </p>

          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Nombre de paciente:
            </Typography.Title>

            <Input
              id="name-patient-auto-input"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={nameUserPatientState || NOT_REGISTER}
              disabled
            />
          </div>

          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ paddingInlineEnd: "7px" }}
            >
              <div style={{ textAlign: "start" }}>
                <Typography.Title style={{ marginTop: 7 }} level={5}>
                  Tipo de documento:
                </Typography.Title>

                <Input
                  id="id-type-patient-auto-input"
                  prefix={<IdcardOutlined className="site-form-item-icon" />}
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  value={idTypeNameUserPatientState || NOT_REGISTER}
                  disabled
                />
              </div>
            </Col>

            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ paddingInlineStart: "7px" }}
            >
              <div style={{ textAlign: "start" }}>
                <Typography.Title style={{ marginTop: 7 }} level={5}>
                  Número de documento:
                </Typography.Title>

                <Input
                  id="id-number-patient-hosvital"
                  prefix={<IdcardOutlined className="site-form-item-icon" />}
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  value={idNumberUserPatientState || NOT_REGISTER}
                  disabled
                />
              </div>
            </Col>
          </Row>

          <Row>
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ paddingInlineEnd: "7px" }}
            >
              <div style={{ textAlign: "start" }}>
                <Typography.Title style={{ marginTop: 7 }} level={5}>
                  Sexo:
                </Typography.Title>

                <Input
                  id="gender-patient-hosvital"
                  prefix={<TbGenderBigender className="site-form-item-icon" />}
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  value={genderNameUserPatientState || NOT_REGISTER}
                  disabled
                />
              </div>
            </Col>

            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{ paddingInlineStart: "7px" }}
            >
              <div style={{ textAlign: "start" }}>
                <Typography.Title style={{ marginTop: 7 }} level={5}>
                  EPS de afiliación:
                </Typography.Title>
                <Input
                  id="affiliation-eps-patient-hosvital"
                  prefix={
                    <MdOutlineHealthAndSafety className="site-form-item-icon" />
                  }
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  value={affiliationEpsUserPatientState || NOT_REGISTER}
                  disabled
                />
              </div>
            </Col>
          </Row>

          <Form
            id="update-personal-data-form"
            name="update-personal-data-form"
            className="update-personal-data-form"
            onFinish={handleConfirmUpdatePersonalData}
            initialValues={{
              "email-patient-hosvital": emailUserPatientState || NOT_REGISTER,
              "cellphone-patient-hosvital":
                cellphoneUserPatientState || NOT_REGISTER,
              "whatsapp-patient-hosvital":
                whatsappUserPatientState || NOT_REGISTER,
              "radio-select-auth-method-update-personal-data-patient":
                authMethodUserPatientState,
              "residence-address-patient-hosvital":
                residendeAddressUserPatientState || NOT_REGISTER,
            }}
            autoComplete="false"
            layout="vertical"
          >
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Correo electrónico:
              </Typography.Title>

              <Form.Item
                name="email-patient-hosvital"
                style={{ margin: "0px" }}
                normalize={(value) => {
                  if (!value) return "";

                  return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
                }}
                rules={[
                  {
                    required: false,
                    message: "¡Por favor ingresa un correo electrónico!",
                  },
                  {
                    type: "email",
                    message: "¡Por favor ingresa un correo electrónico valido!",
                  },
                  {
                    min: 10,
                    message: "¡Por favor ingresa mínimo 10 caracteres!",
                  },
                  {
                    max: 45,
                    message: "¡Por favor ingresa máximo 45 caracteres!",
                  },
                ]}
              >
                <Input
                  prefix={<MdOutlineEmail className="site-form-item-icon" />}
                  type="email"
                  value={emailUserPatientState || NOT_REGISTER}
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  onChange={(e) => {
                    setHasChanges(true);

                    setEmailUserPatientLocalState(e.target.value.toLowerCase());
                  }}
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <Row>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{ paddingInlineEnd: "7px" }}
              >
                <div style={{ textAlign: "start" }}>
                  <Typography.Title style={{ marginTop: 7 }} level={5}>
                    Celular:
                  </Typography.Title>

                  <Form.Item
                    name="cellphone-patient-hosvital"
                    style={{ margin: "0px" }}
                    normalize={(value) => {
                      if (!value) return "";

                      return value.replace(/[^0-9]/g, "");
                    }}
                    rules={[
                      {
                        required: false,
                        message: "¡Por favor ingresa el número de celular!",
                      },
                      {
                        pattern: /^[0-9]+$/,
                        message:
                          "¡Por favor ingresa número de celular sin puntos ni comas!",
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
                      prefix={<FiPhone className="site-form-item-icon" />}
                      type="tel"
                      value={cellphoneUserPatientState || NOT_REGISTER}
                      onChange={(e) => {
                        setHasChanges(true);

                        setCellphoneUserPatientLocalState(
                          parseInt(e.target.value, 10)
                        );
                      }}
                      autoComplete="off"
                      min={0}
                    />
                  </Form.Item>
                </div>
              </Col>

              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                style={{ paddingInlineStart: "7px" }}
              >
                <div style={{ textAlign: "start" }}>
                  <Typography.Title style={{ marginTop: 7 }} level={5}>
                    Whatsapp:
                  </Typography.Title>

                  <Form.Item
                    name="whatsapp-patient-hosvital"
                    style={{ margin: "0px" }}
                    normalize={(value) => {
                      if (!value) return "";

                      return value.replace(/[^0-9]/g, "");
                    }}
                    rules={[
                      {
                        required: false,
                        message: "¡Por favor ingresa el número de Whatsapp!",
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
                      prefix={
                        <WhatsAppOutlined className="site-form-item-icon" />
                      }
                      type="tel"
                      value={whatsappUserPatientState || NOT_REGISTER}
                      onChange={(e) => {
                        setHasChanges(true);

                        setWhatsappUserPatientLocalState(
                          parseInt(e.target.value, 10)
                        );
                      }}
                      autoComplete="off"
                      min={0}
                    />
                  </Form.Item>
                </div>
              </Col>
            </Row>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Método de autenticación:
              </Typography.Title>

              <Form.Item
                name="radio-select-auth-method-update-personal-data-patient"
                style={{ margin: "0px" }}
                rules={[
                  {
                    required: false,
                    message:
                      "¡Por favor selecciona un método de autenticación!",
                  },
                ]}
              >
                <Radio.Group
                  value={authMethodUserPatientState}
                  onChange={(e) => {
                    setHasChanges(true);

                    setAuthMethodPatientLocalState(e.target.value);
                  }}
                  style={{ textAlign: "start" }}
                >
                  <Space size={"small"} direction="horizontal">
                    {patientAuthMethodsListLocalState?.map((option: any) => (
                      <Radio key={option.id} value={option.id}>
                        {option.name}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </Form.Item>
            </div>

            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Dirección de residencia:
              </Typography.Title>

              <Form.Item
                name="residence-address-patient-hosvital"
                style={{ marginBottom: "13px" }}
                normalize={(value) => {
                  if (!value) return "";

                  const filteredValue = value
                    .toUpperCase()
                    .replace(/[^A-ZÑ0-9\s.,#_/-]/g, "");
                  return filteredValue;
                }}
                rules={[
                  {
                    required: false,
                    message: "¡Por favor ingrese su dirección de residencia!",
                  },
                  {
                    min: 10,
                    message: "La dirección debe tener al menos 10 caracteres",
                  },
                  {
                    max: 54,
                    message: "La dirección no puede tener más de 54 caracteres",
                  },
                  {
                    pattern: /^[A-ZÑ0-9\s.,#_/-]*$/i,
                    message:
                      "La dirección solo puede contener letras, números y los siguientes caracteres especiales: . , # -",
                  },
                ]}
              >
                <Input
                  prefix={<IoHomeOutline className="site-form-item-icon" />}
                  type="text"
                  value={residendeAddressUserPatientState || NOT_REGISTER}
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                  onChange={(e) => {
                    setHasChanges(true);

                    setResidendeAddressUserPatientLocalState(
                      e.target.value.toUpperCase()
                    );
                  }}
                  autoComplete="off"
                />
              </Form.Item>
            </div>

            <Form.Item
              style={{
                textAlign: "center",
                marginBlock: "0px",
                paddingBlock: "13px",
              }}
            >
              {isSubmittingUpdatePersonalData ? (
                <CustomSpin />
              ) : (
                <Button
                  size="large"
                  style={{
                    backgroundColor: !hasChanges ? "#D8D8D8" : "#015E90",
                    color: !hasChanges ? "#A0A0A0" : "#f2f2f2",
                    fontWeight: "bold",
                    paddingInline: 54,
                    borderRadius: 31,
                  }}
                  htmlType="submit"
                  className="update-personal-data-patient-form-button"
                  onClick={handleButtonClick}
                  disabled={!hasChanges}
                >
                  Actualizar datos personales
                </Button>
              )}
            </Form.Item>
          </Form>
        </Col>
      </Card>
    </Col>
  );
};

export default UpdatePersonalDataForm;
