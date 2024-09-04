"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import EpsHeaderLayout from "../header_layout/EpsHeaderLayout";
import EpsHomepageContent from "./homepage_content/EpsHomepageContent";

const EpsHomeLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<EpsHeaderLayout />}
      customLayoutContent={<EpsHomepageContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default EpsHomeLayout;
