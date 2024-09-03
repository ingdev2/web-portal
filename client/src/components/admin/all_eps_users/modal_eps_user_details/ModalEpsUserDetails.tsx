"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalEpsUserDetails: React.FC<{
  titleDescription: string;
  labelEpsUserName: string;
  selectedEpsUserName: string | undefined;
  labelEpsUserLastName: string;
  selectedEpsUserLastName: string | undefined;
  labelEpsUserIdType: string;
  selectedEpsUserIdType: ReactNode;
  labelEpsUserIdNumber: string;
  selectedEpsUserIdNumber: number | undefined;
  labelEpsUserGender: string;
  selectedEpsUserGender: string | undefined;
  labelEpsUserLevelPosition: string;
  selectedEpsUserLevelPosition: string | undefined;
  labelEpsUserCompanyArea: string;
  selectedEpsUserCompanyArea: string | undefined;
  labelEpsUserCellphone: string;
  selectedEpsUserCellphone: number | string | undefined;
  labelEpsUserEmail: string;
  selectedEpsUserEmail: string | undefined;
}> = ({
  titleDescription,
  labelEpsUserName,
  selectedEpsUserName,
  labelEpsUserLastName,
  selectedEpsUserLastName,
  labelEpsUserIdType,
  selectedEpsUserIdType,
  labelEpsUserIdNumber,
  selectedEpsUserIdNumber,
  labelEpsUserGender,
  selectedEpsUserGender,
  labelEpsUserLevelPosition,
  selectedEpsUserLevelPosition,
  labelEpsUserCompanyArea,
  selectedEpsUserCompanyArea,
  labelEpsUserCellphone,
  selectedEpsUserCellphone,
  labelEpsUserEmail,
  selectedEpsUserEmail,
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
          label={labelEpsUserName}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedEpsUserName}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelEpsUserLastName}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedEpsUserLastName}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelEpsUserIdType}
          style={{ textAlign: "center" }}
          span={5}
        >
          {selectedEpsUserIdType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelEpsUserIdNumber}
          style={{ textAlign: "center" }}
          span={5}
        >
          {selectedEpsUserIdNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelEpsUserGender}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedEpsUserGender}
        </Descriptions.Item>

        {/* FILA 2 */}

        <Descriptions.Item
          label={labelEpsUserLevelPosition}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedEpsUserLevelPosition}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelEpsUserCompanyArea}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedEpsUserCompanyArea}
        </Descriptions.Item>

        {/* FILA 3 */}

        <Descriptions.Item
          label={labelEpsUserCellphone}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedEpsUserCellphone}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelEpsUserEmail}
          style={{ textAlign: "center" }}
          span={8}
        >
          {selectedEpsUserEmail}
        </Descriptions.Item>

        {/* FILA 4 */}
      </Descriptions>
    </Col>
  );
};

export default ModalEpsUserDetails;
