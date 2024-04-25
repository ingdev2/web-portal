"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Card, Col } from "antd";

import CustomResultOneButton from "@/components/common/custom_result_one_button/CustomResultOneButton";

const RegistrationSuccessPage: React.FC = () => {
  const router = useRouter();

  const authMethodPatientState = useAppSelector(
    (state) => state.patient.authentication_method
  );
  const passwordPatientState = useAppSelector(
    (state) => state.patient.password
  );

  const [isSubmittingGoToLogin, setIsSubmittingGoToLogin] = useState(false);

  useEffect(() => {
    if (!authMethodPatientState && !passwordPatientState) {
      router.back();
    }
  }, [, authMethodPatientState, passwordPatientState]);

  const handleGoToLogin = async () => {
    try {
      setIsSubmittingGoToLogin(true);

      await new Promise((resolve) => setTimeout(resolve, 700));

      await router.replace("/login", {
        scroll: false,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingGoToLogin(false);
    }
  };

  return (
    <div
      className="validate-data-page"
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
            marginBottom: 22,
          }}
        >
          <img
            src="/logos/LOGO-BONNADONA.png"
            alt="Logo de Bonnadona"
            style={{ height: 77 }}
          />
        </div>
        <div>
          <Card
            className="registration-success-content"
            style={{
              width: "max-content",
              height: "max-content",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fcfcfc",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              marginBottom: 31,
              marginInline: 31,
            }}
          >
            <Col
              xs={24}
              md={24}
              lg={24}
              style={{
                padding: "0 2px",
                width: "100vw",
                maxWidth: 321,
              }}
            >
              <CustomResultOneButton
                key={"registration-success-custom-result"}
                statusTypeResult={"success"}
                titleCustomResult="¡Registro Existoso!"
                subtitleCustomResult="Su cuenta ha sido activada correctamente, lo invitamos a ingresar a la plataforma."
                handleClickCustomResult={handleGoToLogin}
                isSubmittingButton={isSubmittingGoToLogin}
                textButtonCustomResult="Ingresar al portal"
              />
            </Col>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccessPage;
