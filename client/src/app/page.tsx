"use client";

import React from "react";
import ButtonAuth from "@/components/auth/ButtonAuth";
import { Card, Col } from "antd";

const HomePage = () => {
  return (
    <div
      className="homepage"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
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
        className="content-homepage"
        style={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          alignContent: "center",
          alignItems: "center",
          marginBlock: 31,
        }}
      >
        <div
          className="bonna-logo"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <img
            src="/logos/LOGO-BONNADONA.png"
            alt="Logo de Bonnadona"
            style={{ height: 88 }}
          />
        </div>

        <div>
          <Card
            className="content-card"
            style={{
              width: "100%",
              maxWidth: 321,
              height: "min-content",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fcfcfc",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              marginBottom: 31,
              padding: 2,
            }}
          >
            <Col xs={24} md={32} style={{ padding: "0 7px" }}>
              <div
                className="proced-logo"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBlock: 13,
                }}
              >
                <img
                  src="/logos/LOGO-HORIZONTAL-TRANS-130-X-130-PX.png"
                  alt="Logo de Proced"
                  style={{ height: 62 }}
                />
              </div>

              <div className="text-card">
                <h3
                  className="presentation-text"
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    lineHeight: 1.3,
                  }}
                >
                  Portal web para pacientes, familiares y entidades aliadas.
                </h3>
                <h3
                  className="presentation-text"
                  style={{
                    textAlign: "center",
                    fontWeight: "normal",
                    lineHeight: 1.3,
                  }}
                >
                  Trámites en línea para hacer más fácil y ágil tus solicitudes
                  con nosotros, a un solo clic de distancia.
                </h3>
                <ButtonAuth />
              </div>
            </Col>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
