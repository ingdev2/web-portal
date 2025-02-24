"use client";

import React from "react";

import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetCompanyAreaByNameQuery } from "@/redux/apis/company_area/companyAreaApi";

import { CompanyAreaEnum } from "@/utils/enums/company_area.enum";

import { useGetAverageResponseTimeData } from "../../statistics/users_medical_req/users_medical_req_data";

const AverageResponseTime: React.FC = () => {
  const { data: companyAreaDivaData } = useGetCompanyAreaByNameQuery({
    name: CompanyAreaEnum.DIVA_EXTERNAL_CONSULTATION,
  });
  const { data: companyAreaArleneData } = useGetCompanyAreaByNameQuery({
    name: CompanyAreaEnum.ARLENE_EXTERNAL_CONSULTATION,
  });

  const { averageResponseTime: averageResponseDivaTime } =
    useGetAverageResponseTimeData(companyAreaDivaData?.id);

  const { averageResponseTime: averageResponseArleneTime } =
    useGetAverageResponseTimeData(companyAreaArleneData?.id);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
        margin: "0px",
        paddingBlock: "13px",
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
        Tiempo de respuesta promedio <b>{companyAreaDivaData?.name}:</b>&nbsp;
        <br />
        <b style={{ fontSize: "22px", color: "#137A2B" }}>
          {averageResponseDivaTime}
        </b>
      </h3>

      <h3
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          paddingTop: "13px",
          margin: "0px",
        }}
      >
        Tiempo de respuesta promedio <b>{companyAreaArleneData?.name}:</b>&nbsp;
        <br />
        <b style={{ fontSize: "22px", color: "#137A2B" }}>
          {averageResponseArleneTime}
        </b>
      </h3>
    </div>
  );
};

export default AverageResponseTime;
