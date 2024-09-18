"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import EpsHeaderLayout from "../header_layout/EpsHeaderLayout";
import EpsCreateRequestContent from "./create_request_content/EpsCreateRequestContent";

const EpsCreateRequestLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<EpsHeaderLayout />}
      customLayoutContent={<EpsCreateRequestContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default EpsCreateRequestLayout;
