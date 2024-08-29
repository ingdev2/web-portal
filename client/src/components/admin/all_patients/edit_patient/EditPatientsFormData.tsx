"use client";

import React from "react";

import { Button, Col, Form, Input, Row, Select } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { MdDriveFileRenameOutline, MdOutlineEmail } from "react-icons/md";
import { IdcardOutlined } from "@ant-design/icons";
import { FiPhone } from "react-icons/fi";
import PhoneInput from "antd-phone-input";

const EditPatientsFormData: React.FC<{
  nameAdminFormData: string;
  onChangeNameAdminFormData: (e: any) => void;
  lastNameAdminFormData: string;
  onChangeLastNameAdminFormData: (e: any) => void;
  idTypeNameAdminFormData: string;
  idNumberAdminFormData: number | string;
  onChangeIdNumberAdminFormData: (e: any) => void;
  positionLevelLoadingDataForm: boolean;
  positionLevelAdminValueFormData: number;
  positionLevelsAdminListDataForm: any[] | undefined;
  onChangePositionLevelAdminDataForm: (value: number) => void;
  companyAreasLoadingDataForm: boolean;
  companyAreaAdminValueFormData: number;
  companyAreasAdminListDataForm: any[] | undefined;
  onChangeCompanyAreaAdminDataForm: (value: number) => void;
  handleConfirmEditAdminFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditAdminFormData: Store | undefined;
  cellphoneEpsFormData: number | string;
  onChangeCellphoneEpsFormData: (e: any) => void;
  validatorCellphoneInputFormData: (_: any, value: any) => Promise<void>;
  emailEditAdminFormData: string;
  onChangeEmailEditAdminFormData: (e: any) => void;
  isSubmittingEditAdminFormData: boolean;
  hasChangesFormData: boolean;
  handleButtonClickFormData: () => void;
}> = ({
  nameAdminFormData,
  onChangeNameAdminFormData,
  lastNameAdminFormData,
  onChangeLastNameAdminFormData,
  idTypeNameAdminFormData,
  idNumberAdminFormData,
  onChangeIdNumberAdminFormData,
  positionLevelLoadingDataForm,
  positionLevelAdminValueFormData,
  positionLevelsAdminListDataForm,
  onChangePositionLevelAdminDataForm,
  companyAreasLoadingDataForm,
  companyAreaAdminValueFormData,
  companyAreasAdminListDataForm,
  onChangeCompanyAreaAdminDataForm,
  handleConfirmEditAdminFormData,
  initialValuesEditAdminFormData,
  cellphoneEpsFormData,
  onChangeCellphoneEpsFormData,
  validatorCellphoneInputFormData,
  emailEditAdminFormData,
  onChangeEmailEditAdminFormData,
  isSubmittingEditAdminFormData,
  hasChangesFormData,
  handleButtonClickFormData,
}) => {
  return (
    <Form
      id="edit-eps-form"
      name="edit-eps-form"
      className="edit-eps-form"
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
        className="title-edit-eps-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Editar Usuario de EPS
      </h2>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-eps-name"
            label="Nombre(s) del colaborador"
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
              id="name-eps"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={nameAdminFormData}
              placeholder="Nombre(s) completos"
              onChange={onChangeNameAdminFormData}
              autoComplete="off"
              disabled
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="edit-eps-lastname"
            label="Apellido(s) del colaborador"
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
              id="lastname-eps"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={lastNameAdminFormData}
              placeholder="Apellido(s) completos"
              onChange={onChangeLastNameAdminFormData}
              autoComplete="off"
              disabled
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item
            name="edit-eps-id-types"
            label="Tipo de identificación del colaborador"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor selecciona el tipo de identificación del colaborador!",
              },
            ]}
          >
            <Input
              id="id-type-eps"
              value={idTypeNameAdminFormData}
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              disabled
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="edit-eps-id-number"
            label="Número de identificación del colaborador"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              return value.replace(/[^0-9]/g, "");
            }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor ingresa el número de identificación del colaborador!",
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
              id="id-number-eps"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              value={idNumberAdminFormData}
              placeholder="Número de identificación"
              onChange={onChangeIdNumberAdminFormData}
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
            name="edit-eps-company-user-eps"
            label="Empresa donde labora:"
            tooltip="Aquí debes seleccionar la empresa donde labora el colaborador."
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor selecciona empresa donde labora el colaborador!",
              },
            ]}
          >
            {positionLevelLoadingDataForm ? (
              <CustomSpin />
            ) : (
              <Select
                id="eps-companies-eps"
                value={positionLevelAdminValueFormData}
                placeholder="Seleccionar empresa"
                onChange={onChangePositionLevelAdminDataForm}
                disabled
              >
                {positionLevelsAdminListDataForm?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="edit-eps-areas-company"
            label="Área en la que se desempeña:"
            tooltip="Aquí debes seleccionar el área de la empresa en la que desempeña el colaborador."
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor selecciona el área de empresa en la que se desempeña el colaborador!",
              },
            ]}
          >
            {companyAreasLoadingDataForm ? (
              <CustomSpin />
            ) : (
              <Select
                id="areas-company-admin"
                value={companyAreaAdminValueFormData}
                placeholder="Seleccionar área"
                onChange={onChangeCompanyAreaAdminDataForm}
              >
                {companyAreasAdminListDataForm?.map((option: any) => (
                  <Select.Option key={option.id} value={option.id}>
                    {option.name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={10}>
          <Form.Item
            name="edit-eps-cellphone"
            label="Celular corporativo "
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
              value={cellphoneEpsFormData.toString()}
              placeholder="Número de celular"
              onChange={onChangeCellphoneEpsFormData}
              autoComplete="off"
              min={0}
              enableSearch
            />
          </Form.Item>
        </Col>

        <Col span={14}>
          <Form.Item
            name="edit-eps-email"
            label="Correo electrónico corporativo"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";
              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: false,
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
              id="email-eps"
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
              className="edit-eps-form-button"
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
