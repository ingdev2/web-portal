"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useSearchParams } from "next/navigation";

import ResetPasswordFormAdmins from "@/components/reset_password/ResetPasswordFormAdmins";

import { setPasswordResetToken } from "@/redux/features/common/modal/modalSlice";

const ResetPasswordAdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  const verifyToken = searchParams?.getAll("token");

  const passwordResetToken = useAppSelector(
    (state) => state.modal.passwordResetToken
  );

  useEffect(() => {
    if (verifyToken && !passwordResetToken) {
      dispatch(setPasswordResetToken(verifyToken));
    }
  }, [verifyToken, passwordResetToken]);

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

        <div>
          <ResetPasswordFormAdmins />
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordAdminPage;
