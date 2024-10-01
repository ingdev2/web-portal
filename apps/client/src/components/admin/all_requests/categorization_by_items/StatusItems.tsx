"use client";

import React from "react";

import { Divider, Row } from "antd";
import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllMedicalReqUsersQuery } from "@/redux/apis/medical_req/medicalReqApi";

import { RequirementStatusEnum } from "../../../utils/enums/requirement_status.enum";

const StatusItems: React.FC = () => {
  const {
    data: allMedicalReqUsersData,
    isLoading: allMedicalReqUsersLoading,
    isFetching: allMedicalReqUsersFetching,
    error: allMedicalReqUsersError,
  } = useGetAllMedicalReqUsersQuery({});

  const { data: allMedicalReqStatusCreatedData } =
    useGetAllMedicalReqUsersQuery({
      status: RequirementStatusEnum.CREATED,
    });

  const { data: allMedicalReqStatusVisualizedData } =
    useGetAllMedicalReqUsersQuery({
      status: RequirementStatusEnum.VISUALIZED,
    });

  const { data: allMedicalReqStatusUnderReviewData } =
    useGetAllMedicalReqUsersQuery({
      status: RequirementStatusEnum.UNDER_REVIEW,
    });

  const { data: allMedicalReqStatusDeliveredData } =
    useGetAllMedicalReqUsersQuery({
      status: RequirementStatusEnum.DELIVERED,
    });

  const { data: allMedicalReqStatusRejectedData } =
    useGetAllMedicalReqUsersQuery({
      status: RequirementStatusEnum.REJECTED,
    });

  const { data: allMedicalReqStatusExpiredData } =
    useGetAllMedicalReqUsersQuery({
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
          {allMedicalReqUsersData?.length || 0}
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
        <b>{allMedicalReqStatusCreatedData?.length || 0}</b>
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
        <b>{allMedicalReqStatusVisualizedData?.length || 0}</b>
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
        <b>{allMedicalReqStatusUnderReviewData?.length || 0}</b>
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
        <b>{allMedicalReqStatusDeliveredData?.length || 0}</b>
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
        <b>{allMedicalReqStatusRejectedData?.length || 0}</b>
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
        <b>{allMedicalReqStatusExpiredData?.length || 0} </b>
      </h4>
    </Row>
  );
};

export default StatusItems;
