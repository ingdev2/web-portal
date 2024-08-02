"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import AdminLoginForm from "@/components/auth/admin/AdminLoginForm";

import { Tabs } from "antd";
import { GrUserAdmin } from "react-icons/gr";

import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

const AdminsLoginPage: React.FC = () => {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  const isPageLoadingState = useAppSelector(
    (state) => state.modal.isPageLoading
  );

  useEffect(() => {
    if (isPageLoadingState && status === "unauthenticated") {
      dispatch(setIsPageLoading(false));
    }
  }, [status, isPageLoadingState]);

  return (
    <div
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
        className="content-page-login-admin"
        style={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          paddingTop: "31px",
          zIndex: 1,
        }}
      >
        <Tabs
          type="card"
          centered
          tabBarGutter={13}
          tabBarStyle={{
            marginBottom: 13,
          }}
          items={[
            {
              className: "admin-card-login",
              key: "1",
              label: "Administradores",
              icon: <GrUserAdmin />,
              children: <AdminLoginForm />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default AdminsLoginPage;
