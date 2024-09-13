"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const EpsRequestDetailsModalContent: React.FC<{
  titleDescription: string;
  labelFilingNumber: string;
  selectedRequestFilingNumber: string;
  labelRequestType: string;
  selectedRequestType: ReactNode;
  labelRequestStatus: string;
  selectedRequestStatus: ReactNode;
  labelResponseDocuments: string;
  selectedRequestResponseDocuments: ReactNode;
  labelDocumentExpirationDate: string;
  selectedRequestDocumentExpirationDate: ReactNode;
  labelPatientName: string;
  selectedPatientName: string;
  labelPatientIdType: string;
  selectedPatientIdType: string;
  labelPatientIdNumber: string;
  selectedPatientIdNumber: number;
  labelUserComments: string;
  selectedRequestUserComments: string;
  labelRequestResponse: string;
  selectedRequestResponse: ReactNode;
  labelReasonsForRejection: string;
  selectedRequestReasonsForRejection: ReactNode;
}> = ({
  titleDescription,
  labelFilingNumber,
  selectedRequestFilingNumber,
  labelRequestType,
  selectedRequestType,
  labelRequestStatus,
  selectedRequestStatus,
  labelResponseDocuments,
  selectedRequestResponseDocuments,
  labelDocumentExpirationDate,
  selectedRequestDocumentExpirationDate,
  labelPatientName,
  selectedPatientName,
  labelPatientIdType,
  selectedPatientIdType,
  labelPatientIdNumber,
  selectedPatientIdNumber,
  labelUserComments,
  selectedRequestUserComments,
  labelRequestResponse,
  selectedRequestResponse,
  labelReasonsForRejection,
  selectedRequestReasonsForRejection,
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
        flexFlow: "column wrap",
        padding: "2px",
        margin: "0px",
      }}
    >
      <Descriptions
        className="description1-request-details-eps"
        title={titleDescription}
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
        column={3}
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
            padding: "7px",
            margin: "7px",
          }}
          label={labelResponseDocuments}
          style={{
            textAlign: "center",
          }}
          span={3}
        >
          {selectedRequestResponseDocuments}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{
            padding: "7px",
            margin: "7px",
          }}
          label={labelDocumentExpirationDate}
          style={{
            textAlign: "center",
          }}
          span={3}
        >
          {selectedRequestDocumentExpirationDate}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        className="description-patient-info-request-details-eps"
        layout="vertical"
        size="middle"
        style={{ paddingTop: "31px" }}
        labelStyle={{
          ...titleStyleCss,
        }}
        contentStyle={{
          ...subtitleStyleCss,
        }}
        bordered
        column={3}
      >
        <Descriptions.Item
          label={labelPatientName}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedPatientName}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelPatientIdType}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedPatientIdType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelPatientIdNumber}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedPatientIdNumber}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        className="description2-request-details-eps"
        layout="vertical"
        size="middle"
        style={{ paddingTop: "31px", paddingBottom: "13px" }}
        labelStyle={{
          ...titleStyleCss,
        }}
        contentStyle={{
          ...subtitleStyleCss,
        }}
        bordered
        column={3}
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

export default EpsRequestDetailsModalContent;
