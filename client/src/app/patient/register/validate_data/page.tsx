"use client";

import React from "react";

import { Tabs } from "antd";
import { RiPassValidLine } from "react-icons/ri";

import ValidatePatientData from "@/components/register/ValidatePatientData";

const ValidateDataPage: React.FC = () => {
  const onChange = () => {};

  return (
    <div
      className="validate-data-page"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignContent: "center",
        alignItems: "center",
        marginInline: "13px",
      }}
    >
      <div
        className="background-page"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: "url('/background/back-healt.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />
      <div
        className="content-page"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            paddingBlock: "13px",
          }}
        >
          <img
            src="/logos/LOGO-BONNADONA.png"
            alt="Logo de Bonnadona"
            style={{ height: 88 }}
          />
        </div>
        <div>
          <Tabs
            onChange={onChange}
            type="card"
            centered
            tabBarGutter={13}
            tabBarStyle={{ marginBottom: 13 }}
            items={[
              {
                className: "validate-data-card-register",
                key: "1",
                label: "Validar Datos Del Paciente",
                icon: <RiPassValidLine />,
                children: <ValidatePatientData />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ValidateDataPage;
