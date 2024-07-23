"use client";

import React from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";

const AdminDashboardLayout: React.FC = () => {
  return (
    <CustomDashboardLayout
      // customLayoutBackground="url('/background/back-healt-opacity.jpg')"
      // customLayoutHeader={"CABEZA"}
      // customLayoutContent={"CUERPO"}
      customLayoutFooter={`Clínica Bonnadona © ${new Date().getFullYear()}`}
    />
  );
};

export default AdminDashboardLayout;
