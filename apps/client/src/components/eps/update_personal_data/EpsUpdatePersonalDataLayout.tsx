"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import EpsHeaderLayout from "../header_layout/EpsHeaderLayout";
import EpsUpdatePersonalDataContent from "./update_personal_data_content/EpsUpdatePersonalDataContent";

const EpsUpdatePersonalDataLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<EpsHeaderLayout />}
      customLayoutContent={<EpsUpdatePersonalDataContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default EpsUpdatePersonalDataLayout;
