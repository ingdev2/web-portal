"use client";

import React from "react";

import { Button, Checkbox, Form, Input, Radio, Select, Space } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import PhoneInput from "antd-phone-input";
import { titleStyleCss } from "@/theme/text_styles";
import { IdcardOutlined } from "@ant-design/icons";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { LockOutlined } from "@ant-design/icons";

const EpsRegistrationFormData: React.FC<{
  epsCompanyLoadingDataForm: boolean;
  epsCompanyValueDataForm: number;
  handleOnChangeEpsCompanyDataForm: (e: any) => void;
  epsCompanyListDataForm: string[];
  handleCreateUserEpsDataForm: () => void;
  epsNameDataForm: string;
  handleOnChangeEpsNameDataForm: (e: any) => void;
  epsLastNameDataForm: string;
  handleOnChangeEpsLastNameDataForm: (e: any) => void;
  idTypeSelectorLoadingDataForm: boolean;
  epsIdTypeValueDataForm: number;
  handleOnChangeSelectIdTypeDataForm: (value: number) => void;
  epsIdTypeListDataForm: string[];
  epsIdNumberDataForm: number;
  handleOnChangeEpsIdNumberDataForm: (e: any) => void;
  genderSelectorLoadingDataForm: boolean;
  epsGenderValueDataForm: number;
  handleOnChangeSelectGenderDataForm: (value: number) => void;
  epsGenderListDataForm: string[];
  companyAreasLoadingDataForm: boolean;
  companyAreaValueDataForm: number;
  handleOnChangeCompanyAreaDataForm: (e: any) => void;
  epsCompanyAreasListDataForm: string[];
  epsEmailDataForm: string;
  handleOnChangeEpsEmailDataForm: (e: any) => void;
  epsCellphoneDataForm: number;
  validatorCellphoneInputFormData: (_: any, value: any) => Promise<void>;
  handleOnChangeEpsCellphoneDataForm: (e: any) => void;
  epsAuthMethodValueDataForm: number;
  handleOnChangeSelectAuthMethodDataForm: (e: any) => void;
  epsAuthMethodListDataForm: string[];
  passwordUserEpsValueDataForm: string;
  handleOnChangePasswordUserEpsValueDataForm: (e: any) => void;
  checkboxValidatorDataForm: (_: any, value: boolean) => Promise<unknown>;
  isCheckboxCheckedDataForm: boolean;
  handleCheckboxChangeDataForm: (e: any) => void;
  checkboxValidatorMessagesDataForm: (
    _: any,
    value: boolean
  ) => Promise<unknown>;
  isCheckboxCheckedMessagesDataForm: boolean;
  handleCheckboxMessagesChangeDataForm: (e: any) => void;
  buttonSubmitFormLoadingDataForm: boolean;
  handleButtonSubmitFormDataForm: () => void;
  handleOnChangeValidatorPasswordDataForm: (_: any, value: any) => void;
}> = ({
  epsCompanyLoadingDataForm,
  epsCompanyValueDataForm,
  handleOnChangeEpsCompanyDataForm,
  epsCompanyListDataForm,
  handleCreateUserEpsDataForm,
  epsNameDataForm,
  handleOnChangeEpsNameDataForm,
  epsLastNameDataForm,
  handleOnChangeEpsLastNameDataForm,
  idTypeSelectorLoadingDataForm,
  epsIdTypeValueDataForm,
  handleOnChangeSelectIdTypeDataForm,
  epsIdTypeListDataForm,
  epsIdNumberDataForm,
  handleOnChangeEpsIdNumberDataForm,
  genderSelectorLoadingDataForm,
  epsGenderValueDataForm,
  handleOnChangeSelectGenderDataForm,
  epsGenderListDataForm,
  companyAreasLoadingDataForm,
  companyAreaValueDataForm,
  handleOnChangeCompanyAreaDataForm,
  epsCompanyAreasListDataForm,
  epsEmailDataForm,
  handleOnChangeEpsEmailDataForm,
  epsCellphoneDataForm,
  validatorCellphoneInputFormData,
  handleOnChangeEpsCellphoneDataForm,
  epsAuthMethodValueDataForm,
  handleOnChangeSelectAuthMethodDataForm,
  epsAuthMethodListDataForm,
  passwordUserEpsValueDataForm,
  handleOnChangePasswordUserEpsValueDataForm,
  checkboxValidatorDataForm,
  isCheckboxCheckedDataForm,
  handleCheckboxChangeDataForm,
  checkboxValidatorMessagesDataForm,
  isCheckboxCheckedMessagesDataForm,
  handleCheckboxMessagesChangeDataForm,
  buttonSubmitFormLoadingDataForm,
  handleButtonSubmitFormDataForm,
  handleOnChangeValidatorPasswordDataForm,
}) => {
  return (
    <Form
      id="create-eps-form"
      name="create-eps-form"
      className="create-eps-form"
      onFinish={handleCreateUserEpsDataForm}
      initialValues={{ remember: false }}
      autoComplete="false"
      layout="vertical"
    >
      <h2
        className="title-create-eps-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginBottom: "22px",
        }}
      >
        Crear usuario EPS
      </h2>

      <Form.Item
        name="eps-company-eps-create-eps"
        label="Empresa en la que labora el colaborador:"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona la empresa en la que labora el colaborador!",
          },
        ]}
      >
        {epsCompanyLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={epsCompanyValueDataForm}
            placeholder="Seleccionar empresa"
            onChange={handleOnChangeEpsCompanyDataForm}
          >
            {epsCompanyListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="new-eps-name"
        label="Nombre(s) del colaborador"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          const filteredValue = value.toUpperCase().replace(/[^A-ZÑ\s]/g, "");
          return filteredValue;
        }}
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese el nombre del colaborador!",
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
          value={epsNameDataForm}
          placeholder="Nombre(s) completos"
          onChange={handleOnChangeEpsNameDataForm}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="new-eps-lastname"
        label="Apellido(s) del colaborador"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          const filteredValue = value.toUpperCase().replace(/[^A-ZÑ\s]/g, "");
          return filteredValue;
        }}
        rules={[
          {
            required: true,
            message: "¡Por favor ingrese el apellido del colaborador!",
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
          value={epsLastNameDataForm}
          placeholder="Apellido(s) completos"
          onChange={handleOnChangeEpsLastNameDataForm}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="new-eps-id-types"
        label="Tipo de identificación del colaborador"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona el tipo de identificación del colaborador!",
          },
        ]}
      >
        {idTypeSelectorLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={epsIdTypeValueDataForm}
            placeholder="Tipo de identificación"
            onChange={handleOnChangeSelectIdTypeDataForm}
          >
            {epsIdTypeListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="new-eps-id-number"
        label="Número de identificación del colaborador"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value) return "";

          return value.replace(/[^0-9]/g, "");
        }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor ingresa el número de identificación del colaborador!",
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
          value={epsIdNumberDataForm}
          placeholder="Número de identificación"
          onChange={handleOnChangeEpsIdNumberDataForm}
          autoComplete="off"
          min={0}
        />
      </Form.Item>

      <Form.Item
        name="new-eps-gender"
        label="Género del colaborador"
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message: "¡Por favor selecciona el tipo de género del colaborador!",
          },
        ]}
      >
        {genderSelectorLoadingDataForm ? (
          <CustomSpin />
        ) : (
          <Select
            value={epsGenderValueDataForm}
            placeholder="Seleccionar género"
            onChange={handleOnChangeSelectGenderDataForm}
          >
            {epsGenderListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="areas-company-eps-create-eps"
        label="Área en la que se desempeña:"
        tooltip="Aquí debes seleccionar el área de la empresa en la que desempeña el colaborador."
        style={{ marginBottom: "13px" }}
        rules={[
          {
            required: true,
            message:
              "¡Por favor selecciona el área de empresa en la que se desempeña el colaborador!",
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
            {epsCompanyAreasListDataForm?.map((option: any) => (
              <Select.Option key={option.id} value={option.id}>
                {option.name}
              </Select.Option>
            ))}
          </Select>
        )}
      </Form.Item>

      <Form.Item
        name="new-eps-email"
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
              "¡Por favor ingresa el correo electrónico corporativo del colaborador!",
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
          value={epsEmailDataForm}
          placeholder="Correo electrónico"
          onChange={handleOnChangeEpsEmailDataForm}
          autoComplete="off"
        />
      </Form.Item>

      <Form.Item
        name="new-eps-cellphone"
        label="Celular corporativo"
        style={{ marginBottom: "13px" }}
        normalize={(value) => {
          if (!value || typeof value !== "string") return "";

          return value.replace(/[^\d+]/g, "");
        }}
        rules={[
          {
            required: false,
            message:
              "¡Por favor ingresa el número de celular corporativo del colaborador!",
          },
          {
            validator: validatorCellphoneInputFormData,
          },
        ]}
      >
        <PhoneInput
          prefix={<FiPhone className="site-form-item-icon" />}
          type="tel"
          value={epsCellphoneDataForm.toString()}
          placeholder="Número de celular"
          onChange={handleOnChangeEpsCellphoneDataForm}
          autoComplete="off"
          min={0}
          enableSearch
        />
      </Form.Item>

      <Form.Item
        name="radio-select-auth-method"
        label="Método de autenticación del colaborador"
        tooltip="El método seleccionado es solo para envío de códigos de acceso a la plataforma."
        style={{ marginBottom: "7px" }}
        rules={[
          {
            required: true,
            message: "¡Por favor selecciona un método de autenticación!",
          },
        ]}
      >
        <Radio.Group
          value={epsAuthMethodValueDataForm}
          onChange={handleOnChangeSelectAuthMethodDataForm}
          style={{ textAlign: "start" }}
        >
          <Space size={"small"} direction="horizontal">
            {epsAuthMethodListDataForm?.map((option: any) => (
              <Radio key={option.id} value={option.id}>
                {option.name}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Form.Item>

      <Form.Item
        id="eps-user-password-create"
        name="eps-user-password-create"
        className="eps-user-password-create"
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
          value={passwordUserEpsValueDataForm}
          placeholder="Contraseña"
          onChange={handleOnChangePasswordUserEpsValueDataForm}
        />
      </Form.Item>

      <Form.Item
        name="eps-user-password-verify-create"
        label="Verificar contraseña"
        style={{ marginBottom: 22 }}
        dependencies={["eps-user-password-create"]}
        rules={[
          {
            required: true,
            message: "¡Por favor verifica tu contraseña!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (
                !value ||
                getFieldValue("eps-user-password-create") === value
              ) {
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
          value={passwordUserEpsValueDataForm}
          placeholder="Verificar contraseña"
          onChange={handleOnChangePasswordUserEpsValueDataForm}
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
              Leer Política de Tratamiento de Datos Personales
            </a>
          </div>
          <Checkbox
            checked={isCheckboxCheckedDataForm}
            onChange={handleCheckboxChangeDataForm}
          >
            Declaro haber leído, entendido y aceptado la Política de Tratamiento
            de Datos Personales
          </Checkbox>
        </div>
      </Form.Item>

      <Form.Item
        name="checkbox-authorization-send-messages"
        valuePropName="checked"
        style={{ textAlign: "center", marginBottom: 13 }}
        rules={[
          {
            validator: checkboxValidatorMessagesDataForm,
          },
        ]}
      >
        <div style={{ marginBottom: 13 }}>
          <Checkbox
            checked={isCheckboxCheckedMessagesDataForm}
            onChange={handleCheckboxMessagesChangeDataForm}
          >
            Acepto el uso de medios electrónicos vía email o celular para
            recibir mensajes informativos
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
            className="create-eps-form-button"
            onClick={handleButtonSubmitFormDataForm}
          >
            Crear usuario EPS
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default EpsRegistrationFormData;
