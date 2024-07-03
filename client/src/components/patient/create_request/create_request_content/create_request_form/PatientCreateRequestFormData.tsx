"use client";

import React from "react";

import { Button, Form, Select } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomUpload from "@/components/common/custom_upload/CustomUpload";
import TextArea from "antd/es/input/TextArea";
import { titleStyleCss } from "@/theme/text_styles";

const PatientCreateRequestFormData: React.FC<{
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
      id="create-medical-req-form-patient"
      name="create-medical-req-form-patient"
      className="create-medical-req-form-patient"
      onFinish={handleCreateRequestDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
    >
      <h2
        className="title-create-medical-req-form-patient"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear nueva solicitud de requerimiento médico
      </h2>

      <Form.Item
        name="medical-req-types-patient"
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
        name="upload-files-reference-documents-patient"
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
        name="especifications-patient"
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
            className="create-medical-req-form-button-patient"
            onClick={handleButtonSubmitFormDataForm}
          >
            Crear solicitud
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default PatientCreateRequestFormData;
