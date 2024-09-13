"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import FamiliarHeaderLayout from "../header_layout/FamiliarHeaderLayout";
import FamiliarUpdatePersonalDataContent from "./update_personal_data_content/FamiliarUpdatePersonalDataContent";

const FamiliarUpdatePersonalDataLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<FamiliarHeaderLayout />}
      customLayoutContent={<FamiliarUpdatePersonalDataContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default FamiliarUpdatePersonalDataLayout;
