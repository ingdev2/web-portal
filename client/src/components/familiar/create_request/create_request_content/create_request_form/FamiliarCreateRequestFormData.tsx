"use client";

import React, { ReactNode } from "react";
import { useAppSelector } from "@/redux/hooks";

import { Button, Col, Form, Input, Row, Select, Typography } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomUpload from "@/components/common/custom_upload/CustomUpload";
import TextArea from "antd/es/input/TextArea";
import { titleStyleCss } from "@/theme/text_styles";

import { PatientClassificationStatus } from "@/../../api/src/medical_req/enums/patient_classification_status.enum";

const FamiliarCreateRequestFormData: React.FC<{
  patientNameDataForm: string;
  patientIdTypeDataForm: string;
  patientIdNumberDataForm: number;
  handleCreateRequestDataForm: () => void;
  reqTypeSelectorLoadingDataForm: boolean;
  familiarReqTypeValueDataForm: number;
  handleOnChangeSelectReqTypeDataForm: (value: number) => void;
  familiarReqTypeListDataForm: string[];
  patientCategoryDataForm: string;
  userMessageMedicalReqDataForm: string;
  handleOnChangeUserMessageMedicalReqDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
  copyAplicantIdentificationDocumentSetterDataform: React.SetStateAction<any>;
  copyAplicantIdentificationDocumentRemoverDataform: React.SetStateAction<any>;
  copyPatientCitizenshipCardSetterDataform: React.SetStateAction<any>;
  copyPatientCitizenshipCardRemoverDataform: React.SetStateAction<any>;
}> = ({
  patientNameDataForm,
  patientIdTypeDataForm,
  patientIdNumberDataForm,
  handleCreateRequestDataForm,
  reqTypeSelectorLoadingDataForm,
  familiarReqTypeValueDataForm,
  handleOnChangeSelectReqTypeDataForm,
  familiarReqTypeListDataForm,
  patientCategoryDataForm,
  userMessageMedicalReqDataForm,
  handleOnChangeUserMessageMedicalReqDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
  copyAplicantIdentificationDocumentSetterDataform,
  copyAplicantIdentificationDocumentRemoverDataform,
  copyPatientCitizenshipCardSetterDataform,
  copyPatientCitizenshipCardRemoverDataform,
}) => {
  const patientCategoryNameState = useAppSelector(
    (state) => state.medicalReq.patient_class_status_abbrev
  );

  return (
    <>
      <h2
        className="title-create-medical-req-form-familiar"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "13px",
        }}
      >
        Crear nueva solicitud de requerimiento médico
      </h2>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Nombre de paciente:
        </Typography.Title>
        <Input
          id="name-patient-auto-input-familiar"
          value={patientNameDataForm}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Tipo de documento:
        </Typography.Title>
        <Input
          id="id-type-patient-auto-input-familiar"
          value={patientIdTypeDataForm}
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
              Número de documento:
            </Typography.Title>
            <Input
              id="patient-id-number-hosvital-familiar"
              value={patientIdNumberDataForm}
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
              Categoria del paciente:
            </Typography.Title>
            <Input
              id="patient-category-familiar"
              value={patientCategoryDataForm}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Form
        id="create-medical-req-form-familiar"
        name="create-medical-req-form-familiar"
        className="create-medical-req-form-familiar"
        onFinish={handleCreateRequestDataForm}
        initialValues={{ remember: false }}
        autoComplete="false"
        layout="vertical"
      >
        <Form.Item
          name="medical-req-types-familiar"
          label="Tipo de requerimiento médico"
          style={{ marginBlock: "13px" }}
          rules={[
            {
              required: true,
              message:
                "¡Por favor selecciona el tipo de requerimiento a solicitar!",
            },
          ]}
        >
          {reqTypeSelectorLoadingDataForm ? (
            <CustomSpin />
          ) : (
            <Select
              value={familiarReqTypeValueDataForm}
              placeholder="Tipo de requerimiento"
              onChange={handleOnChangeSelectReqTypeDataForm}
            >
              {familiarReqTypeListDataForm?.map((option: any) => (
                <Select.Option key={option.id} value={option.id}>
                  {option.name}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>

        <Form.Item
          name="upload-aplicant-identification-document-familiar"
          label="Documento de identidad familiar (Solicitante)"
          style={{ marginBottom: "13px" }}
          rules={[
            {
              required: true,
              message: "¡Por favor adjunta copia de tu documento de identidad!",
            },
          ]}
        >
          <CustomUpload
            titleCustomUpload="Cargar Documento(s)"
            fileStatusSetterCustomUpload={
              copyAplicantIdentificationDocumentSetterDataform
            }
            removeFileStatusSetterCustomUpload={
              copyAplicantIdentificationDocumentRemoverDataform
            }
          />
        </Form.Item>

        {patientCategoryNameState === PatientClassificationStatus.ADULT && (
          <Form.Item
            name="upload-patient-citizenship-card"
            label="Cédula de ciudadania del paciente"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor adjunta copia de cédula de ciudadania del paciente!",
              },
            ]}
          >
            <CustomUpload
              titleCustomUpload="Cargar Documento(s)"
              fileStatusSetterCustomUpload={
                copyPatientCitizenshipCardSetterDataform
              }
              removeFileStatusSetterCustomUpload={
                copyPatientCitizenshipCardRemoverDataform
              }
            />
          </Form.Item>
        )}

        <Form.Item
          name="especifications-familiar"
          label="Observaciones y/o detalles"
          style={{ marginBottom: "31px" }}
          rules={[
            {
              required: true,
              message:
                "¡Por favor, especifique detalles a tener en cuenta de su solicitud!",
            },
          ]}
        >
          <TextArea
            autoSize={{ minRows: 2, maxRows: 10 }}
            maxLength={301}
            value={userMessageMedicalReqDataForm}
            placeholder="Especifique detalles a tener en cuenta de su solicitud. Ej. Fecha aprox. de procedimiento"
            onChange={handleOnChangeUserMessageMedicalReqDataForm}
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center", marginBottom: "7px" }}>
          {buttonSubmitFormLoadingDataForm ? (
            <CustomSpin />
          ) : (
            <Button
              size="large"
              style={{
                paddingInline: 62,
                borderRadius: 31,
                backgroundColor: "#015E90",
                color: "#f2f2f2",
              }}
              htmlType="submit"
              className="create-medical-req-form-button-familiar"
              onClick={handleButtonSubmitFormDataForm}
            >
              Crear solicitud
            </Button>
          )}
        </Form.Item>
      </Form>
    </>
  );
};

export default FamiliarCreateRequestFormData;
