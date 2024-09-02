"use client";

import React from "react";

import { Row } from "antd";

import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllRelativesQuery } from "@/redux/apis/relatives/relativesApi";

const TotalRelatives: React.FC = () => {
  const {
    data: allRelativesData,
    isLoading: allRelativesLoading,
    isFetching: allRelativesFetching,
    error: allRelativesError,
    refetch: refecthAllRelatives,
  } = useGetAllRelativesQuery(null);

  return (
    <Row
      align="middle"
      justify={"center"}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "row wrap",
        marginBlock: "7px",
      }}
    >
      <h2
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
        }}
      >
        Total de&nbsp;
        <b>
          {allRelativesData?.length || 0}
          &nbsp;familiar(es) de pacientes Bonnadona
        </b>
      </h2>
    </Row>
  );
};

export default TotalRelatives;
