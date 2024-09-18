"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import PatientHeaderLayout from "../header_layout/PatientHeaderLayout";
import PatientHomepageContent from "./homepage_content/PatientHomepageContent";

const PatientHomeLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<PatientHeaderLayout />}
      customLayoutContent={<PatientHomepageContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default PatientHomeLayout;
