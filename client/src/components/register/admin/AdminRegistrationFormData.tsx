"use client";

import React from "react";

import { Button, Checkbox, Form, Input, Radio, Select, Space } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss } from "@/theme/text_styles";
import { IdcardOutlined } from "@ant-design/icons";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { LockOutlined } from "@ant-design/icons";

const AdminRegistrationFormData: React.FC<{
  positionLevelLoadingDataForm: boolean;
  positionLevelValueDataForm: number;
  handleOnChangePositionLevelDataForm: (e: any) => void;
  positionLevelListDataForm: string[];
  handleCreateAdminDataForm: () => void;
  adminNameDataForm: string;
  handleOnChangeAdminNameDataForm: (e: any) => void;
  adminLastNameDataForm: string;
  handleOnChangeAdminLastNameDataForm: (e: any) => void;
  idTypeSelectorLoadingDataForm: boolean;
  adminIdTypeValueDataForm: number;
  handleOnChangeSelectIdTypeDataForm: (value: number) => void;
  adminIdTypeListDataForm: string[];
  adminIdNumberDataForm: number;
  handleOnChangeAdminIdNumberDataForm: (e: any) => void;
  genderSelectorLoadingDataForm: boolean;
  adminGenderValueDataForm: number;
  handleOnChangeSelectGenderDataForm: (value: number) => void;
  adminGenderListDataForm: string[];
  companyAreasLoadingDataForm: boolean;
  companyAreaValueDataForm: number;
  handleOnChangeCompanyAreaDataForm: (e: any) => void;
  adminCompanyAreasListDataForm: string[];
  adminEmailDataForm: string;
  handleOnChangeAdminEmailDataForm: (e: any) => void;
  passwordAdminValueDataForm: string;
  handleOnChangePasswordAdminValueDataForm: (e: any) => void;
  checkboxValidatorDataForm: (_: any, value: boolean) => Promise<unknown>;
  isCheckboxCheckedDataForm: boolean;
  handleCheckboxChangeDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
  handleOnChangeValidatorPasswordDataForm: (_: any, value: any) => void;
}> = ({
  positionLevelLoadingDataForm,
  positionLevelValueDataForm,
  handleOnChangePositionLevelDataForm,
  positionLevelListDataForm,
  handleCreateAdminDataForm,
  adminNameDataForm,
  handleOnChangeAdminNameDataForm,
  adminLastNameDataForm,
  handleOnChangeAdminLastNameDataForm,
  idTypeSelectorLoadingDataForm,
  adminIdTypeValueDataForm,
  handleOnChangeSelectIdTypeDataForm,
  adminIdTypeListDataForm,
  adminIdNumberDataForm,
  handleOnChangeAdminIdNumberDataForm,
  genderSelectorLoadingDataForm,
  adminGenderValueDataForm,
  handleOnChangeSelectGenderDataForm,
  adminGenderListDataForm,
  companyAreasLoadingDataForm,
  companyAreaValueDataForm,
  handleOnChangeCompanyAreaDataForm,
  adminCompanyAreasListDataForm,
  adminEmailDataForm,
  handleOnChangeAdminEmailDataForm,
  passwordAdminValueDataForm,
  handleOnChangePasswordAdminValueDataForm,
  checkboxValidatorDataForm,
  isCheckboxCheckedDataForm,
  handleCheckboxChangeDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
  handleOnChangeValidatorPasswordDataForm,
}) => {
  const adminAuthMethodListDataForm = [
    { id: "email", name: "CORREO ELECTRÓNICO" },
    { id: "phone", name: "CELULAR" },
  ];

  const adminDefaultValueAuthMethod: string = adminAuthMethodListDataForm[0].id;

  return (
    <Form
      id="create-admin-form"
      name="create-admin-form"
      className="create-admin-form"
      onFinish={handleCreateAdminDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
    >
      <h2
        className="title-create-admin-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear usuario ADMINISTRADOR
      </h2>

      <Form.Item
        name="new-admin-name"
        label="Nombre(s) del administrador"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          const filteredValue = value.toUpperCase().replace(/[^A-ZÑ\s]/g, "");
          return filteredValue;
        }}
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese el nombre del administrador!",
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
          value={adminNameDataForm}
          placeholder="Nombre(s) completos"
          onChange={handleOnChangeAdminNameDataForm}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="new-admin-lastname"
        label="Apellido(s) del administrador"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          const filteredValue = value.toUpperCase().replace(/[^A-ZÑ\s]/g, "");
          return filteredValue;
        }}
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese el apellido del administrador!",
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
          value={adminLastNameDataForm}
          placeholder="Apellido(s) completos"
          onChange={handleOnChangeAdminLastNameDataForm}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="new-admin-id-types"
        label="Tipo de identificación del administrador"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona el tipo de identificación del administrador!",
          },
        ]}
      >
        {idTypeSelectorLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={adminIdTypeValueDataForm}
            placeholder="Tipo de identificación"
            onChange={handleOnChangeSelectIdTypeDataForm}
          >
            {adminIdTypeListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="new-admin-id-number"
        label="Número de identificación del administrador"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          return value.replace(/[^0-9]/g, "");
        }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor ingresa el número de identificación del administrador!",
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
          value={adminIdNumberDataForm}
          placeholder="Número de identificación"
          onChange={handleOnChangeAdminIdNumberDataForm}
          autoComplete="off"
          min={0}
        />
      </Form.Item>

      <Form.Item
        name="new-admin-gender"
        label="Género del administrador"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona el tipo de género del administrador!",
          },
        ]}
      >
        {genderSelectorLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={adminGenderValueDataForm}
            placeholder="Seleccionar género"
            onChange={handleOnChangeSelectGenderDataForm}
          >
            {adminGenderListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="position-level-create-admin"
        label="Nivel de cargo:"
        tooltip="Aquí debes seleccionar el nivel del cargo que desempeña el administrador dentro de la empresa."
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona el nivel de cargo del administrador!",
          },
        ]}
      >
        {positionLevelLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={positionLevelValueDataForm}
            placeholder="Seleccionar nivel de cargo"
            onChange={handleOnChangePositionLevelDataForm}
          >
            {positionLevelListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="areas-company-create-admin"
        label="Área en la que se desempeña:"
        tooltip="Aquí debes seleccionar el área de la empresa en la que desempeña el administrador."
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona el área de empresa en la que se desempeña el administrador!",
          },
        ]}
      >
        {companyAreasLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={companyAreaValueDataForm}
            placeholder="Seleccionar área"
            onChange={handleOnChangeCompanyAreaDataForm}
          >
            {adminCompanyAreasListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="new-admin-email"
        label="Correo electrónico corporativo"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
        }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor ingresa el correo electrónico corporativo del administrador!",
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
          value={adminEmailDataForm}
          placeholder="Correo electrónico"
          onChange={handleOnChangeAdminEmailDataForm}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        id="radio-select-auth-method"
        name="radio-select-auth-method"
        className="radio-select-auth-method"
        label="Método de autenticación del colaborador"
        tooltip="El método seleccionado es solo para envío de códigos de acceso a la plataforma."
        initialValue={adminDefaultValueAuthMethod}
        style={{ marginBottom: "7px" }}
        rules={[
          {
            required: true,
            message: "¡Por favor selecciona un método de autenticación!",
          },
        ]}
      >
        <Radio.Group
          id="radio-select-auth-method"
          name="radio-select-auth-method"
          className="radio-select-auth-method"
          style={{ textAlign: "start" }}
          disabled
        >
          <Space size={"small"} direction="horizontal">
            {adminAuthMethodListDataForm?.map((option: any) => (
              <Radio key={option.id} value={option.id}>
                {option.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        id="admin-password-create"
        name="admin-password-create"
        className="admin-password-create"
        label="Contraseña"
        style={{ marginBottom: 13 }}
        rules={[
          {
            required: true,
            message: "¡Por favor ingresa tu contraseña!",
          },
          {
            min: 8,
            message: "¡La contraseña debe tener mínimo 8 caracteres!",
          },
          {
            max: 31,
            message: "¡La contraseña debe tener máximo 31 caracteres!",
          },
          {
            validator: (_, value) => {
              const containsLowercase = /[a-z]/.test(value ?? "");
              const containsUppercase = /[A-Z]/.test(value ?? "");
              if (!containsLowercase || !containsUppercase) {
                return Promise.reject(
                  "¡La contraseña debe contener al menos una letra minúscula y una letra mayúscula!"
                );
              }
              return Promise.resolve();
            },
          },
          {
            validator: (_, value) => {
              const containsSpecialChar = /[_\-*&%#$\/.,+=]/.test(value ?? "");
              if (!containsSpecialChar) {
                return Promise.reject(
                  "La contraseña debe contener al menos un carácter especial (_ - * & % # $ / . , + =)"
                );
              }
              return Promise.resolve();
            },
          },
          {
            validator: handleOnChangeValidatorPasswordDataForm,
          },
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          value={passwordAdminValueDataForm}
          placeholder="Contraseña"
          onChange={handleOnChangePasswordAdminValueDataForm}
        />
      </Form.Item>

      <Form.Item
        name="admin-password-verify-create"
        label="Verificar contraseña"
        style={{ marginBottom: 22 }}
        dependencies={["admin-password-create"]}
        rules={[
          {
            required: true,
            message: "¡Por favor verifica tu contraseña!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("admin-password-create") === value) {
                return Promise.resolve();
              }
              return Promise.reject("Las contraseñas no coinciden.");
            },
          }),
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          value={passwordAdminValueDataForm}
          placeholder="Verificar contraseña"
          onChange={handleOnChangePasswordAdminValueDataForm}
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
            className="create-admin-form-button"
            onClick={handleButtonSubmitFormDataForm}
          >
            Crear usuario ADMIN.
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default AdminRegistrationFormData;
