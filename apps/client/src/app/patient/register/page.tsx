"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { UserRolType } from "../../../../../../apps/api/src/utils/enums/user_roles.enum";

import { Tabs } from "antd";
import { FaUser } from "react-icons/fa";

import ValidatePatientExistForm from "@/components/register/patient/ValidatePatientExistForm";

const RegisterPatientPage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user.role === UserRolType.PATIENT
    ) {
      redirect("/patient/homepage");
    }
    if (status === "authenticated" && session?.user.role === UserRolType.EPS) {
      redirect("/eps/homepage");
    }
  }, [status]);

  return (
    <div
      className="register-user-page"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignContent: "center",
        alignItems: "center",
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
            tabBarGutter={13}
            tabBarStyle={{ marginBottom: 13 }}
            items={[
              {
                className: "patient-card-register",
                key: "1",
                label: "Paciente",
                icon: <FaUser />,
                children: <ValidatePatientExistForm />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPatientPage;
