"use client";

import React from "react";

import PatientUserLoginForm from "@/components/auth/PatientUserLoginForm";
import EpsUserLoginForm from "@/components/auth/EpsUserLoginForm";

import { Tabs } from "antd";
import { FaUser } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";

const UsersLoginPage: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignContent: "center",
        alignItems: "center",
        // paddingBlock: "31px",
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
            paddingBlock: "22px",
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
            type="card"
            centered
            style={{
              display: "flex",
              flexDirection: "column",
            }}
            tabBarGutter={13}
            tabBarStyle={{ marginBottom: 13 }}
            items={[
              {
                className: "patient-card-login",
                key: "1",
                label: "Pacientes",
                icon: <FaUser />,
                children: <PatientUserLoginForm />,
              },
              {
                className: "eps-card-login",
                key: "2",
                children: <EpsUserLoginForm />,
                label: "Eps",
                icon: <IoIosBusiness />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default UsersLoginPage;
