"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalPatientDetails: React.FC<{
  titleDescription: string;
  labelPatientName: string;
  selectedPatientName: string | undefined;
  labelPatientIdType: string;
  selectedPatientIdType: ReactNode;
  labelPatientIdNumber: string;
  selectedPatientIdNumber: number | undefined;
  labelPatientGender: string;
  selectedPatientGender: string | undefined;
  labelPatientBirthdate: string;
  selectedPatientBirthdate: string | undefined;
  labelPatientAffiliationEps: string;
  selectedPatientAffiliationEps: string | undefined;
  labelPatientWhatsApp: string;
  selectedPatientWhatsApp: number | string | undefined;
  labelPatientCellphone: string;
  selectedPatientCellphone: number | string | undefined;
  labelPatientEmail: string;
  selectedPatientEmail: string | undefined;
  labelPatientResidenceAddress: string;
  selectedPatientResidenceAddress: string | undefined;
  labelPatientRelatives: string;
  selectedPatientRelatives: ReactNode;
}> = ({
  titleDescription,
  labelPatientName,
  selectedPatientName,
  labelPatientIdType,
  selectedPatientIdType,
  labelPatientIdNumber,
  selectedPatientIdNumber,
  labelPatientGender,
  selectedPatientGender,
  labelPatientBirthdate,
  selectedPatientBirthdate,
  labelPatientAffiliationEps,
  selectedPatientAffiliationEps,
  labelPatientWhatsApp,
  selectedPatientWhatsApp,
  labelPatientCellphone,
  selectedPatientCellphone,
  labelPatientEmail,
  selectedPatientEmail,
  labelPatientResidenceAddress,
  selectedPatientResidenceAddress,
  labelPatientRelatives,
  selectedPatientRelatives,
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
        className="description-patient-details-admin"
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
          label={labelPatientName}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedPatientName}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelPatientIdType}
          style={{ textAlign: "center" }}
          span={6}
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

        <Descriptions.Item
          label={labelPatientGender}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedPatientGender}
        </Descriptions.Item>

        {/* FILA 2 */}

        <Descriptions.Item
          label={labelPatientBirthdate}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedPatientBirthdate}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelPatientAffiliationEps}
          style={{ textAlign: "center" }}
          span={8}
        >
          {selectedPatientAffiliationEps}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelPatientWhatsApp}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedPatientWhatsApp}
        </Descriptions.Item>

        {/* FILA 3 */}

        <Descriptions.Item
          label={labelPatientCellphone}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedPatientCellphone}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelPatientEmail}
          style={{ textAlign: "center" }}
          span={8}
        >
          {selectedPatientEmail}
        </Descriptions.Item>

        {/* FILA 4 */}

        <Descriptions.Item
          label={labelPatientResidenceAddress}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedPatientResidenceAddress}
        </Descriptions.Item>

        {/* FILA 5 */}

        <Descriptions.Item
          label={labelPatientRelatives}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedPatientRelatives}
        </Descriptions.Item>

        {/* FILA 6 */}
      </Descriptions>
    </Col>
  );
};

export default ModalPatientDetails;
