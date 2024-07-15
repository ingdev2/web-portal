"use client";

import React, { ReactNode } from "react";

import {
  Button,
  Col,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import {
  MdDriveFileRenameOutline,
  MdOutlineEmail,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import { IdcardOutlined } from "@ant-design/icons";
import { TbGenderBigender } from "react-icons/tb";
import { FiPhone } from "react-icons/fi";

const EpsUpdatePersonalDataFormData: React.FC<{
  nameUserEpsFormData: string;
  idTypeNameUserEpsFormData: string;
  idNumberUserEpsFormData: number | string;
  genderNameUserEpsFormData: string;
  epsCompanyUserEpsFormData: string;
  handleConfirmUpdatePersonalDataFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesUpdatePersonalDataFormData: Store | undefined;
  emailUserEpsFormData: string;
  onChangeEmailUserEpsFormData: (e: any) => void;
  cellphoneUserEpsFormData: number | string;
  onChangeCellphoneUserEpsFormData: (e: any) => void;
  companyAreasLoadingDataForm: boolean;
  companyAreaValueDataForm: number;
  handleOnChangeCompanyAreaDataForm: (value: number) => void;
  epsCompanyAreasListDataForm: string[];
  authMethodUserEpsFormData: number;
  onChangeAuthMethodUserEpsFormData: (e: any) => void;
  epsAuthMethodsListFormData: string[];
  iconChangePasswordEpsDataForm: ReactNode;
  onClickChangePasswordDataForm: () => void;
  isSubmittingUpdatePersonalDataFormData: boolean;
  hasChangesFormData: boolean;
  handleButtonClickFormData: () => void;
}> = ({
  nameUserEpsFormData,
  idTypeNameUserEpsFormData,
  idNumberUserEpsFormData,
  genderNameUserEpsFormData,
  epsCompanyUserEpsFormData,
  handleConfirmUpdatePersonalDataFormData,
  initialValuesUpdatePersonalDataFormData,
  emailUserEpsFormData,
  onChangeEmailUserEpsFormData,
  cellphoneUserEpsFormData,
  companyAreasLoadingDataForm,
  companyAreaValueDataForm,
  handleOnChangeCompanyAreaDataForm,
  epsCompanyAreasListDataForm,
  onChangeCellphoneUserEpsFormData,
  authMethodUserEpsFormData,
  onChangeAuthMethodUserEpsFormData,
  epsAuthMethodsListFormData,
  iconChangePasswordEpsDataForm,
  onClickChangePasswordDataForm,
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
        className="title-update-personal-data-eps"
        style={{
          ...titleStyleCss,
          marginBottom: 7,
          textAlign: "center",
        }}
      >
        Actualización de datos
      </h2>

      <div style={{ textAlign: "start" }}>
        <Typography.Title style={{ marginTop: 7 }} level={5}>
          Nombre de colaborador EPS:
        </Typography.Title>

        <Input
          id="name-eps-auto-input"
          prefix={<MdDriveFileRenameOutline className="site-form-item-icon" />}
          style={{ overflow: "hidden", textOverflow: "ellipsis" }}
          value={nameUserEpsFormData}
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
              id="id-type-eps-auto-input"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={idTypeNameUserEpsFormData}
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
              id="id-number-eps-hosvital"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={idNumberUserEpsFormData}
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
              id="gender-eps-hosvital"
              prefix={<TbGenderBigender className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={genderNameUserEpsFormData}
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
              Empresa EPS:
            </Typography.Title>
            <Input
              id="company-eps-user-eps-hosvital"
              prefix={
                <MdOutlineHealthAndSafety className="site-form-item-icon" />
              }
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={epsCompanyUserEpsFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Form
        id="update-personal-data-form-eps"
        name="update-personal-data-form-eps"
        className="update-personal-data-form-eps"
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
            name="email-eps-hosvital"
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
              value={emailUserEpsFormData}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              onChange={onChangeEmailUserEpsFormData}
              autoComplete="off"
            />
          </Form.Item>
        </div>

        <div style={{ textAlign: "start" }}>
          <Typography.Title style={{ marginTop: 7 }} level={5}>
            Celular:
          </Typography.Title>

          <Form.Item
            name="cellphone-eps-hosvital"
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
              value={cellphoneUserEpsFormData}
              onChange={onChangeCellphoneUserEpsFormData}
              autoComplete="off"
              min={0}
            />
          </Form.Item>
        </div>

        <div style={{ textAlign: "start" }}>
          <Typography.Title style={{ marginTop: 7 }} level={5}>
            Área en la que se desempeña en la empresa:
          </Typography.Title>

          <Form.Item
            name="areas-company-eps"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: false,
                message:
                  "¡Por favor selecciona el área de empresa a actualizar!",
              },
            ]}
          >
            {companyAreasLoadingDataForm ? (
              <CustomSpin />
            ) : (
              <Select
                value={companyAreaValueDataForm}
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
        </div>

        <div style={{ textAlign: "start" }}>
          <Typography.Title style={{ marginTop: 7 }} level={5}>
            Método de autenticación:
          </Typography.Title>

          <Form.Item
            name="radio-select-auth-method-update-personal-data-eps"
            style={{ margin: "0px" }}
            rules={[
              {
                required: false,
                message: "¡Por favor selecciona un método de autenticación!",
              },
            ]}
          >
            <Radio.Group
              value={authMethodUserEpsFormData}
              onChange={onChangeAuthMethodUserEpsFormData}
              style={{ textAlign: "start" }}
            >
              <Space size={"small"} direction="horizontal">
                {epsAuthMethodsListFormData?.map((option: any) => (
                  <Radio key={option.id} value={option.id}>
                    {option.name}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </Form.Item>
        </div>

        <div
          style={{
            display: "flex",
            flexFlow: "column wrap",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            paddingTop: "22px",
            paddingBottom: "13px",
          }}
        >
          <Button
            style={{
              paddingInline: 13,
              color: "#015E90",
              borderColor: "#015E90",
              fontWeight: "bold",
              borderRadius: 7,
              borderWidth: 2,
              display: "flex",
              flexFlow: "row wrap",
              alignContent: "center",
              alignItems: "center",
            }}
            type="text"
            size="middle"
            className="change-password-eps"
            icon={iconChangePasswordEpsDataForm}
            onClick={onClickChangePasswordDataForm}
          >
            Cambiar contraseña
          </Button>
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
                className="update-personal-data-eps-form-button"
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

export default EpsUpdatePersonalDataFormData;
