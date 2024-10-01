"use client";

import React from "react";

import { Divider, Row } from "antd";
import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllMedicalReqUsersToLegalAreaQuery } from "@/redux/apis/medical_req/medicalReqApi";

import { RequirementStatusEnum } from "../../../utils/enums/requirement_status.enum";

const StatusItems: React.FC = () => {
  const {
    data: allMedicalReqLegalAreaData,
    isLoading: allMedicalReqUsersLoading,
    isFetching: allMedicalReqUsersFetching,
    error: allMedicalReqUsersError,
  } = useGetAllMedicalReqUsersToLegalAreaQuery({});

  const { data: allMedicalReqLegalAreaStatusCreatedData } =
    useGetAllMedicalReqUsersToLegalAreaQuery({
      status: RequirementStatusEnum.CREATED,
    });

  const { data: allMedicalReqLegalAreaStatusVisualizedData } =
    useGetAllMedicalReqUsersToLegalAreaQuery({
      status: RequirementStatusEnum.VISUALIZED,
    });

  const { data: allMedicalReqLegalAreaStatusUnderReviewData } =
    useGetAllMedicalReqUsersToLegalAreaQuery({
      status: RequirementStatusEnum.UNDER_REVIEW,
    });

  const { data: allMedicalReqLegalAreaStatusDeliveredData } =
    useGetAllMedicalReqUsersToLegalAreaQuery({
      status: RequirementStatusEnum.DELIVERED,
    });

  const { data: allMedicalReqLegalAreaStatusRejectedData } =
    useGetAllMedicalReqUsersToLegalAreaQuery({
      status: RequirementStatusEnum.REJECTED,
    });

  const { data: allMedicalReqLegalAreaStatusExpiredData } =
    useGetAllMedicalReqUsersToLegalAreaQuery({
      status: RequirementStatusEnum.EXPIRED,
    });

  return (
    <Row
      align="middle"
      style={{
        height: "100%",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        marginBlock: "7px",
      }}
    >
      <h2
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          marginBlock: "7px",
          paddingInline: "22px",
        }}
      >
        Total de&nbsp;
        <b>
          {allMedicalReqLegalAreaData?.length || 0}
          &nbsp;solicitud(es)
        </b>
      </h2>

      <h4
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          marginBlock: "7px",
          color: "#013B5A",
        }}
      >
        Creadas:&nbsp;
        <b>{allMedicalReqLegalAreaStatusCreatedData?.length || 0}</b>
      </h4>

      <Divider
        type="vertical"
        style={{
          height: "22px",
          borderWidth: "1.3px",
          borderColor: "#8C11117F",
        }}
      />

      <h4
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          marginBlock: "7px",
          color: "#9960B0",
        }}
      >
        Visualizadas:&nbsp;
        <b>{allMedicalReqLegalAreaStatusVisualizedData?.length || 0}</b>
      </h4>

      <Divider
        type="vertical"
        style={{
          height: "22px",
          borderWidth: "1.3px",
          borderColor: "#8C11117F",
        }}
      />

      <h4
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          marginBlock: "7px",
          color: "#D4AC0D",
        }}
      >
        En Revisión:&nbsp;
        <b>{allMedicalReqLegalAreaStatusUnderReviewData?.length || 0}</b>
      </h4>

      <Divider
        type="vertical"
        style={{
          height: "22px",
          borderWidth: "1.3px",
          borderColor: "#8C11117F",
        }}
      />

      <h4
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          marginBlock: "7px",
          color: "#137A2B",
        }}
      >
        Docs. Entregados:&nbsp;
        <b>{allMedicalReqLegalAreaStatusDeliveredData?.length || 0}</b>
      </h4>

      <Divider
        type="vertical"
        style={{
          height: "22px",
          borderWidth: "1.3px",
          borderColor: "#8C11117F",
        }}
      />

      <h4
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          marginBlock: "7px",
          color: "#8C1111",
        }}
      >
        Rechazadas:&nbsp;
        <b>{allMedicalReqLegalAreaStatusRejectedData?.length || 0}</b>
      </h4>

      <Divider
        type="vertical"
        style={{
          height: "22px",
          borderWidth: "1.3px",
          borderColor: "#8C11117F",
        }}
      />

      <h4
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          marginBlock: "7px",
          color: "#BA3400",
        }}
      >
        Expiradas:&nbsp;
        <b>{allMedicalReqLegalAreaStatusExpiredData?.length || 0} </b>
      </h4>
    </Row>
  );
};

export default StatusItems;
