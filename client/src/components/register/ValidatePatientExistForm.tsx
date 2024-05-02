"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col, Divider, Form, Input, Select } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import { IdcardOutlined } from "@ant-design/icons";
import CustomSpin from "../common/custom_spin/CustomSpin";
import CustomMessage from "../common/custom_messages/CustomMessage";

import {
  setNameUserPatient,
  setLastNameUserPatient,
  setIdTypeUserPatient,
  setIdTypeAbbrevUserPatient,
  setIdNumberUserPatient,
  setGenderUserPatient,
  setGenderAbbrevUserPatient,
  setBirthdateUserPatient,
  setEmailUserPatient,
  setCellphoneUserPatient,
  setPasswordUserPatient,
  setAuthMethodUserPatient,
  setResidenceAddressUserPatient,
  setAffiliationEpsUserPatient,
  setErrorsUserPatient,
  setDefaultValuesUserPatient,
} from "@/redux/features/patient/patientSlice";

import {
  useValidateThatThePatientExistMutation,
  useValidatePatientRegisterMutation,
} from "@/redux/apis/register/registerUsersApi";
import {
  useTransformIdTypeNameMutation,
  useTransformIdTypeNumberMutation,
  useTransformGenderNameMutation,
  useTransformGenderNumberMutation,
} from "@/redux/apis/users/usersApi";

import { IdTypeAbbrev } from "../../../../api/src/users/enums/id_type_abbrev.enum";

const ValidatePatientExistForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idTypeAbbrevPatientState = useAppSelector(
    (state) => state.patient.id_type_abbrev
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const genderAbbrevPatientState = useAppSelector(
    (state) => state.patient.user_gender_abbrev
  );
  const affiliationEpsPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const errorsPatientState = useAppSelector((state) => state.patient.errors);

  const [idTypeAbbrevLocalState, setIdTypeAbbrevLocalState] = useState("");
  const [idNumberLocalState, setIdNumberLocalState] = useState(0);

  const [idTypePatientLocalState, setIdTypePatientLocalState] = useState("");
  const [genderPatientLocalState, setGenderPatientLocalState] = useState("");

  const [isSubmittingPatient, setIsSubmittingPatient] = useState(false);
  const [isSubmittingGoToUserLogin, setIsSubmittingGoToUserLogin] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
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

  const [
    validatePatientRegister,
    {
      data: isValidatePatientRegisterData,
      isLoading: isValidatePatientRegisterLoading,
      isSuccess: isValidatePatientRegisterSuccess,
      isError: isValidatePatientRegisterError,
    },
  ] = useValidatePatientRegisterMutation({
    fixedCacheKey: "validatePatientRegisterData",
  });

  const [
    transformIdTypeName,
    {
      data: isTransformIdTypeNameData,
      isLoading: isTransformIdTypeNameLoading,
      isSuccess: isTransformIdTypeNameSuccess,
      isError: isTransformIdTypeNameError,
    },
  ] = useTransformIdTypeNameMutation({
    fixedCacheKey: "transformIdTypeNameData",
  });
  const [
    transformIdTypeNumber,
    {
      data: isTransformIdTypeNumberData,
      isLoading: isTransformIdTypeNumberLoading,
      isSuccess: isTransformIdTypeNumberSuccess,
      isError: isTransformIdTypeNumberError,
    },
  ] = useTransformIdTypeNumberMutation({
    fixedCacheKey: "transformIdTypeNumberData",
  });

  const [
    transformGenderName,
    {
      data: isTransformGenderNameData,
      isLoading: isTransformGenderNameLoading,
      isSuccess: isTransformGenderNameSuccess,
      isError: isTransformGenderNameError,
    },
  ] = useTransformGenderNameMutation({
    fixedCacheKey: "transformGenderNameData",
  });
  const [
    transformGenderNumber,
    {
      data: isTransformGenderNumberData,
      isLoading: isTransformGenderNumberLoading,
      isSuccess: isTransformGenderNumberSuccess,
      isError: isTransformGenderNumberError,
    },
  ] = useTransformGenderNumberMutation({
    fixedCacheKey: "transformGenderNumberData",
  });

  useEffect(() => {
    const fetchData = async () => {
      if (
        affiliationEpsPatientState &&
        !idTypeAbbrevLocalState &&
        !idNumberLocalState
      ) {
        dispatch(setDefaultValuesUserPatient());
      }

      if (idTypePatientLocalState) {
        const responseIdTypeName: any = await transformIdTypeName({
          idTypeAbbrev: idTypePatientLocalState,
        });

        var idTypeName = responseIdTypeName?.error?.data;

        dispatch(setIdTypeAbbrevUserPatient(idTypeName));

        const responseIdTypeNumber: any = await transformIdTypeNumber({
          idTypeAbbrev: idTypePatientLocalState,
        });

        var idTypeNumber = responseIdTypeNumber?.data;

        dispatch(setIdTypeUserPatient(idTypeNumber));
      }

      if (genderPatientLocalState) {
        const responseGenderName: any = await transformGenderName({
          genderAbbrev: genderPatientLocalState,
        });

        var genderName = responseGenderName?.error?.data;

        dispatch(setGenderAbbrevUserPatient(genderName));

        const responseGenderNumber: any = await transformGenderNumber({
          genderAbbrev: genderPatientLocalState,
        });

        var genderNumber = responseGenderNumber?.data;

        dispatch(setGenderUserPatient(genderNumber));
      }
    };

    fetchData();
  }, [
    affiliationEpsPatientState,
    idTypeAbbrevLocalState,
    idNumberLocalState,
    idTypePatientLocalState,
    genderPatientLocalState,
  ]);

  const handleValidatePatient = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingPatient(true);

      if (idTypeAbbrevLocalState && idNumberLocalState) {
        const searchPatientUser: any = await validatePatientRegister({
          id_number: idNumberLocalState,
        });

        var validationPatientRegisterData = searchPatientUser?.data;

        if (validationPatientRegisterData?.status === 409) {
          const errorMessage = validationPatientRegisterData?.message;

          dispatch(setErrorsUserPatient(errorMessage));
          setShowErrorMessagePatient(true);
        }
        if (validationPatientRegisterData?.status === 200) {
          const response: any = await validatePatient({
            idType: idTypeAbbrevLocalState,
            idNumber: idNumberLocalState,
          });

          var validationPatientData = response.data?.[0].count;

          if (validationPatientData === 0) {
            const errorMessage =
              "El paciente no se encuentra registrado en la clínica";

            dispatch(setErrorsUserPatient(errorMessage));
            setShowErrorMessagePatient(true);
          }
          if (validationPatientData === 1 && response.data?.[0].data?.[0]) {
            setIdTypePatientLocalState("");
            setGenderPatientLocalState("");

            const patientData = response.data[0].data[0];

            const {
              NOMBRE: name,
              TIPO: idType,
              ID: idNumber,
              SEXO: gender,
              FECHA_NACIMIENTO: birthDate,
              CORREO: email,
              CELULAR: cellPhone,
              EMPRESA: affiliationEps,
              DIRECCION: residenceAddress,
            } = patientData;

            setIdTypePatientLocalState(idType);
            setGenderPatientLocalState(gender);

            dispatch(setNameUserPatient(name));
            dispatch(setIdNumberUserPatient(idNumber));
            dispatch(setBirthdateUserPatient(birthDate));
            dispatch(setEmailUserPatient(email));
            dispatch(setCellphoneUserPatient(cellPhone));
            dispatch(setAffiliationEpsUserPatient(affiliationEps));
            dispatch(setResidenceAddressUserPatient(residenceAddress));

            setShowSuccessMessage(true);

            await router.push("/patient/register/validate_data", {
              scroll: true,
            });
          }
        }
      } else {
        dispatch(setErrorsUserPatient("Datos del paciente no encontrados"));
        setShowErrorMessagePatient(true);
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
      setIdTypeAbbrevLocalState(idTypeAbbrevPatientString);
    }
  };

  const handleGoToUserLogin = async () => {
    setIsSubmittingGoToUserLogin(true);

    await new Promise((resolve) => setTimeout(resolve, 700));

    await router.push("/login", { scroll: true });

    dispatch(setDefaultValuesUserPatient());

    setIsSubmittingGoToUserLogin(true);
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserPatient([]));
    setShowErrorMessagePatient(false);
    setShowSuccessMessage(false);
  };

  return (
    <Card
      style={{
        width: "max-content",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fcfcfc",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        marginBottom: 31,
        marginInline: 31,
      }}
    >
      {showErrorMessagePatient && (
        <CustomMessage
          typeMessage="error"
          message={errorsPatientState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={"¡Paciente encontrado!"}
        />
      )}

      <Col
        xs={24}
        md={24}
        lg={24}
        style={{ padding: "0 7px", width: "100vw", maxWidth: 321 }}
      >
        <Form
          id="patient-user-validate-form"
          name="patient-user-validate-form"
          className="patient-user-validate-form"
          onFinish={handleValidatePatient}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-validate-patient"
            style={{
              ...titleStyleCss,
              marginBottom: 13,
              textAlign: "center",
            }}
          >
            Activación de usuario Paciente
          </h2>

          <Form.Item
            name="patient-user-id-type-validate"
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
              value={idTypeAbbrevLocalState}
              placeholder="Tipo de identificación"
              onChange={handleIdTypeChange}
            >
              {Object.entries(IdTypeAbbrev).map(([key, value]) => (
                <Select.Option key={key} value={value}>
                  {key}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="patient-user-id-number-validate"
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
              value={idNumberLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberLocalState(e.target.valueAsNumber)}
              min={0}
            />
          </Form.Item>

          <Form.Item
            style={{
              textAlign: "center",
            }}
          >
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
                className="patient-validate-form-button"
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

            {isSubmittingGoToUserLogin ? (
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
                className="patient-validate-button"
                onClick={handleGoToUserLogin}
                onMouseDown={handleButtonClick}
              >
                Ingresar con mi cuenta
              </Button>
            )}
          </Form.Item>
        </Form>
      </Col>
    </Card>
  );
};

export default ValidatePatientExistForm;
