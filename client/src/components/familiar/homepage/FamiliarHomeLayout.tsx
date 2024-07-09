"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import FamiliarHeaderLayout from "../header_layout/FamiliarHeaderLayout";
import FamiliarHomepageContent from "./homepage_content/FamiliarHomepageContent";

const FamiliarHomeLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<FamiliarHeaderLayout />}
      customLayoutContent={<FamiliarHomepageContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default FamiliarHomeLayout;
