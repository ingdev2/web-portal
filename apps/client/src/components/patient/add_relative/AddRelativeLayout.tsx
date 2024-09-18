"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import PatientHeaderLayout from "../header_layout/PatientHeaderLayout";
import AddRelativeContent from "./add_relative_content/AddRelativeContent";

const AddRelativeLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<PatientHeaderLayout />}
      customLayoutContent={<AddRelativeContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default AddRelativeLayout;
