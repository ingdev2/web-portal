"use client";

import React from "react";

import { AutoComplete, Button, Col, Form, Input, Row } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";
import { FaRegCommentDots } from "react-icons/fa";
import TextArea from "antd/es/input/TextArea";

const ReasonForRejectionRegistrationFormData: React.FC<{
  handleCreateUserEpsCompanyDataForm: () => void;
  reasonForRejectionNameDataForm: string;
  handleOnChangeReasonForRejectionNameDataForm: (e: any) => void;
  handleSearchNameReasonForRejectionDataForm: (e: any) => void;
  optionsReasonForRejectionNameDataForm: any[];
  reasonForRejectionMessageDataForm: string;
  handleOnChangeReasonForRejectionMessageDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
}> = ({
  handleCreateUserEpsCompanyDataForm,
  reasonForRejectionNameDataForm,
  handleOnChangeReasonForRejectionNameDataForm,
  handleSearchNameReasonForRejectionDataForm,
  optionsReasonForRejectionNameDataForm,
  reasonForRejectionMessageDataForm,
  handleOnChangeReasonForRejectionMessageDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
}) => {
  return (
    <Form
      id="create-reason-for-rejection-form"
      name="create-reason-for-rejection-form"
      className="create-reason-for-rejection-form"
      onFinish={handleCreateUserEpsCompanyDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "72%",
        paddingBlock: "13px",
        paddingInline: "22px",
      }}
    >
      <h2
        className="title-create-reason-for-rejection-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear motivo de rechazo de solicitud
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="new-reason-for-rejection-name"
            label="Nombre de motivo de rechazo:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              const filteredValue = value
                .toUpperCase()
                .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

              return filteredValue;
            }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el nombre del motivo de rechazo!",
              },
              {
                min: 10,
                message: "El nombre debe tener al menos 10 caracteres",
              },
              {
                max: 50,
                message: "El nombre no puede tener más de 50 caracteres",
              },
              {
                pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas con tildes y espacios",
              },
            ]}
          >
            <AutoComplete
              id="name-reason-for-rejection"
              options={optionsReasonForRejectionNameDataForm}
              style={{ width: "100%" }}
              onSearch={handleSearchNameReasonForRejectionDataForm}
              placeholder="Nombre de motivo de rechazo"
              value={reasonForRejectionNameDataForm}
              onChange={handleOnChangeReasonForRejectionNameDataForm}
              filterOption={false}
            >
              <Input type="text" autoComplete="off" />
            </AutoComplete>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="new-reason-for-rejection-message"
            label="Mensaje a mostrar de motivo de rechazo de solicitud:"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingresa el mensaje del motivo de rechazo!",
              },
              {
                min: 20,
                message: "El mensaje debe tener al menos 20 caracteres",
              },
              {
                max: 200,
                message: "El mensaje no puede tener más de 200 caracteres",
              },
            ]}
          >
            <TextArea
              id="message-reason-for-rejection"
              value={reasonForRejectionMessageDataForm}
              placeholder="Mensaje de motivo de rechazo"
              onChange={handleOnChangeReasonForRejectionMessageDataForm}
              autoComplete="off"
              autoSize={{ minRows: 2, maxRows: 10 }}
              maxLength={200}
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "center", marginBlock: "17px" }}>
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
            className="create-reason-for-rejection-form-button"
            onClick={handleButtonSubmitFormDataForm}
          >
            Crear motivo de rechazo
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default ReasonForRejectionRegistrationFormData;
