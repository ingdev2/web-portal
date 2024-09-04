"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalAdminDetails: React.FC<{
  titleDescription: string;
  labelAdminName: string;
  selectedAdminName: string | undefined;
  labelAdminLastName: string;
  selectedAdminLastName: string | undefined;
  labelAdminIdType: string;
  selectedAdminIdType: ReactNode;
  labelAdminIdNumber: string;
  selectedAdminIdNumber: number | undefined;
  labelAdminGender: string;
  selectedAdminGender: string | undefined;
  labelAdminLevelPosition: string;
  selectedAdminLevelPosition: string | undefined;
  labelAdminCompanyArea: string;
  selectedAdminCompanyArea: string | undefined;
  labelAdminEmail: string;
  selectedAdminEmail: string | undefined;
}> = ({
  titleDescription,
  labelAdminName,
  selectedAdminName,
  labelAdminLastName,
  selectedAdminLastName,
  labelAdminIdType,
  selectedAdminIdType,
  labelAdminIdNumber,
  selectedAdminIdNumber,
  labelAdminGender,
  selectedAdminGender,
  labelAdminLevelPosition,
  selectedAdminLevelPosition,
  labelAdminCompanyArea,
  selectedAdminCompanyArea,
  labelAdminEmail,
  selectedAdminEmail,
}) => {
  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        padding: "2px",
        margin: "0px",
      }}
    >
      <h2
        style={{
          width: "100%",
          ...titleStyleCss,
          margin: "0px",
          paddingBottom: "13px",
          fontSize: "22px",
        }}
      >
        {titleDescription}
      </h2>

      <Descriptions
        className="description-admin-details-admin"
        layout="vertical"
        size="middle"
        style={{ width: "100%", paddingBlock: "7px" }}
        labelStyle={{
          ...titleStyleCss,
        }}
        contentStyle={{
          ...subtitleStyleCss,
        }}
        bordered
        column={12}
      >
        <Descriptions.Item
          label={labelAdminName}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedAdminName}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAdminLastName}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedAdminLastName}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelAdminIdType}
          style={{ textAlign: "center" }}
          span={5}
        >
          {selectedAdminIdType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAdminIdNumber}
          style={{ textAlign: "center" }}
          span={5}
        >
          {selectedAdminIdNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAdminGender}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedAdminGender}
        </Descriptions.Item>

        {/* FILA 2 */}

        <Descriptions.Item
          label={labelAdminLevelPosition}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedAdminLevelPosition}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAdminCompanyArea}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedAdminCompanyArea}
        </Descriptions.Item>

        {/* FILA 3 */}

        <Descriptions.Item
          label={labelAdminEmail}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedAdminEmail}
        </Descriptions.Item>

        {/* FILA 4 */}
      </Descriptions>
    </Col>
  );
};

export default ModalAdminDetails;
