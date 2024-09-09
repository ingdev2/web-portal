"use client";

import React from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalCompanyAreaDetails: React.FC<{
  titleDescription: string;
  labelCompanyAreaId: string;
  selectedCompanyAreaId: number | undefined;
  labelCompanyAreaName: string;
  selectedCompanyAreaName: string | undefined;
}> = ({
  titleDescription,
  labelCompanyAreaId,
  selectedCompanyAreaId,
  labelCompanyAreaName,
  selectedCompanyAreaName,
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
        className="description-company-area-details-admin"
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
          label={labelCompanyAreaId}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedCompanyAreaId}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelCompanyAreaName}
          style={{ textAlign: "center" }}
          span={10}
        >
          {selectedCompanyAreaName}
        </Descriptions.Item>

        {/* FILA 1 */}
      </Descriptions>
    </Col>
  );
};

export default ModalCompanyAreaDetails;
