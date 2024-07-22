"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AdminRolType } from "../../../../../api/src/utils/enums/admin_roles.enum";

import { Tabs } from "antd";
import { IoIosBusiness } from "react-icons/io";

import AdminRegistrationForm from "@/components/register/admin/AdminRegistrationForm";

const RegisterPatientPage: React.FC = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (
      status === "authenticated" &&
      session?.user.role === AdminRolType.SUPER_ADMIN
    ) {
      redirect("/admin/dashboard");
    }
    if (
      status === "authenticated" &&
      session?.user.role === AdminRolType.ADMIN
    ) {
      redirect("/admin/dashboard");
    }
  }, [status]);

  return (
    <div
      className="register-admin-page"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="background-page-register-admin"
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
        className="content-page-admin"
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
                className: "admin-card-register",
                key: "1",
                label: "Creación de usuario Administrador",
                icon: <IoIosBusiness />,
                children: <AdminRegistrationForm />,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPatientPage;
