"use client";

import React from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalEpsCompanyDetails: React.FC<{
  titleDescription: string;
  labelEpsCompanyNit: string;
  selectedEpsCompanyNit: string | undefined;
  labelEpsCompanyName: string;
  selectedEpsCompanyName: string | undefined;
  labelEpsCompanyEmail: string;
  selectedEpsCompanyEmail: string | undefined;
}> = ({
  titleDescription,
  labelEpsCompanyNit,
  selectedEpsCompanyNit,
  labelEpsCompanyName,
  selectedEpsCompanyName,
  labelEpsCompanyEmail,
  selectedEpsCompanyEmail,
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
        className="description-eps-company-details-admin"
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
          label={labelEpsCompanyNit}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedEpsCompanyNit}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelEpsCompanyName}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedEpsCompanyName}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelEpsCompanyEmail}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedEpsCompanyEmail}
        </Descriptions.Item>

        {/* FILA 2 */}
      </Descriptions>
    </Col>
  );
};

export default ModalEpsCompanyDetails;
