"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import ReasonForRejectionRegistrationForm from "./register_reason_for_rejection_forms/ReasonForRejectionRegistrationForm";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { IoMdArrowRoundBack } from "react-icons/io";

const RegisterReasonForRejectionContent: React.FC = () => {
  const router = useRouter();

  const [isSubmittingBackPage, setIsSubmittingBackPage] = useState(false);

  return (
    <CustomDashboardLayout
      customLayoutContent={
        <div
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "column wrap",
          }}
        >
          {isSubmittingBackPage ? (
            <CustomSpin />
          ) : (
            <div
              style={{
                display: "flex",
                flexFlow: "column wrap",
                justifyContent: "center",
                alignContent: "flex-start",
                alignItems: "center",
                marginBlock: "7px",
                marginInline: "31px",
              }}
            >
              <Button
                type="link"
                size="large"
                icon={<IoMdArrowRoundBack size={17} />}
                style={{
                  color: "#015E90",
                  fontWeight: "bold",
                  display: "flex",
                  flexFlow: "row wrap",
                  alignContent: "center",
                  alignItems: "center",
                  paddingInline: "7px",
                }}
                htmlType="button"
                className="reason-for-rejection-register-back-button"
                onClick={async () => {
                  try {
                    setIsSubmittingBackPage(true);

                    await router.back();
                  } catch (error) {
                    console.error(error);
                  } finally {
                    setIsSubmittingBackPage(false);
                  }
                }}
              >
                Volver atrás
              </Button>
            </div>
          )}

          <ReasonForRejectionRegistrationForm />
        </div>
      }
    />
  );
};

export default RegisterReasonForRejectionContent;
