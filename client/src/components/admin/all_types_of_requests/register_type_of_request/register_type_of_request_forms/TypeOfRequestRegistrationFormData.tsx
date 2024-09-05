"use client";

import React from "react";

import { AutoComplete, Button, Col, Form, Input, Row } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";

const TypeOfRequestRegistrationFormData: React.FC<{
  handleCreateDataFormData: () => void;
  idTypeRequestNameFormData: string;
  handleOnChangeTypeOfRequestNameFormData: (e: any) => void;
  handleSearchNameTypeOfRequestFormData: (e: any) => void;
  optionsTypeOfRequestNameFormData: any[];
  buttonSubmitFormLoadingFormData: boolean;
  handleButtonSubmitFormData: () => void;
}> = ({
  handleCreateDataFormData,
  idTypeRequestNameFormData,
  handleOnChangeTypeOfRequestNameFormData,
  handleSearchNameTypeOfRequestFormData,
  optionsTypeOfRequestNameFormData,
  buttonSubmitFormLoadingFormData,
  handleButtonSubmitFormData,
}) => {
  return (
    <Form
      id="create-type-of-request-form"
      name="create-type-of-request-form"
      className="create-type-of-request-form"
      onFinish={handleCreateDataFormData}
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
        className="title-create-type-of-request-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear tipo de solicitud
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="new-type-of-request-name"
            label="Nombre de tipo de solicitud:"
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
                message: "¡Por favor ingrese el nombre del tipo de solicitud!",
              },
              {
                min: 5,
                message: "El nombre debe tener al menos 5 caracteres",
              },
              {
                max: 40,
                message: "El nombre no puede tener más de 40 caracteres",
              },
              {
                pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas con tildes y espacios",
              },
            ]}
          >
            <AutoComplete
              id="name-type-of-request"
              options={optionsTypeOfRequestNameFormData}
              style={{ width: "100%" }}
              onSearch={handleSearchNameTypeOfRequestFormData}
              placeholder="Nombre de tipo de solicitud"
              value={idTypeRequestNameFormData}
              onChange={handleOnChangeTypeOfRequestNameFormData}
              filterOption={false}
            >
              <Input type="text" autoComplete="off" />
            </AutoComplete>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item style={{ textAlign: "center", marginBlock: "17px" }}>
        {buttonSubmitFormLoadingFormData ? (
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
            className="create-type-of-request-form-button"
            onClick={handleButtonSubmitFormData}
          >
            Crear tipo de solicitud
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default TypeOfRequestRegistrationFormData;
