"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import EpsHeaderLayout from "../header_layout/EpsHeaderLayout";
import EpsRequestListContent from "./request_list_content/EpsRequestListContent";

const EpsRequestListLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<EpsHeaderLayout />}
      customLayoutContent={<EpsRequestListContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default EpsRequestListLayout;
