"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import PatientUserLoginForm from "@/components/auth/patient/PatientUserLoginForm";
import EpsUserLoginForm from "@/components/auth/eps/EpsUserLoginForm";
import FamiliarUserLoginForm from "@/components/auth/relatives/FamiliarUserLoginForm";

import { Tabs } from "antd";
import { FaUser } from "react-icons/fa";
import { IoIosBusiness } from "react-icons/io";
import { MdOutlineFamilyRestroom } from "react-icons/md";

import { setIsPageLoading } from "@/redux/features/common/modal/modalSlice";

const UsersLoginPage: React.FC = () => {
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
        className="content-page"
        style={{
          display: "flex",
          flexFlow: "column wrap",
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

        <Tabs
          type="card"
          centered
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
            {
              className: "familiar-card-login",
              key: "3",
              children: <FamiliarUserLoginForm />,
              label: "Familiares",
              icon: <MdOutlineFamilyRestroom />,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default UsersLoginPage;
