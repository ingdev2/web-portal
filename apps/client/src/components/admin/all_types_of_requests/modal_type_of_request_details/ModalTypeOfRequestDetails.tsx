"use client";

import React from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalTypeOfRequestDetails: React.FC<{
  titleDescription: string;
  labelTypeOfRequestId: string;
  selectedTypeOfRequestId: number | undefined;
  labelTypeOfRequestName: string;
  selectedTypeOfRequestName: string | undefined;
}> = ({
  titleDescription,
  labelTypeOfRequestId,
  selectedTypeOfRequestId,
  labelTypeOfRequestName,
  selectedTypeOfRequestName,
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
        className="description-type-of-request-details-admin"
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
          label={labelTypeOfRequestId}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedTypeOfRequestId}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelTypeOfRequestName}
          style={{ textAlign: "center" }}
          span={10}
        >
          {selectedTypeOfRequestName}
        </Descriptions.Item>

        {/* FILA 1 */}
      </Descriptions>
    </Col>
  );
};

export default ModalTypeOfRequestDetails;
