"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import PatientHeaderLayout from "../header_layout/PatientHeaderLayout";
import PatientCreateRequestContent from "./create_request_content/PatientCreateRequestContent";

const PatientCreateRequestLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<PatientHeaderLayout />}
      customLayoutContent={<PatientCreateRequestContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default PatientCreateRequestLayout;
