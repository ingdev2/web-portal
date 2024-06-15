"use client";

import React from "react";

import { Button, Checkbox, Form, Input, Radio, Select, Space } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";
import { IdcardOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

const AddRelativeDataForm: React.FC<{
  handleAddAuthFamiliarDataForm: () => void;
  relationshipSelectorLoadingDataForm: boolean;
  familiarRelationshipValueDataForm: number;
  handleOnChangeSelectRelationshipDataForm: (value: number) => void;
  familiarRelationshipListDataForm: [];
  familiarNameDataForm: string;
  handleOnChangeFamiliarNameDataForm: (e: any) => void;
  familiarLastNameDataForm: string;
  handleOnChangeFamiliarLastNameDataForm: (e: any) => void;
  idTypeSelectorLoadingDataForm: boolean;
  familiarIdTypeValueDataForm: number;
  handleOnChangeSelectIdTypeDataForm: (value: number) => void;
  familiarIdTypeListDataForm: string[];
  familiarIdNumberDataForm: number;
  handleOnChangeFamiliarIdNumberDataForm: (e: any) => void;
  genderSelectorLoadingDataForm: boolean;
  familiarGenderValueDataForm: number;
  handleOnChangeSelectGenderDataForm: (value: number) => void;
  familiarGenderListDataForm: string[];
  familiarEmailDataForm: string;
  handleOnChangeFamiliarEmailDataForm: (e: any) => void;
  familiarCellphoneDataForm: number;
  handleOnChangeFamiliarCellphoneDataForm: (e: any) => void;
  familiarAuthMethodValueDataForm: number;
  handleOnChangeSelectAuthMethodDataForm: (e: any) => void;
  familiarAuthMethodListDataForm: string[];
  familiarWhatsappDataForm: number;
  handleOnChangeFamiliarWhatsappDataForm: (e: any) => void;
  checkboxValidatorDataForm: (_: any, value: boolean) => Promise<unknown>;
  isCheckboxCheckedDataForm: boolean;
  handleCheckboxChangeDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
}> = ({
  handleAddAuthFamiliarDataForm,
  relationshipSelectorLoadingDataForm,
  familiarRelationshipValueDataForm,
  handleOnChangeSelectRelationshipDataForm,
  familiarRelationshipListDataForm,
  familiarNameDataForm,
  handleOnChangeFamiliarNameDataForm,
  familiarLastNameDataForm,
  handleOnChangeFamiliarLastNameDataForm,
  idTypeSelectorLoadingDataForm,
  familiarIdTypeValueDataForm,
  handleOnChangeSelectIdTypeDataForm,
  familiarIdTypeListDataForm,
  familiarIdNumberDataForm,
  handleOnChangeFamiliarIdNumberDataForm,
  genderSelectorLoadingDataForm,
  familiarGenderValueDataForm,
  handleOnChangeSelectGenderDataForm,
  familiarGenderListDataForm,
  familiarEmailDataForm,
  handleOnChangeFamiliarEmailDataForm,
  familiarCellphoneDataForm,
  handleOnChangeFamiliarCellphoneDataForm,
  familiarAuthMethodValueDataForm,
  handleOnChangeSelectAuthMethodDataForm,
  familiarAuthMethodListDataForm,
  familiarWhatsappDataForm,
  handleOnChangeFamiliarWhatsappDataForm,
  checkboxValidatorDataForm,
  isCheckboxCheckedDataForm,
  handleCheckboxChangeDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
}) => {
  return (
    <Form
      id="add-relative-form"
      name="add-relative-form"
      className="add-relative-form"
      onFinish={handleAddAuthFamiliarDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
    >
      <h2
        className="title-add-relative-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Agregar familiar autorizado
      </h2>

      <Form.Item
        name="new-familiar-relationship-with-patient"
        label="Tipo de parentesco"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona el tipo de parentesco con el familiar!",
          },
        ]}
      >
        {relationshipSelectorLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={familiarRelationshipValueDataForm}
            placeholder="Parentesco con familiar"
            onChange={handleOnChangeSelectRelationshipDataForm}
          >
            {familiarRelationshipListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="new-familiar-name"
        label="Nombre(s) del familiar"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          const filteredValue = value.toUpperCase().replace(/[^A-ZÑ\s]/g, "");
          return filteredValue;
        }}
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese el nombre del familiar!",
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
          prefix={<MdDriveFileRenameOutline className="site-form-item-icon" />}
          type="text"
          value={familiarNameDataForm}
          placeholder="Nombre(s) completos"
          onChange={handleOnChangeFamiliarNameDataForm}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="new-familiar-lastname"
        label="Apellido(s) del familiar"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          const filteredValue = value.toUpperCase().replace(/[^A-ZÑ\s]/g, "");
          return filteredValue;
        }}
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese el apellido del familiar!",
          },
          {
            min: 4,
            message: "El apellido debe tener al menos 4 caracteres",
          },
          {
            max: 31,
            message: "El apellido no puede tener más de 31 caracteres",
          },
          {
            pattern: /^[A-ZÑ\s]*$/,
            message:
              "El apellido solo puede contener letras mayúsculas y espacios",
          },
        ]}
      >
        <Input
          prefix={<MdDriveFileRenameOutline className="site-form-item-icon" />}
          type="text"
          value={familiarLastNameDataForm}
          placeholder="Apellido(s) completos"
          onChange={handleOnChangeFamiliarLastNameDataForm}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="new-familiar-id-types"
        label="Tipo de identificación del familiar"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona el tipo de identificación del familiar!",
          },
        ]}
      >
        {idTypeSelectorLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={familiarIdTypeValueDataForm}
            placeholder="Tipo de identificación"
            onChange={handleOnChangeSelectIdTypeDataForm}
          >
            {familiarIdTypeListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="new-familiar-id-number"
        label="Número de identificación del familiar"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          return value.replace(/[^0-9]/g, "");
        }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor ingresa el número de identificación del familiar!",
          },
          {
            pattern: /^[0-9]+$/,
            message: "¡Por favor ingresa número de identificación sin puntos!",
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
          value={familiarIdNumberDataForm}
          placeholder="Número de identificación"
          onChange={handleOnChangeFamiliarIdNumberDataForm}
          autoComplete="off"
          min={0}
        />
      </Form.Item>

      <Form.Item
        name="new-familiar-gender"
        label="Sexo del familiar"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message: "¡Por favor selecciona el tipo de sexo del familiar!",
          },
        ]}
      >
        {genderSelectorLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={familiarGenderValueDataForm}
            placeholder="Selecciona sexo"
            onChange={handleOnChangeSelectGenderDataForm}
          >
            {familiarGenderListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="new-familiar-email"
        label="Correo electrónico del familiar"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
        }}
        rules={[
          {
            required: true,
            message: "¡Por favor ingresa el correo electrónico del familiar!",
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
          prefix={<MdOutlineEmail className="site-form-item-icon" />}
          type="email"
          value={familiarEmailDataForm}
          placeholder="Correo electrónico"
          onChange={handleOnChangeFamiliarEmailDataForm}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="new-familiar-cellphone"
        label="Celular del familiar"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          return value.replace(/[^0-9]/g, "");
        }}
        rules={[
          {
            required: false,
            message: "¡Por favor ingresa el número de celular del familiar!",
          },
          {
            pattern: /^[0-9]+$/,
            message:
              "¡Por favor ingresa número de celular sin puntos ni comas!",
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
          prefix={<FiPhone className="site-form-item-icon" />}
          type="tel"
          value={familiarCellphoneDataForm}
          placeholder="Número de celular"
          onChange={handleOnChangeFamiliarCellphoneDataForm}
          autoComplete="off"
          min={0}
        />
      </Form.Item>

      <Form.Item
        name="radio-select-auth-method"
        label="Método de autenticación del familiar"
        style={{ marginBottom: "22px" }}
        rules={[
          {
            required: true,
            message: "¡Por favor selecciona un método de autenticación!",
          },
        ]}
      >
        <Radio.Group
          value={familiarAuthMethodValueDataForm}
          onChange={handleOnChangeSelectAuthMethodDataForm}
          style={{ textAlign: "start" }}
        >
          <Space size={"small"} direction="horizontal">
            {familiarAuthMethodListDataForm?.map((option: any) => (
              <Radio key={option.id} value={option.id}>
                {option.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        name="familiar-whatsapp-register"
        label="WhatsApp del familiar (opcional)"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          return value.replace(/[^0-9]/g, "");
        }}
        rules={[
          {
            required: false,
          },
          {
            pattern: /^[0-9]+$/,
            message:
              "¡Por favor ingresa número de WhatsApp sin puntos ni comas!",
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
          prefix={<WhatsAppOutlined className="site-form-item-icon" />}
          type="tel"
          value={familiarWhatsappDataForm}
          placeholder="Número de WhatsApp"
          onChange={handleOnChangeFamiliarWhatsappDataForm}
          autoComplete="off"
          min={0}
        />
      </Form.Item>

      <Form.Item
        name="checkbox-data-autorization"
        valuePropName="checked"
        style={{ textAlign: "center", marginBottom: 13 }}
        rules={[
          {
            validator: checkboxValidatorDataForm,
          },
        ]}
      >
        <div style={{ marginBlock: 7 }}>
          <div style={{ marginBottom: "13px" }}>
            <a
              className="data-processing-autorization-link"
              href={process.env.NEXT_PUBLIC_DATA_PROCESSING_AUTORIZATION_LINK}
              target="_blank"
              style={{ textDecoration: "underline" }}
            >
              Leer Política de Tratamiento de Datos
            </a>
          </div>
          <Checkbox
            checked={isCheckboxCheckedDataForm}
            onChange={handleCheckboxChangeDataForm}
          >
            Acepto las políticas de tratamiento de datos personales
          </Checkbox>
        </div>
      </Form.Item>

      <Form.Item style={{ textAlign: "center", marginBottom: "13px" }}>
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
            className="add-auth-familiar-form-button"
            onClick={handleButtonSubmitFormDataForm}
          >
            Agregar familiar
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AddRelativeDataForm;
