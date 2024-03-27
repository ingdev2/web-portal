"use client";

import React, { useEffect, useState } from "react";
import ButtonAuth from "@/components/auth/ButtonAuth";

import { Card } from "antd";

const HomePage = () => {
  return (
    <div
      className="HomePage"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Card
        style={{
          width: 270,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fcfcfc",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2
          className="title-modal"
          style={{
            textAlign: "center",
            fontWeight: "bold",
            lineHeight: 1.3,
            marginBottom: 4,
          }}
        >
          Logo de Proced
        </h2>

        <ButtonAuth></ButtonAuth>
      </Card>
    </div>
  );
};

export default HomePage;
