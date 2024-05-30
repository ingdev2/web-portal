"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const RequestDetailsContent: React.FC<{
  titleDescription1: string;
  labelFilingNumber: string;
  selectedRequestFilingNumber: string;
  labelRequestType: string;
  selectedRequestType: ReactNode;
  labelRequestStatus: string;
  selectedRequestStatus: ReactNode;
  labelResponseDocuments: string;
  selectedRequestResponseDocuments: ReactNode;
  labelUserComments: string;
  selectedRequestUserComments: string;
  labelRequestResponse: string;
  selectedRequestResponse: ReactNode;
  labelReasonsForRejection: string;
  selectedRequestReasonsForRejection: ReactNode;
}> = ({
  titleDescription1,
  labelFilingNumber,
  selectedRequestFilingNumber,
  labelRequestType,
  selectedRequestType,
  labelRequestStatus,
  selectedRequestStatus,
  labelResponseDocuments,
  selectedRequestResponseDocuments,
  labelUserComments,
  selectedRequestUserComments,
  labelRequestResponse,
  selectedRequestResponse,
  labelReasonsForRejection,
  selectedRequestReasonsForRejection,
}) => {
  return (
    <Col
      style={{
        display: "flex",
        flexFlow: "column wrap",
        width: "100%",
      }}
    >
      <Descriptions
        className="description1-request-details"
        title={titleDescription1}
        layout="horizontal"
        size="middle"
        style={{ paddingBlock: "7px" }}
        labelStyle={{
          ...titleStyleCss,
        }}
        contentStyle={{
          ...subtitleStyleCss,
        }}
        bordered
      >
        <Descriptions.Item
          contentStyle={{
            padding: "13px 13px",
          }}
          label={labelFilingNumber}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestFilingNumber}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{
            padding: "13px 13px",
          }}
          label={labelRequestType}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestType}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{
            padding: "13px 13px",
          }}
          label={labelRequestStatus}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestStatus}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{
            padding: "13px",
          }}
          label={labelResponseDocuments}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestResponseDocuments}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        className="description2-request-details"
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
      >
        <Descriptions.Item
          label={labelRequestResponse}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestResponse}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelReasonsForRejection}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestReasonsForRejection}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserComments}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestUserComments}
        </Descriptions.Item>
      </Descriptions>
    </Col>
  );
};

export default RequestDetailsContent;
