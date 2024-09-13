"use client";

import React from "react";

import { Col, Row } from "antd";

import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllPatientsQuery } from "@/redux/apis/users/usersApi";

const TotalPatients: React.FC = () => {
  const {
    data: allPatientsData,
    isLoading: allPatientsLoading,
    isFetching: allPatientsFetching,
    error: allPatientsError,
    refetch: refecthAllPatients,
  } = useGetAllPatientsQuery(null);

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
          {allPatientsData?.length || 0}
          &nbsp;paciente(s) Bonnadona
        </b>
      </h2>
    </Row>
  );
};

export default TotalPatients;
