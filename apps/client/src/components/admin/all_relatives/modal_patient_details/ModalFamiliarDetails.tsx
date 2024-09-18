"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalFamiliarDetails: React.FC<{
  titleDescription: string;
  labelFamiliarName: string;
  selectedFamiliarName: string | undefined;
  labelFamiliarLastName: string;
  selectedFamiliarLastName: string | undefined;
  labelFamiliarIdType: string;
  selectedFamiliarIdType: ReactNode;
  labelFamiliarIdNumber: string;
  selectedFamiliarIdNumber: number | undefined;
  labelFamiliarGender: string;
  selectedFamiliarGender: string | undefined;
  labelFamiliarRelWithPatient: string;
  selectedFamiliarRelWithPatient: string | undefined;
  labelFamiliarIdNumberPatient: string;
  selectedFamiliarIdNumberPatient: number | undefined;
  labelFamiliarCellphone: string;
  selectedFamiliarCellphone: number | string | undefined;
  labelFamiliarWhatsApp: string;
  selectedFamiliarWhatsApp: number | string | undefined;
  labelFamiliarEmail: string;
  selectedFamiliarEmail: string | undefined;
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
  labelFamiliarGender,
  selectedFamiliarGender,
  labelFamiliarRelWithPatient,
  selectedFamiliarRelWithPatient,
  labelFamiliarIdNumberPatient,
  selectedFamiliarIdNumberPatient,
  labelFamiliarCellphone,
  selectedFamiliarCellphone,
  labelFamiliarWhatsApp,
  selectedFamiliarWhatsApp,
  labelFamiliarEmail,
  selectedFamiliarEmail,
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
        className="description-familiar-details-admin"
        layout="vertical"
        size="middle"
        style={{ width: "100%", paddingBlock: "7px", margin: "0px" }}
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
          label={labelFamiliarName}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedFamiliarName}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelFamiliarLastName}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedFamiliarLastName}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelFamiliarIdType}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedFamiliarIdType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelFamiliarIdNumber}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedFamiliarIdNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelFamiliarGender}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedFamiliarGender}
        </Descriptions.Item>

        {/* FILA 2 */}

        <Descriptions.Item
          label={labelFamiliarRelWithPatient}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedFamiliarRelWithPatient}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelFamiliarIdNumberPatient}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedFamiliarIdNumberPatient}
        </Descriptions.Item>

        {/* FILA 3 */}

        <Descriptions.Item
          label={labelFamiliarCellphone}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedFamiliarCellphone}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelFamiliarWhatsApp}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedFamiliarWhatsApp}
        </Descriptions.Item>

        {/* FILA 4 */}

        <Descriptions.Item
          label={labelFamiliarEmail}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedFamiliarEmail}
        </Descriptions.Item>

        {/* FILA 5 */}
      </Descriptions>
    </Col>
  );
};

export default ModalFamiliarDetails;
