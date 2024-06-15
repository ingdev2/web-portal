"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import PatienHeaderLayout from "../header_layout/PatientHeaderLayout";
import UpdatePersonalDataContent from "./update_personal_data_content/UpdatePersonalDataContent";

const UpdatePersonalDataLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<PatienHeaderLayout />}
      customLayoutContent={<UpdatePersonalDataContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default UpdatePersonalDataLayout;
