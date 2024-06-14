"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const FamiliarDetailsModalContent: React.FC<{
  titleDescription: string;
  labelFamiliarName: string;
  selectedFamiliarName: string;
  labelFamiliarLastName: string;
  selectedFamiliarLastName: string;
  labelFamiliarIdType: string;
  selectedFamiliarIdType: ReactNode;
  labelFamiliarIdNumber: string;
  selectedFamiliarIdNumber: number;
  labelFamiliarRelationshipWithPatient: string;
  selectedFamiliarRelationshipWithPatient: ReactNode;
  labelFamiliarCellphone: string;
  selectedFamiliarCellphone: number;
  labelFamiliarEmail: string;
  selectedFamiliarEmail: string;
  labelFamiliarWhatsapp: string;
  selectedFamiliarWhatsapp: number;
}> = ({
  titleDescription,
  labelFamiliarName,
  selectedFamiliarName,
  labelFamiliarLastName,
  selectedFamiliarLastName,
  labelFamiliarIdType,
  selectedFamiliarIdType,
  labelFamiliarIdNumber,
  selectedFamiliarIdNumber,
  labelFamiliarRelationshipWithPatient,
  selectedFamiliarRelationshipWithPatient,
  labelFamiliarCellphone,
  selectedFamiliarCellphone,
  labelFamiliarEmail,
  selectedFamiliarEmail,
  labelFamiliarWhatsapp,
  selectedFamiliarWhatsapp,
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
        className="description1-familiar-details"
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
          label={labelFamiliarName}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedFamiliarName}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{
            padding: "13px 13px",
          }}
          label={labelFamiliarLastName}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedFamiliarLastName}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{
            padding: "13px 13px",
          }}
          label={labelFamiliarIdType}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedFamiliarIdType}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{
            padding: "13px 13px",
          }}
          label={labelFamiliarIdNumber}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedFamiliarIdNumber}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{
            padding: "7px",
            margin: "7px",
          }}
          label={labelFamiliarRelationshipWithPatient}
          style={{
            textAlign: "center",
          }}
          span={3}
        >
          {selectedFamiliarRelationshipWithPatient}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions
        className="description2-familiar-details"
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
          label={labelFamiliarEmail}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedFamiliarEmail}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelFamiliarCellphone}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedFamiliarCellphone || (
            <b style={{ color: "#960202" }}>No aplica</b>
          )}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelFamiliarWhatsapp}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedFamiliarWhatsapp || (
            <b style={{ color: "#960202" }}>No aplica</b>
          )}
        </Descriptions.Item>
      </Descriptions>
    </Col>
  );
};

export default FamiliarDetailsModalContent;
