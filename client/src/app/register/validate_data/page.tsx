"use client";

import React from "react";

import { Tabs } from "antd";
import { IoIosBusiness } from "react-icons/io";

import RegisterPatientForm from "@/components/register/RegisterPatientForm";

const ValidateDataPage: React.FC = () => {
  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignContent: "center",
        alignItems: "center",
        marginBlock: 31,
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
            marginBottom: 13,
          }}
        >
          <img
            src="/logos/LOGO-BONNADONA.png"
            alt="Logo de Bonnadona"
            style={{ height: 77 }}
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
                icon: <IoIosBusiness />,
                children: <RegisterPatientForm />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ValidateDataPage;
