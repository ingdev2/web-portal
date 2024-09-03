"use client";

import React from "react";

import { AutoComplete, Button, Col, Form, Input, Row } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";

const EpsCompanyRegistrationFormData: React.FC<{
  handleCreateUserEpsCompanyDataForm: () => void;
  epsCompanyNameDataForm: string;
  handleOnChangeEpsCompanyNameDataForm: (e: any) => void;
  handleSearchNameEpsCompanyDataForm: (e: any) => void;
  optionsEpsCompanyNameDataForm: any[];
  epsCompanyNitDataForm: string;
  handleOnChangeEpsCompanyNitDataForm: (e: any) => void;
  epsCompanyEmailDataForm: string;
  handleOnChangeEpsCompanyEmailDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
}> = ({
  handleCreateUserEpsCompanyDataForm,
  epsCompanyNameDataForm,
  handleOnChangeEpsCompanyNameDataForm,
  handleSearchNameEpsCompanyDataForm,
  optionsEpsCompanyNameDataForm,
  epsCompanyNitDataForm,
  handleOnChangeEpsCompanyNitDataForm,
  epsCompanyEmailDataForm,
  handleOnChangeEpsCompanyEmailDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
}) => {
  return (
    <Form
      id="create-eps-company-form"
      name="create-eps-company-form"
      className="create-eps-company-form"
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
        className="title-create-eps-company-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear empresa EPS
      </h2>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="new-eps-company-name"
            label="Nombre de empresa:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              const filteredValue = value
                .toUpperCase()
                .replace(/[^A-ZÑ\s]/g, "");
              return filteredValue;
            }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el nombre de la empresa!",
              },
              {
                min: 3,
                message: "El nombre debe tener al menos 3 caracteres",
              },
              {
                max: 31,
                message: "El nombre no puede tener más de 31 caracteres",
              },
              {
                pattern: /^[A-ZÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas y espacios",
              },
            ]}
          >
            <AutoComplete
              id="name-eps-company"
              options={optionsEpsCompanyNameDataForm}
              style={{ width: "100%" }}
              onSearch={handleSearchNameEpsCompanyDataForm}
              placeholder="Nombre de empresa"
              value={epsCompanyNameDataForm}
              onChange={handleOnChangeEpsCompanyNameDataForm}
              filterOption={false}
            >
              <Input type="text" autoComplete="off" />
            </AutoComplete>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="new-eps-company-nit"
            label="NIT de empresa:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value || typeof value !== "string") return "";

              return value.replace(/[^\d.-]/g, "");
            }}
            rules={[
              {
                required: true,
                message: "¡Por favor ingrese el NIT de la empresa!",
              },
              {
                min: 8,
                message: "El NIT debe tener al menos 8 caracteres",
              },
              {
                max: 15,
                message: "El NIT no puede tener más de 15 caracteres",
              },
            ]}
          >
            <Input
              id="nit-eps-company"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={epsCompanyNitDataForm}
              placeholder="Número NIT de empresa"
              onChange={handleOnChangeEpsCompanyNitDataForm}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="new-eps-company-email"
            label="Correo electrónico principal:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: true,
                message:
                  "¡Por favor ingresa el correo electrónico principal de la empresa!",
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
              id="email-eps-company"
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              type="email"
              value={epsCompanyEmailDataForm}
              placeholder="Correo electrónico principal"
              onChange={handleOnChangeEpsCompanyEmailDataForm}
              autoComplete="off"
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
            className="create-eps-company-form-button"
            onClick={handleButtonSubmitFormDataForm}
          >
            Crear empresa EPS
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default EpsCompanyRegistrationFormData;
