"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalEpsDetails: React.FC<{
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
  labelAdminCellphone: string;
  selectedAdminCellphone: number | string | undefined;
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
  labelAdminCellphone,
  selectedAdminCellphone,
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
        className="description-eps-details-admin"
        layout="vertical"
        size="middle"
        style={{ paddingBlock: "7px" }}
        labelStyle={{
          ...titleStyleCss,
        }}
        contentStyle={{
          ...subtitleStyleCss,
        }}
        bordered
        column={14}
      >
        <Descriptions.Item
          label={labelAdminName}
          style={{ textAlign: "center" }}
          span={7}
        >
          {selectedAdminName}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAdminLastName}
          style={{ textAlign: "center" }}
          span={7}
        >
          {selectedAdminLastName}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelAdminIdNumber}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedAdminIdNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAdminIdType}
          style={{ textAlign: "center" }}
          span={8}
        >
          {selectedAdminIdType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAdminGender}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedAdminGender}
        </Descriptions.Item>

        {/* FILA 2 */}

        <Descriptions.Item
          label={labelAdminLevelPosition}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedAdminLevelPosition}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAdminCompanyArea}
          style={{ textAlign: "center" }}
          span={10}
        >
          {selectedAdminCompanyArea}
        </Descriptions.Item>

        {/* FILA 3 */}

        <Descriptions.Item
          label={labelAdminCellphone}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedAdminCellphone}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAdminEmail}
          style={{ textAlign: "center" }}
          span={10}
        >
          {selectedAdminEmail}
        </Descriptions.Item>

        {/* FILA 4 */}
      </Descriptions>
    </Col>
  );
};

export default ModalEpsDetails;
