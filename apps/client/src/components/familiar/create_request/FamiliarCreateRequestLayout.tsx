"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import FamiliarHeaderLayout from "../header_layout/FamiliarHeaderLayout";
import FamiliarCreateRequestContent from "./create_request_content/FamiliarCreateRequestContent";

const FamiliarCreateRequestLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<FamiliarHeaderLayout />}
      customLayoutContent={<FamiliarCreateRequestContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default FamiliarCreateRequestLayout;
