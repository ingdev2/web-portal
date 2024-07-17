"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { UserRolType } from "../../../../../api/src/utils/enums/user_roles.enum";

import { Tabs } from "antd";
import { IoIosBusiness } from "react-icons/io";

import EpsRegistrationForm from "@/components/register/eps/EpsRegistrationForm";

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
      className="register-user-eps-page"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="background-page-register-eps"
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
        className="content-page-eps"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
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
                className: "eps-card-register",
                key: "1",
                label: "Creación de usuario EPS",
                icon: <IoIosBusiness />,
                children: <EpsRegistrationForm />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPatientPage;
