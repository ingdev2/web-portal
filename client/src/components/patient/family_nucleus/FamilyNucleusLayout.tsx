"use client";

import React from "react";

import CustomLayout from "@/components/common/custom_layout/CustomLayout";
import PatienHeaderLayout from "../header_layout/PatientHeaderLayout";
import FamilyNucleusContent from "./family_nucleus_content/FamilyNucleusContent";

const FamilyNucleusLayout: React.FC = () => {
  return (
    <CustomLayout
      customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      customLayoutHeader={<PatienHeaderLayout />}
      customLayoutContent={<FamilyNucleusContent />}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    ></CustomLayout>
  );
};

export default FamilyNucleusLayout;
