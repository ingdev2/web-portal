"use client";

import React from "react";

import { Divider, Row } from "antd";
import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllMedicalReqUsersByAreaQuery } from "@/redux/apis/medical_req/medicalReqApi";

import { RequirementStatusEnum } from "@/utils/enums/requirement_status.enum";
import { CompanyAreaEnum } from "@/utils/enums/company_area.enum";

const StatusItems: React.FC = () => {
  const {
    data: allMedicalReqExtConsultationAreaData,
    isLoading: allMedicalReqUsersExtConsultationLoading,
    isFetching: allMedicalReqUsersExtConsultationFetching,
    error: allMedicalReqUsersExtConsultationError,
  } = useGetAllMedicalReqUsersByAreaQuery({
    companyAreaNames: [
      CompanyAreaEnum.DIVA_EXTERNAL_CONSULTATION,
      CompanyAreaEnum.ARLENE_EXTERNAL_CONSULTATION,
    ],
  });

  const { data: allMedicalReqExtConsultationAreaStatusCreatedData } =
    useGetAllMedicalReqUsersByAreaQuery({
      companyAreaNames: [
        CompanyAreaEnum.DIVA_EXTERNAL_CONSULTATION,
        CompanyAreaEnum.ARLENE_EXTERNAL_CONSULTATION,
      ],
      status: RequirementStatusEnum.CREATED,
    });

  const { data: allMedicalReqExtConsultationAreaStatusVisualizedData } =
    useGetAllMedicalReqUsersByAreaQuery({
      companyAreaNames: [
        CompanyAreaEnum.DIVA_EXTERNAL_CONSULTATION,
        CompanyAreaEnum.ARLENE_EXTERNAL_CONSULTATION,
      ],
      status: RequirementStatusEnum.VISUALIZED,
    });

  const { data: allMedicalReqExtConsultationAreaStatusUnderReviewData } =
    useGetAllMedicalReqUsersByAreaQuery({
      companyAreaNames: [
        CompanyAreaEnum.DIVA_EXTERNAL_CONSULTATION,
        CompanyAreaEnum.ARLENE_EXTERNAL_CONSULTATION,
      ],
      status: RequirementStatusEnum.UNDER_REVIEW,
    });

  const { data: allMedicalReqExtConsultationAreaStatusDeliveredData } =
    useGetAllMedicalReqUsersByAreaQuery({
      companyAreaNames: [
        CompanyAreaEnum.DIVA_EXTERNAL_CONSULTATION,
        CompanyAreaEnum.ARLENE_EXTERNAL_CONSULTATION,
      ],
      status: RequirementStatusEnum.DELIVERED,
    });

  const { data: allMedicalReqExtConsultationAreaStatusRejectedData } =
    useGetAllMedicalReqUsersByAreaQuery({
      companyAreaNames: [
        CompanyAreaEnum.DIVA_EXTERNAL_CONSULTATION,
        CompanyAreaEnum.ARLENE_EXTERNAL_CONSULTATION,
      ],
      status: RequirementStatusEnum.REJECTED,
    });

  const { data: allMedicalReqExtConsultationAreaStatusExpiredData } =
    useGetAllMedicalReqUsersByAreaQuery({
      companyAreaNames: [
        CompanyAreaEnum.DIVA_EXTERNAL_CONSULTATION,
        CompanyAreaEnum.ARLENE_EXTERNAL_CONSULTATION,
      ],
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
          {allMedicalReqExtConsultationAreaData?.length || 0}
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
        <b>{allMedicalReqExtConsultationAreaStatusCreatedData?.length || 0}</b>
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
        <b>
          {allMedicalReqExtConsultationAreaStatusVisualizedData?.length || 0}
        </b>
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
        <b>
          {allMedicalReqExtConsultationAreaStatusUnderReviewData?.length || 0}
        </b>
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
        <b>
          {allMedicalReqExtConsultationAreaStatusDeliveredData?.length || 0}
        </b>
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
        <b>{allMedicalReqExtConsultationAreaStatusRejectedData?.length || 0}</b>
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
        <b>{allMedicalReqExtConsultationAreaStatusExpiredData?.length || 0} </b>
      </h4>
    </Row>
  );
};

export default StatusItems;
