"use client";

import React from "react";

import { Button, Col, Form, Input, Row } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";

const EditEpsCompanyFormData: React.FC<{
  nameEpsCompanyFormData: string;
  onChangeNameEpsCompanyFormData: (e: any) => void;
  nitEpsCompanyFormData: string;
  onChangeNitEpsCompanyFormData: (e: any) => void;
  emailEpsCompanyFormData: string;
  onChangeEmailEpsCompanyFormData: (e: any) => void;
  handleConfirmEpsCompanyFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditAdminFormData: Store | undefined;
  isSubmittingEditAdminFormData: boolean;
  handleButtonClickFormData: () => void;
  hasChangesFormData: boolean;
}> = ({
  nameEpsCompanyFormData,
  onChangeNameEpsCompanyFormData,
  nitEpsCompanyFormData,
  onChangeNitEpsCompanyFormData,
  emailEpsCompanyFormData,
  onChangeEmailEpsCompanyFormData,
  handleConfirmEpsCompanyFormData,
  initialValuesEditAdminFormData,
  isSubmittingEditAdminFormData,
  handleButtonClickFormData,
  hasChangesFormData,
}) => {
  return (
    <Form
      id="edit-eps-company-form"
      name="edit-eps-company-form"
      className="edit-eps-company-form"
      onFinish={handleConfirmEpsCompanyFormData}
      initialValues={initialValuesEditAdminFormData}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
        paddingBlock: "7px",
        paddingInline: "13px",
      }}
    >
      <h2
        className="title-edit-eps-company-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Editar Empresa de EPS
      </h2>

      <Row gutter={24}>
        <Col span={14}>
          <Form.Item
            name="edit-eps-company-name"
            label="Nombre(s) de empresa:"
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
                required: false,
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
            <Input
              id="name-eps-company"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={nameEpsCompanyFormData}
              placeholder="Nombre de empresa"
              onChange={onChangeNameEpsCompanyFormData}
              autoComplete="off"
              disabled
            />
          </Form.Item>
        </Col>

        <Col span={10}>
          <Form.Item
            name="edit-eps-company-nit"
            label="NIT:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value || typeof value !== "string") return "";

              return value.replace(/[^\d.-]/g, "");
            }}
            rules={[
              {
                required: false,
                message: "¡Por favor ingresa el número de NIT de la empresa!",
              },
            ]}
          >
            <Input
              id="nit-eps-company"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={nitEpsCompanyFormData}
              placeholder="Número de NIT"
              onChange={onChangeNitEpsCompanyFormData}
              autoComplete="off"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-eps-company-email"
            label="Correo electrónico principal:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el correo electrónico de la empresa!",
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
              value={emailEpsCompanyFormData}
              placeholder="Correo electrónico"
              onChange={onChangeEmailEpsCompanyFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        style={{
          textAlign: "center",
          marginBlock: "0px",
          paddingBlock: "13px",
        }}
      >
        {isSubmittingEditAdminFormData ? (
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
              size="large"
              style={{
                backgroundColor: !hasChangesFormData ? "#D8D8D8" : "#015E90",
                color: !hasChangesFormData ? "#A0A0A0" : "#f2f2f2",
                fontWeight: "bold",
                paddingInline: 54,
                borderRadius: 31,
              }}
              htmlType="submit"
              className="edit-eps-company-form-button"
              onClick={handleButtonClickFormData}
              disabled={!hasChangesFormData}
            >
              Actualizar datos
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default EditEpsCompanyFormData;
