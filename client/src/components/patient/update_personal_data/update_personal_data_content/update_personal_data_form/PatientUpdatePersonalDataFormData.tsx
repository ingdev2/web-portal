"use client";

import React from "react";

import { Button, Col, Form, Input, Radio, Row, Space, Typography } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import {
  MdDriveFileRenameOutline,
  MdOutlineEmail,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { IdcardOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { TbGenderBigender } from "react-icons/tb";
import { IoHomeOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";

import { CONTACT_PBX } from "@/utils/constants/constants";

const PatientUpdatePersonalDataFormData: React.FC<{
  nameUserPatientFormData: string;
  idTypeNameUserPatientFormData: string;
  idNumberUserPatientFormData: number | string;
  genderNameUserPatientFormData: string;
  affiliationEpsUserPatientFormData: string;
  handleConfirmUpdatePersonalDataFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesUpdatePersonalDataFormData: Store | undefined;
  emailUserPatientFormData: string;
  onChangeEmailUserPatientFormData: (e: any) => void;
  cellphoneUserPatientFormData: number | string;
  onChangeCellphoneUserPatientFormData: (e: any) => void;
  whatsappUserPatientFormData: number | string;
  onChangeWhatsappUserPatientFormData: (e: any) => void;
  authMethodUserPatientFormData: number;
  onChangeAuthMethodUserPatientFormData: (e: any) => void;
  patientAuthMethodsListFormData: string[];
  residendeAddressUserPatientFormData: string;
  onChangeResidendeAddressUserPatientFormData: (e: any) => void;
  isSubmittingUpdatePersonalDataFormData: boolean;
  hasChangesFormData: boolean;
  handleButtonClickFormData: () => void;
}> = ({
  nameUserPatientFormData,
  idTypeNameUserPatientFormData,
  idNumberUserPatientFormData,
  genderNameUserPatientFormData,
  affiliationEpsUserPatientFormData,
  handleConfirmUpdatePersonalDataFormData,
  initialValuesUpdatePersonalDataFormData,
  emailUserPatientFormData,
  onChangeEmailUserPatientFormData,
  cellphoneUserPatientFormData,
  onChangeCellphoneUserPatientFormData,
  whatsappUserPatientFormData,
  onChangeWhatsappUserPatientFormData,
  authMethodUserPatientFormData,
  onChangeAuthMethodUserPatientFormData,
  patientAuthMethodsListFormData,
  residendeAddressUserPatientFormData,
  onChangeResidendeAddressUserPatientFormData,
  isSubmittingUpdatePersonalDataFormData,
  hasChangesFormData,
  handleButtonClickFormData,
}) => {
  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{ padding: "0px", margin: "0px" }}
    >
      <h2
        className="title-update-personal-data-patient"
        style={{
          ...titleStyleCss,
          marginBottom: 7,
          textAlign: "center",
        }}
      >
        Actualización de datos
      </h2>

      <p
        className="warning-message-verify-data"
        style={{
          display: "flow",
          color: "#960202",
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        Por favor, verifique si todos sus datos están correctos, de lo contrario
        debe comunicarse a nuestra línea PBX: <b>{CONTACT_PBX}</b> para realizar
        la actualización de sus datos personales que no se puedan actualizar por
        este medio.
      </p>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Nombre de paciente:
        </Typography.Title>

        <Input
          id="name-patient-auto-input"
          prefix={<MdDriveFileRenameOutline className="site-form-item-icon" />}
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          value={nameUserPatientFormData}
          disabled
        />
      </div>

      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ paddingInlineEnd: "7px" }}
        >
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Tipo de documento:
            </Typography.Title>

            <Input
              id="id-type-patient-auto-input"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={idTypeNameUserPatientFormData}
              disabled
            />
          </div>
        </Col>

        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ paddingInlineStart: "7px" }}
        >
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Número de documento:
            </Typography.Title>

            <Input
              id="id-number-patient-hosvital"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={idNumberUserPatientFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row>
        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ paddingInlineEnd: "7px" }}
        >
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Sexo:
            </Typography.Title>

            <Input
              id="gender-patient-hosvital"
              prefix={<TbGenderBigender className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={genderNameUserPatientFormData}
              disabled
            />
          </div>
        </Col>

        <Col
          xs={12}
          sm={12}
          md={12}
          lg={12}
          style={{ paddingInlineStart: "7px" }}
        >
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              EPS de afiliación:
            </Typography.Title>
            <Input
              id="affiliation-eps-patient-hosvital"
              prefix={
                <MdOutlineHealthAndSafety className="site-form-item-icon" />
              }
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={affiliationEpsUserPatientFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Form
        id="update-personal-data-form-patient"
        name="update-personal-data-form-patient"
        className="update-personal-data-form-patient"
        onFinish={handleConfirmUpdatePersonalDataFormData}
        initialValues={initialValuesUpdatePersonalDataFormData}
        autoComplete="false"
        layout="vertical"
      >
        <div style={{ textAlign: "start" }}>
          <Typography.Title style={{ marginTop: 7 }} level={5}>
            Correo electrónico:
          </Typography.Title>

          <Form.Item
            name="email-patient-hosvital"
            style={{ margin: "0px" }}
            normalize={(value) => {
              if (!value) return "";

              return value.toLowerCase().replace(/[^a-z0-9@._-]/g, "");
            }}
            rules={[
              {
                required: false,
                message: "¡Por favor ingresa un correo electrónico!",
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
              value={emailUserPatientFormData}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              onChange={onChangeEmailUserPatientFormData}
              autoComplete="off"
            />
          </Form.Item>
        </div>

        <Row>
          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ paddingInlineEnd: "7px" }}
          >
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Celular:
              </Typography.Title>

              <Form.Item
                name="cellphone-patient-hosvital"
                style={{ margin: "0px" }}
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: false,
                    message: "¡Por favor ingresa el número de celular!",
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
                  value={cellphoneUserPatientFormData}
                  onChange={onChangeCellphoneUserPatientFormData}
                  autoComplete="off"
                  min={0}
                />
              </Form.Item>
            </div>
          </Col>

          <Col
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ paddingInlineStart: "7px" }}
          >
            <div style={{ textAlign: "start" }}>
              <Typography.Title style={{ marginTop: 7 }} level={5}>
                Whatsapp:
              </Typography.Title>

              <Form.Item
                name="whatsapp-patient-hosvital"
                style={{ margin: "0px" }}
                normalize={(value) => {
                  if (!value) return "";

                  return value.replace(/[^0-9]/g, "");
                }}
                rules={[
                  {
                    required: false,
                    message: "¡Por favor ingresa el número de Whatsapp!",
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
                  value={whatsappUserPatientFormData}
                  onChange={onChangeWhatsappUserPatientFormData}
                  autoComplete="off"
                  min={0}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <div style={{ textAlign: "start" }}>
          <Typography.Title style={{ marginTop: 7 }} level={5}>
            Método de autenticación:
          </Typography.Title>

          <Form.Item
            name="radio-select-auth-method-update-personal-data-patient"
            style={{ margin: "0px" }}
            rules={[
              {
                required: false,
                message: "¡Por favor selecciona un método de autenticación!",
              },
            ]}
          >
            <Radio.Group
              value={authMethodUserPatientFormData}
              onChange={onChangeAuthMethodUserPatientFormData}
              style={{ textAlign: "start" }}
            >
              <Space size={"small"} direction="horizontal">
                {patientAuthMethodsListFormData?.map((option: any) => (
                  <Radio key={option.id} value={option.id}>
                    {option.name}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </div>

        <div style={{ textAlign: "start" }}>
          <Typography.Title style={{ marginTop: 7 }} level={5}>
            Dirección de residencia:
          </Typography.Title>

          <Form.Item
            name="residence-address-patient-hosvital"
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
              prefix={<IoHomeOutline className="site-form-item-icon" />}
              type="text"
              value={residendeAddressUserPatientFormData}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              onChange={onChangeResidendeAddressUserPatientFormData}
              autoComplete="off"
            />
          </Form.Item>
        </div>

        <Form.Item
          style={{
            textAlign: "center",
            marginBlock: "0px",
            paddingBlock: "13px",
          }}
        >
          {isSubmittingUpdatePersonalDataFormData ? (
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
                className="update-personal-data-patient-form-button"
                onClick={handleButtonClickFormData}
                disabled={!hasChangesFormData}
              >
                Actualizar datos personales
              </Button>
            </div>
          )}
        </Form.Item>
      </Form>
    </Col>
  );
};

export default PatientUpdatePersonalDataFormData;
