"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col, Divider, Form, Input, Select } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import CustomLoadingOverlay from "../../common/custom_loading_overlay/CustomLoadingOverlay";
import { IdcardOutlined } from "@ant-design/icons";
import CustomSpin from "../../common/custom_spin/CustomSpin";
import CustomMessage from "../../common/custom_messages/CustomMessage";

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
import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

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

import { IdTypeAbbrev } from "../../../../../apps/api/src/users/enums/id_type_abbrev.enum";
import CustomPopover from "@/components/common/custom_popover/CustomPopover";

const ValidatePatientExistForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idTypeAbbrevPatientState = useAppSelector(
    (state) => state.patient.id_type_abbrev
  );
  const idTypePatientState = useAppSelector(
    (state) => state.patient.user_id_type
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const genderPatientState = useAppSelector(
    (state) => state.patient.user_gender
  );
  const genderAbbrevPatientState = useAppSelector(
    (state) => state.patient.user_gender_abbrev
  );
  const affiliationEpsPatientState = useAppSelector(
    (state) => state.patient.affiliation_eps
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );
  const errorsPatientState = useAppSelector((state) => state.patient.errors);

  const [idTypeAbbrevLocalState, setIdTypeAbbrevLocalState] = useState("");
  const [idNumberLocalState, setIdNumberLocalState] = useState("");

  const [genderAbbrevPatientLocalState, setGenderAbbrevPatientLocalState] =
    useState("");

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

      if (idTypeAbbrevLocalState) {
        const responseIdTypeName: any = await transformIdTypeName({
          idTypeAbbrev: idTypeAbbrevLocalState,
        });

        let idTypeName = responseIdTypeName?.error?.data;

        dispatch(setIdTypeAbbrevUserPatient(idTypeName));

        const responseIdTypeNumber: any = await transformIdTypeNumber({
          idTypeAbbrev: idTypeAbbrevLocalState,
        });

        let idTypeNumber = responseIdTypeNumber?.data;

        dispatch(setIdTypeUserPatient(idTypeNumber));
      }

      if (genderAbbrevPatientLocalState) {
        const responseGenderName: any = await transformGenderName({
          genderAbbrev: genderAbbrevPatientLocalState,
        });

        let genderName = responseGenderName?.error?.data;

        dispatch(setGenderAbbrevUserPatient(genderName));

        const responseGenderNumber: any = await transformGenderNumber({
          genderAbbrev: genderAbbrevPatientLocalState,
        });

        let genderNumber = responseGenderNumber?.data;

        dispatch(setGenderUserPatient(genderNumber));
      }
    };

    fetchData();
  }, [
    idTypePatientState,
    idNumberLocalState,
    idTypeAbbrevLocalState,
    genderAbbrevPatientLocalState,
    affiliationEpsPatientState,
  ]);

  const handleValidatePatient = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingPatient(true);

      const idNumberLocalStateNumber = idNumberLocalState
        ? parseInt(idNumberLocalState?.toString(), 10)
        : 0;

      if (
        idTypeAbbrevLocalState &&
        idTypePatientState &&
        idNumberLocalStateNumber
      ) {
        const searchPatientUser: any = await validatePatientRegister({
          id_type: idTypePatientState,
          id_number: idNumberLocalStateNumber,
        });

        let validationPatientRegisterData = searchPatientUser?.data;

        if (validationPatientRegisterData?.status === 409) {
          const errorMessage = validationPatientRegisterData?.message;

          dispatch(setErrorsUserPatient(errorMessage));
          setShowErrorMessagePatient(true);
        }
        if (validationPatientRegisterData?.status === 200) {
          const response: any = await validatePatient({
            idType: idTypeAbbrevLocalState,
            idNumber: idNumberLocalStateNumber,
          });

          let validationPatientData = response.data?.[0].status;

          let validationPatientError = response.error?.status;

          if (validationPatientData === 404 || validationPatientError === 404) {
            const errorMessage =
              "El paciente no se encuentra registrado en la clínica";

            dispatch(setErrorsUserPatient(errorMessage));
            setShowErrorMessagePatient(true);
          }
          if (validationPatientData === 200 && response.data?.[0].data?.[0]) {
            setIdTypeAbbrevLocalState("");
            setGenderAbbrevPatientLocalState("");

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

            setIdTypeAbbrevLocalState(idType);
            setGenderAbbrevPatientLocalState(gender);

            dispatch(setNameUserPatient(name));
            dispatch(setIdNumberUserPatient(idNumber));
            dispatch(setBirthdateUserPatient(birthDate));
            dispatch(setEmailUserPatient(email));
            dispatch(setCellphoneUserPatient(cellPhone));
            dispatch(setAffiliationEpsUserPatient(affiliationEps));
            dispatch(setResidenceAddressUserPatient(residenceAddress));

            dispatch(setIsPageLoading(true));
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
      let idTypeAbbrevPatientString: string = value as IdTypeAbbrev;
      setIdTypeAbbrevLocalState(idTypeAbbrevPatientString);
    }
  };

  const handleGoToUserLogin = async () => {
    try {
      setIsSubmittingGoToUserLogin(true);

      await router.push("/login", { scroll: true });

      dispatch(setDefaultValuesUserPatient());
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToUserLogin(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsUserPatient([]));
    setShowErrorMessagePatient(false);
    setShowSuccessMessage(false);
  };

  return (
    <Col
      xs={24}
      lg={24}
      style={{
        width: "100vw",
        padding: "0 2px",
        maxWidth: "450px",
        minWidth: "231px",
      }}
    >
      <Card
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          marginBottom: "31px",
          marginInline: "22px",
        }}
      >
        <CustomLoadingOverlay isLoading={isPageLoadingState} />

        {showErrorMessagePatient && (
          <CustomMessage
            typeMessage="error"
            message={errorsPatientState?.toString() || "¡Error en la petición!"}
          />
        )}

        {showSuccessMessage && (
          <CustomMessage
            typeMessage="success"
            message={"¡Paciente encontrado! Espere..."}
          />
        )}

        <Form
          id="patient-user-validate-form-patient"
          name="patient-user-validate-form-patient"
          className="patient-user-validate-form-patient"
          onFinish={handleValidatePatient}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-validate-patient-patient"
            style={{
              ...titleStyleCss,
              marginBottom: 13,
              textAlign: "center",
            }}
          >
            Validación pre registro Paciente
            <CustomPopover
              titleCustomPopover={"¿Qué validamos aquí?"}
              contentCustomPopover={
                "Aquí debemos validar antes de registrarte que no tienes cuenta activa en nuestro portal y que te encuentres registrado como paciente de la Clínica Bonnadona Prevenir."
              }
            />
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
            normalize={(value) => {
              if (!value) return "";

              return value.replace(/[^0-9]/g, "");
            }}
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
              type="tel"
              value={idNumberLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberLocalState(e.target.value)}
              autoComplete="off"
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
                  marginTop: 13,
                }}
                htmlType="submit"
                className="patient-validate-form-button"
                onClick={handleButtonClick}
              >
                Validar Paciente
              </Button>
            )}
          </Form.Item>
        </Form>

        <Divider
          style={{
            fontSize: 13,
            fontWeight: "normal",
            borderWidth: 1.3,
            marginBlock: 7,
          }}
        >
          ¿Ya tienes cuenta?
        </Divider>

        {isSubmittingGoToUserLogin ? (
          <CustomSpin />
        ) : (
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "center",
            }}
          >
            <Button
              style={{
                paddingInline: 22,
                color: "#015E90",
                borderColor: "#015E90",
                fontWeight: "bold",
                borderRadius: 7,
                borderWidth: 1.3,
                marginBlock: 13,
              }}
              htmlType="button"
              className="go-to-login-button"
              onClick={handleGoToUserLogin}
              onMouseDown={handleButtonClick}
            >
              Ingresar con mi cuenta
            </Button>
          </div>
        )}
      </Card>
    </Col>
  );
};

export default ValidatePatientExistForm;
