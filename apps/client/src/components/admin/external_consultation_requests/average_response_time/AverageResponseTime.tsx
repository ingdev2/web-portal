"use client";

import React from "react";

import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetCompanyAreaByNameQuery } from "@/redux/apis/company_area/companyAreaApi";

import { CompanyAreaEnum } from "@/utils/enums/company_area.enum";

import { useGetAverageResponseTimeData } from "../../statistics/users_medical_req/users_medical_req_data";

const AverageResponseTime: React.FC = () => {
  const { data: companyAreaData } = useGetCompanyAreaByNameQuery({
    name: CompanyAreaEnum.EXTERNAL_CONSULTATION_DEPARTMENT,
  });

  const { averageResponseTime } = useGetAverageResponseTimeData(
    companyAreaData?.id
  );

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        margin: "0px",
        paddingBlock: "22px",
      }}
    >
      <h3
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          padding: "0px",
          margin: "0px",
        }}
      >
        Tiempo de respuesta promedio <b>{companyAreaData?.name}:</b>&nbsp;
        <br />
        <b style={{ fontSize: "22px", color: "#137A2B" }}>
          {averageResponseTime}
        </b>
      </h3>
    </div>
  );
};

export default AverageResponseTime;
