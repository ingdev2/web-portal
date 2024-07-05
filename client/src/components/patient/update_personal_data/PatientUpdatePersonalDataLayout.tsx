"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import PatientHeaderLayout from "../header_layout/PatientHeaderLayout";
import PatientUpdatePersonalDataContent from "./update_personal_data_content/PatientUpdatePersonalDataContent";

const PatientUpdatePersonalDataLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<PatientHeaderLayout />}
      customLayoutContent={<PatientUpdatePersonalDataContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default PatientUpdatePersonalDataLayout;
