"use client";

import React, { useState } from "react";

import { Steps, Button, message, theme } from "antd";
import { FaUser } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";

import ValidatePatientExistForm from "@/components/register/ValidatePatientExistForm";
import RegisterPatientForm from "@/components/register/RegisterPatientForm";

const steps = [
  {
    title: "Validar",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];

const RegisterPatientPage: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const contentStyle: React.CSSProperties = {
    lineHeight: "260px",
    textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
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
        <Steps current={current} items={items} />
        <div style={contentStyle}>{steps[current].content}</div>
        <div style={{ marginBlock: 31, textAlign: "center" }}>
          {current > 0 && (
            <Button
              style={{
                paddingInline: 22,
                color: "#015E90",
                borderColor: "#015E90",
                fontWeight: "bold",
                borderRadius: 7,
                borderWidth: 1.3,
                marginTop: 7,
              }}
              htmlType="button"
              className="back-button-register-patient"
              onClick={() => prev()}
            >
              Regresar
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              size="middle"
              style={{
                paddingInline: 22,
                borderRadius: 31,
                backgroundColor: "#015E90",
                color: "#f2f2f2",
                marginBlock: 7,
              }}
              htmlType="button"
              className="done-button-register-patient"
              onClick={() => message.success("¡Proceso completado!")}
            >
              Confirmar registro
            </Button>
          )}
          {current < steps.length - 1 && (
            <Button
              size="middle"
              style={{
                paddingInline: 22,
                borderRadius: 31,
                backgroundColor: "#015E90",
                color: "#f2f2f2",
                marginBlock: 7,
              }}
              htmlType="button"
              className="next-button-register-patient"
              onClick={() => next()}
            >
              Siguiente
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisterPatientPage;
