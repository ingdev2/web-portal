"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Card, Col, Form, Input, Select } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import CustomLoadingOverlay from "@/components/common/custom_loading_overlay/CustomLoadingOverlay";
import { IdcardOutlined } from "@ant-design/icons";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

import {
  setNameUserPatient,
  setIdTypeUserPatient,
  setIdTypeAbbrevUserPatient,
  setIdNumberUserPatient,
  setErrorsUserPatient,
  setDefaultValuesUserPatient,
} from "@/redux/features/patient/patientSlice";
import { setComponentChange } from "@/redux/features/common/modal/modalSlice";

import {
  useValidateThatThePatientExistMutation,
  useValidatePatientRegisterMutation,
} from "@/redux/apis/register/registerUsersApi";
import {
  useTransformIdTypeNameMutation,
  useTransformIdTypeNumberMutation,
} from "@/redux/apis/users/usersApi";

import { IdTypeAbbrev } from "../../../utils/enums/id_type_abbrev.enum";

const ValidatePatientExistEps: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const namePatientState = useAppSelector((state) => state.patient.name);
  const idTypePatientState = useAppSelector(
    (state) => state.patient.user_id_type
  );
  const idNumberPatientState = useAppSelector(
    (state) => state.patient.id_number
  );
  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );
  const errorsPatientState = useAppSelector((state) => state.patient.errors);

  const [idTypeAbbrevPatientLocalState, setIdTypeAbbrevPatientLocalState] =
    useState("");
  const [idNumberPatientLocalState, setIdNumberPatientLocalState] =
    useState("");

  const [isSubmittingPatient, setIsSubmittingPatient] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      if (
        !idTypeAbbrevPatientLocalState &&
        !idNumberPatientLocalState &&
        idTypePatientState &&
        namePatientState
      ) {
        dispatch(setDefaultValuesUserPatient());
      }

      if (idTypeAbbrevPatientLocalState) {
        const responseIdTypeName: any = await transformIdTypeName({
          idTypeAbbrev: idTypeAbbrevPatientLocalState,
        });

        let idTypeName = responseIdTypeName?.error?.data;

        dispatch(setIdTypeAbbrevUserPatient(idTypeName));

        const responseIdTypeNumber: any = await transformIdTypeNumber({
          idTypeAbbrev: idTypeAbbrevPatientLocalState,
        });

        let idTypeNumber = responseIdTypeNumber?.data;

        dispatch(setIdTypeUserPatient(idTypeNumber));
      }
    };

    fetchData();
  }, [
    idTypeAbbrevPatientLocalState,
    idNumberPatientLocalState,
    idTypePatientState,
    namePatientState,
  ]);

  const handleValidatePatient = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setIsSubmittingPatient(true);

      const idNumberLocalStateNumber = idNumberPatientLocalState
        ? parseInt(idNumberPatientLocalState?.toString(), 10)
        : 0;

      if (
        idTypeAbbrevPatientLocalState &&
        idTypePatientState &&
        idNumberLocalStateNumber
      ) {
        const response: any = await validatePatient({
          idType: idTypeAbbrevPatientLocalState,
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
          const patientNameHosvital = response.data?.[0].data?.[0]?.NOMBRE;

          setShowSuccessMessage(true);

          setTimeout(() => {
            dispatch(setNameUserPatient(patientNameHosvital));
            dispatch(setIdNumberUserPatient(idNumberLocalStateNumber));

            setIdTypeAbbrevPatientLocalState("");
            setIdNumberPatientLocalState("");

            dispatch(setComponentChange(true));
          }, 400);
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

      setIdTypeAbbrevPatientLocalState(idTypeAbbrevPatientString);
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
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100vw",
        maxWidth: "450px",
        minWidth: "231px",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        padding: "0px",
        margin: "0px",
      }}
    >
      <Card
        style={{
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          padding: "0px",
          marginInline: "13px",
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
          id="patient-user-validate-form-eps"
          name="patient-user-validate-form-eps"
          className="patient-user-validate-form-eps"
          onFinish={handleValidatePatient}
          initialValues={{ remember: false }}
          autoComplete="false"
          layout="vertical"
        >
          <h2
            className="title-validate-patient-eps"
            style={{
              ...titleStyleCss,
              marginBlock: 22,
              textAlign: "center",
            }}
          >
            Validación existencia Paciente
          </h2>

          <Form.Item
            name="patient-user-id-type-validate"
            label="Tipo de identificación de paciente"
            style={{ marginBottom: 7 }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa tipo de identificación de paciente!",
              },
            ]}
          >
            <Select
              value={idTypeAbbrevPatientLocalState}
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
            label="Número de identificación de paciente"
            style={{ marginBottom: 7 }}
            normalize={(value) => {
              if (!value) return "";

              return value.replace(/[^0-9]/g, "");
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa número de identificación de paciente!",
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
              value={idNumberPatientLocalState}
              placeholder="Número de identificación"
              onChange={(e) => setIdNumberPatientLocalState(e.target.value)}
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
                  marginBlock: 7,
                }}
                htmlType="submit"
                className="eps-validate-form-button"
                onClick={handleButtonClick}
              >
                Validar Paciente
              </Button>
            )}
          </Form.Item>
        </Form>
      </Card>
    </Col>
  );
};

export default ValidatePatientExistEps;
