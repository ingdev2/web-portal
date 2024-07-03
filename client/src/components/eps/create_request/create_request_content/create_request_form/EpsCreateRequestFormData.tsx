"use client";

import React, { ReactNode } from "react";

import { Button, Form, Input, Select, Typography } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomUpload from "@/components/common/custom_upload/CustomUpload";
import TextArea from "antd/es/input/TextArea";
import { titleStyleCss } from "@/theme/text_styles";

const EpsCreateRequestFormData: React.FC<{
  patientNameDataForm: string;
  patientIdTypeDataForm: string;
  iconButtonValidatorOtherPatientDataForm: ReactNode;
  onClickButtonValidatorOtherPatientDataForm: () => void;
  patientIdNumberDataForm: number;
  handleCreateRequestDataForm: () => void;
  reqTypeSelectorLoadingDataForm: boolean;
  familiarReqTypeValueDataForm: number;
  handleOnChangeSelectReqTypeDataForm: (value: number) => void;
  familiarReqTypeListDataForm: string[];
  userMessageMedicalReqDataForm: string;
  handleOnChangeUserMessageMedicalReqDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
  fileStatusSetterDataform: React.SetStateAction<any>;
  fileStatusRemoverDataform: React.SetStateAction<any>;
}> = ({
  patientNameDataForm,
  patientIdTypeDataForm,
  patientIdNumberDataForm,
  iconButtonValidatorOtherPatientDataForm,
  onClickButtonValidatorOtherPatientDataForm,
  handleCreateRequestDataForm,
  reqTypeSelectorLoadingDataForm,
  familiarReqTypeValueDataForm,
  handleOnChangeSelectReqTypeDataForm,
  familiarReqTypeListDataForm,
  userMessageMedicalReqDataForm,
  handleOnChangeUserMessageMedicalReqDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
  fileStatusSetterDataform,
  fileStatusRemoverDataform,
}) => {
  return (
    <Form
      id="create-medical-req-form-eps"
      name="create-medical-req-form-eps"
      className="create-medical-req-form-eps"
      onFinish={handleCreateRequestDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
    >
      <h2
        className="title-create-medical-req-form-eps"
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
          id="name-patient-auto-input-eps"
          value={patientNameDataForm}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Tipo de documento:
        </Typography.Title>
        <Input
          id="id-type-patient-auto-input-eps"
          value={patientIdTypeDataForm}
          disabled
        />
      </div>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Número de documento:
        </Typography.Title>
        <Input
          id="patient-id-number-hosvital-eps"
          value={patientIdNumberDataForm}
          disabled
        />
      </div>

      <div
        style={{
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          paddingBlock: "13px",
        }}
      >
        <Button
          style={{
            paddingInline: 13,
            color: "#015E90",
            borderColor: "#015E90",
            fontWeight: "bold",
            borderRadius: 7,
            borderWidth: 2,
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            alignItems: "center",
          }}
          type="text"
          size="middle"
          className="back-to-validate-patient"
          icon={iconButtonValidatorOtherPatientDataForm}
          onClick={onClickButtonValidatorOtherPatientDataForm}
        >
          Cambiar paciente
        </Button>
      </div>

      <Form.Item
        name="medical-req-types-eps"
        label="Tipo de requerimiento médico"
        style={{ marginBottom: "13px" }}
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
        name="upload-files-reference-documents-eps"
        label="Documento(s) de referencia (opcional)"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: false,
            message: "¡Por favor adjunta mínimo un documento!",
          },
        ]}
      >
        <CustomUpload
          titleCustomUpload="Cargar Documento(s)"
          fileStatusSetterCustomUpload={fileStatusSetterDataform}
          removeFileStatusSetterCustomUpload={fileStatusRemoverDataform}
        />
      </Form.Item>

      <Form.Item
        name="especifications-eps"
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
            className="create-medical-req-form-button-eps"
            onClick={handleButtonSubmitFormDataForm}
          >
            Crear solicitud
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default EpsCreateRequestFormData;
