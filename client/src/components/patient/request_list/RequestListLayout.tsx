"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import PatienHeaderLayout from "../header_layout/PatientHeaderLayout";
import RequestListContent from "./request_list_content/RequestListContent";

const RequestListLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<PatienHeaderLayout />}
      customLayoutContent={<RequestListContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default RequestListLayout;
