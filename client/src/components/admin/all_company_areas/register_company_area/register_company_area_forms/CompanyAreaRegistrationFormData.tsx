"use client";

import React from "react";

import { AutoComplete, Button, Col, Form, Input, Row } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";

const CompanyAreaRegistrationFormData: React.FC<{
  handleCreateDataFormData: () => void;
  companyAreaNameFormData: string;
  handleOnChangeCompanyAreaNameFormData: (e: any) => void;
  handleSearchNameCompanyAreaFormData: (e: any) => void;
  optionsCompanyAreasNameFormData: any[];
  buttonSubmitFormLoadingFormData: boolean;
  handleButtonSubmitFormData: () => void;
}> = ({
  handleCreateDataFormData,
  companyAreaNameFormData,
  handleOnChangeCompanyAreaNameFormData,
  handleSearchNameCompanyAreaFormData,
  optionsCompanyAreasNameFormData,
  buttonSubmitFormLoadingFormData,
  handleButtonSubmitFormData,
}) => {
  return (
    <Form
      id="create-company-area-form"
      name="create-company-area-form"
      className="create-company-area-form"
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
        className="title-create-company-area-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear área de empresa
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="new-company-area-name"
            label="Nombre de área de empresa:"
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
                message: "¡Por favor ingrese el nombre del área de empresa!",
              },
              {
                min: 5,
                message: "El nombre debe tener al menos 5 caracteres",
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
              id="name-company-area"
              options={optionsCompanyAreasNameFormData}
              style={{ width: "100%" }}
              onSearch={handleSearchNameCompanyAreaFormData}
              placeholder="Nombre de área de empresa"
              value={companyAreaNameFormData}
              onChange={handleOnChangeCompanyAreaNameFormData}
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
            className="create-company-area-form-button"
            onClick={handleButtonSubmitFormData}
          >
            Crear área de empresa
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default CompanyAreaRegistrationFormData;
