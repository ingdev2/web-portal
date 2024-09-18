"use client";

import React from "react";

import { Button, Col, Form, Input, Row } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { IdcardOutlined } from "@ant-design/icons";
import { IoHomeOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import PhoneInput, { PhoneNumber } from "antd-phone-input";

const EditPatientsFormData: React.FC<{
  nameAdminFormData: string;
  idTypeNameAdminFormData: string;
  idNumberAdminFormData: number | string;
  handleConfirmEditAdminFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditAdminFormData: Store | undefined;
  cellphonePatientFormData: string | PhoneNumber | undefined;
  onChangeCellphonePatientFormData: (e: any) => void;
  validatorCellphoneInputFormData: (_: any, value: any) => Promise<void>;
  whatsappPatientFormData: string | PhoneNumber | undefined;
  onChangeWhatsappPatientFormData: (e: any) => void;
  validatorWhatsappInputFormData: (_: any, value: any) => Promise<void>;
  emailEditAdminFormData: string;
  onChangeEmailEditAdminFormData: (e: any) => void;
  residenceAddressEditAdminFormData: string;
  onChangeResidenceAddressEditAdminFormData: (e: any) => void;
  isSubmittingEditAdminFormData: boolean;
  hasChangesFormData: boolean;
  handleButtonClickFormData: () => void;
}> = ({
  nameAdminFormData,
  idTypeNameAdminFormData,
  idNumberAdminFormData,
  handleConfirmEditAdminFormData,
  initialValuesEditAdminFormData,
  cellphonePatientFormData,
  onChangeCellphonePatientFormData,
  validatorCellphoneInputFormData,
  whatsappPatientFormData,
  onChangeWhatsappPatientFormData,
  validatorWhatsappInputFormData,
  emailEditAdminFormData,
  onChangeEmailEditAdminFormData,
  residenceAddressEditAdminFormData,
  onChangeResidenceAddressEditAdminFormData,
  isSubmittingEditAdminFormData,
  hasChangesFormData,
  handleButtonClickFormData,
}) => {
  return (
    <Form
      id="edit-patient-form"
      name="edit-patient-form"
      className="edit-patient-form"
      onFinish={handleConfirmEditAdminFormData}
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
        className="title-edit-patient-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Editar Usuario Paciente Bonnadona
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-patient-name"
            label="Nombre completo del paciente:"
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
                message: "¡Por favor ingrese el nombre del paciente!",
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
              id="name-patient"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={nameAdminFormData}
              placeholder="Nombre completo"
              autoComplete="off"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-patient-id-types"
            label="Tipo de identificación del paciente:"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor selecciona el tipo de identificación del paciente!",
              },
            ]}
          >
            <Input
              id="id-type-patient"
              value={idTypeNameAdminFormData}
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              disabled
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="edit-patient-id-number"
            label="Número de identificación del paciente:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              return value.replace(/[^0-9]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el número de identificación del paciente!",
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
              id="id-number-patient"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              value={idNumberAdminFormData}
              placeholder="Número de identificación"
              autoComplete="off"
              min={0}
              disabled
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-patient-cellphone"
            label="Celular:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value || typeof value !== "string") return "";

              return value.replace(/[^\d+]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el número de celular personal del paciente!",
              },
              {
                validator: validatorCellphoneInputFormData,
              },
            ]}
          >
            <PhoneInput
              prefix={<FiPhone className="site-form-item-icon" />}
              type="tel"
              value={cellphonePatientFormData}
              placeholder="Número de celular"
              onChange={onChangeCellphonePatientFormData}
              autoComplete="off"
              min={0}
              enableSearch
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="edit-patient-whatsapp"
            label="WhatsApp:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value || typeof value !== "string") return "";

              return value.replace(/[^\d+]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el número de WhatsApp personal del paciente!",
              },
              {
                validator: validatorWhatsappInputFormData,
              },
            ]}
          >
            <PhoneInput
              prefix={<FiPhone className="site-form-item-icon" />}
              type="tel"
              value={whatsappPatientFormData}
              placeholder="Número de Whatsapp"
              onChange={onChangeWhatsappPatientFormData}
              autoComplete="off"
              min={0}
              enableSearch
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-patient-email"
            label="Correo electrónico:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el correo electrónico personal del paciente!",
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
              id="email-patient"
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              type="email"
              value={emailEditAdminFormData}
              placeholder="Correo electrónico"
              onChange={onChangeEmailEditAdminFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-patient-residence-address"
            label="Dirección de residencia:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              const filteredValue = value
                .toUpperCase()
                .replace(/[^A-ZÑ0-9\s.,#_/-]/g, "");
              return filteredValue;
            }}
            rules={[
              {
                required: false,
                message: "¡Por favor ingrese su dirección de residencia!",
              },
              {
                min: 10,
                message: "La dirección debe tener al menos 10 caracteres",
              },
              {
                max: 54,
                message: "La dirección no puede tener más de 54 caracteres",
              },
              {
                pattern: /^[A-ZÑ0-9\s.,#_/-]*$/i,
                message:
                  "La dirección solo puede contener letras, números y los siguientes caracteres especiales: . , # -",
              },
            ]}
          >
            <Input
              id="residence-address-patient"
              prefix={<IoHomeOutline className="site-form-item-icon" />}
              type="text"
              value={residenceAddressEditAdminFormData}
              placeholder="Dirección de residencia"
              onChange={onChangeResidenceAddressEditAdminFormData}
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
              className="edit-patient-form-button"
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

export default EditPatientsFormData;
