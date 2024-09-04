"use client";

import React from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalReasonForRejectionDetails: React.FC<{
  titleDescription: string;
  labelReasonForRejectionId: string;
  selectedReasonForRejectionId: number | undefined;
  labelReasonForRejectionTitle: string;
  selectedReasonForRejectionTitle: string | undefined;
  labelReasonForRejectionMessage: string;
  selectedReasonForRejectionMessage: string | undefined;
}> = ({
  titleDescription,
  labelReasonForRejectionId,
  selectedReasonForRejectionId,
  labelReasonForRejectionTitle,
  selectedReasonForRejectionTitle,
  labelReasonForRejectionMessage,
  selectedReasonForRejectionMessage,
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
        className="description-reason-for-rejection-details-admin"
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
          label={labelReasonForRejectionId}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedReasonForRejectionId}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelReasonForRejectionTitle}
          style={{ textAlign: "center" }}
          span={10}
        >
          {selectedReasonForRejectionTitle}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelReasonForRejectionMessage}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedReasonForRejectionMessage}
        </Descriptions.Item>

        {/* FILA 2 */}
      </Descriptions>
    </Col>
  );
};

export default ModalReasonForRejectionDetails;
