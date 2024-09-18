"use client";

import React from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

const ModalAuditLogDetails: React.FC<{
  titleDescription: string;
  labelAuditLogId: string;
  selectedAuditLogId: string | undefined;
  labelUserNameAuditLog: string;
  selectedUserNameAuditLog: string | undefined;
  labelUserIdNumberAuditLog: string;
  selectedUserIdNumberAuditLog: string | undefined;
  labelUserEmailAuditLog: string;
  selectedUserEmailAuditLog: string | undefined;
  labelUserRoleAuditLog: string;
  selectedUserRoleAuditLog: string | undefined;
  labelActionTypeAuditLog: string;
  selectedActionTypeAuditLog: string | undefined;
  labelQueryTypeAuditLog: string;
  selectedQueryTypeAuditLog: string | undefined;
  labelModuleNameAuditLog: string;
  selectedModuleNameAuditLog: string | undefined;
  labelModuleRecordIdAuditLog: string;
  selectedModuleRecordIdAuditLog: string | undefined;
  labelIpAddressAuditLog: string;
  selectedIpAddressAuditLog: string | undefined;
  labelIsMobileAuditLog: string;
  selectedIsMobileAuditLog: string | undefined;
  labelBrowserVersionAuditLog: string;
  selectedBrowserVersionAuditLog: string | undefined;
  labelOperatingSystemAuditLog: string;
  selectedOperatingSystemAuditLog: string | undefined;
  labelDateOfAuditLog: string;
  selectedDateOfAuditLog: string | undefined;
  labelHourOfAuditLog: string;
  selectedHourOfAuditLog: string | undefined;
}> = ({
  titleDescription,
  labelAuditLogId,
  selectedAuditLogId,
  labelUserNameAuditLog,
  selectedUserNameAuditLog,
  labelUserIdNumberAuditLog,
  selectedUserIdNumberAuditLog,
  labelUserEmailAuditLog,
  selectedUserEmailAuditLog,
  labelUserRoleAuditLog,
  selectedUserRoleAuditLog,
  labelActionTypeAuditLog,
  selectedActionTypeAuditLog,
  labelQueryTypeAuditLog,
  selectedQueryTypeAuditLog,
  selectedModuleNameAuditLog,
  labelModuleNameAuditLog,
  labelModuleRecordIdAuditLog,
  selectedModuleRecordIdAuditLog,
  labelIpAddressAuditLog,
  selectedIpAddressAuditLog,
  labelIsMobileAuditLog,
  selectedIsMobileAuditLog,
  labelBrowserVersionAuditLog,
  selectedBrowserVersionAuditLog,
  labelOperatingSystemAuditLog,
  selectedOperatingSystemAuditLog,
  labelDateOfAuditLog,
  selectedDateOfAuditLog,
  labelHourOfAuditLog,
  selectedHourOfAuditLog,
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
        className="description-audit-log-details-admin"
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
          label={labelAuditLogId}
          style={{ textAlign: "center" }}
          span={12}
        >
          {selectedAuditLogId}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelUserNameAuditLog}
          style={{ textAlign: "center" }}
          span={8}
        >
          {selectedUserNameAuditLog}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserRoleAuditLog}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedUserRoleAuditLog}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserIdNumberAuditLog}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedUserIdNumberAuditLog}
        </Descriptions.Item>

        {/* FILA 2 */}

        <Descriptions.Item
          label={labelUserEmailAuditLog}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedUserEmailAuditLog}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelActionTypeAuditLog}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedActionTypeAuditLog}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelQueryTypeAuditLog}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedQueryTypeAuditLog}
        </Descriptions.Item>

        {/* FILA 3 */}

        <Descriptions.Item
          label={labelModuleNameAuditLog}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedModuleNameAuditLog}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelModuleRecordIdAuditLog}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedModuleRecordIdAuditLog}
        </Descriptions.Item>

        {/* FILA 4 */}

        <Descriptions.Item
          label={labelIpAddressAuditLog}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedIpAddressAuditLog}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelIsMobileAuditLog}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedIsMobileAuditLog}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelBrowserVersionAuditLog}
          style={{ textAlign: "center" }}
          span={4}
        >
          {selectedBrowserVersionAuditLog}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelOperatingSystemAuditLog}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedOperatingSystemAuditLog}
        </Descriptions.Item>

        {/* FILA 5 */}

        <Descriptions.Item
          label={labelDateOfAuditLog}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedDateOfAuditLog}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelHourOfAuditLog}
          style={{ textAlign: "center" }}
          span={6}
        >
          {selectedHourOfAuditLog}
        </Descriptions.Item>
        {/* FILA 6 */}
      </Descriptions>
    </Col>
  );
};

export default ModalAuditLogDetails;
