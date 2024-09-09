"use client";

import React, { ReactNode } from "react";

import { Button, Col, Input, Radio, Row, Space, Typography } from "antd";
import { titleStyleCss } from "@/theme/text_styles";
import {
  MdDriveFileRenameOutline,
  MdOutlineEmail,
  MdBusinessCenter,
} from "react-icons/md";
import { IdcardOutlined } from "@ant-design/icons";
import { TbGenderBigender } from "react-icons/tb";

const AdminPersonalDataFormData: React.FC<{
  nameAdminFormData: string;
  lastNameAdminFormData: string;
  idTypeNameAdminFormData: string;
  idNumberAdminFormData: number | string;
  genderNameAdminFormData: string;
  positionLevelAdminFormData: string;
  companyAreaAdminFormData: string;
  emailAdminFormData: string;
  authMethodAdminFormData: number;
  onChangeAuthMethodAdminFormData: (e: any) => void;
  adminAuthMethodsListFormData: string[];
  iconChangePasswordAdminDataForm: ReactNode;
  onClickChangePasswordDataForm: () => void;
}> = ({
  nameAdminFormData,
  lastNameAdminFormData,
  idTypeNameAdminFormData,
  idNumberAdminFormData,
  genderNameAdminFormData,
  positionLevelAdminFormData,
  companyAreaAdminFormData,
  emailAdminFormData,
  authMethodAdminFormData,
  onChangeAuthMethodAdminFormData,
  adminAuthMethodsListFormData,
  iconChangePasswordAdminDataForm,
  onClickChangePasswordDataForm,
}) => {
  return (
    <Col
      span={24}
      style={{
        margin: "0px",
        paddingInline: "13px",
        paddingTop: "22px",
      }}
    >
      <h2
        className="title-personal-data-admin"
        style={{
          ...titleStyleCss,
          marginBottom: "13px",
          textAlign: "center",
        }}
      >
        Mis datos personales
      </h2>

      <Row gutter={24}>
        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Nombre(s):
            </Typography.Title>

            <Input
              id="name-admin-auto-input"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={nameAdminFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Apellido(s):
            </Typography.Title>

            <Input
              id="last-name-admin-auto-input"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={lastNameAdminFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={10} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Tipo de documento:
            </Typography.Title>

            <Input
              id="id-type-admin-auto-input"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={idTypeNameAdminFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={8} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Número de documento:
            </Typography.Title>

            <Input
              id="id-number-admin-auto-input"
              prefix={<IdcardOutlined className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={idNumberAdminFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={6} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Género:
            </Typography.Title>

            <Input
              id="gender-admin-auto-input"
              prefix={<TbGenderBigender className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={genderNameAdminFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Nivel del cargo:
            </Typography.Title>

            <Input
              id="position-level-admin-auto-input"
              prefix={<MdBusinessCenter className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={positionLevelAdminFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={12} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Área en la que se desempeña:
            </Typography.Title>

            <Input
              id="company-area-auto-input"
              prefix={<MdBusinessCenter className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={companyAreaAdminFormData}
              disabled
            />
          </div>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={14} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Email corporativo:
            </Typography.Title>

            <Input
              id="email-admin-auto-input"
              prefix={<MdOutlineEmail className="site-form-item-icon" />}
              style={{ overflow: "hidden", textOverflow: "ellipsis" }}
              value={emailAdminFormData}
              disabled
            />
          </div>
        </Col>

        <Col span={10} style={{ marginBottom: "13px" }}>
          <div style={{ textAlign: "start" }}>
            <Typography.Title style={{ marginTop: 7 }} level={5}>
              Método de autenticación:
            </Typography.Title>

            <Radio.Group
              defaultValue={authMethodAdminFormData}
              value={authMethodAdminFormData}
              onChange={onChangeAuthMethodAdminFormData}
              style={{ textAlign: "start" }}
              disabled
            >
              <Space size={"small"} direction="horizontal">
                {adminAuthMethodsListFormData?.map((option: any) => (
                  <Radio key={option.id} value={option.id}>
                    {option.name}
                  </Radio>
                ))}
              </Space>
            </Radio.Group>
          </div>
        </Col>
      </Row>

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
          className="change-password-admin"
          icon={iconChangePasswordAdminDataForm}
          onClick={onClickChangePasswordDataForm}
        >
          Cambiar contraseña
        </Button>
      </div>
    </Col>
  );
};

export default AdminPersonalDataFormData;
