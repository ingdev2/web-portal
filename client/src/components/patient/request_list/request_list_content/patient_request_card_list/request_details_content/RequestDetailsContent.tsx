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
}) => {
  // const {
  //   data: userMedicalReqTypeData,
  //   isLoading: userMedicalReqTypeLoading,
  //   isFetching: userMedicalReqTypeFetching,
  //   error: userMedicalReqTypeError,
  // } = useGetAllMedicalReqTypesQuery(null);

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
          label={labelFilingNumber}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestFilingNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelRequestType}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelRequestStatus}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedRequestStatus}
        </Descriptions.Item>

        <Descriptions.Item
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
        style={{ paddingBlock: "13px" }}
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
