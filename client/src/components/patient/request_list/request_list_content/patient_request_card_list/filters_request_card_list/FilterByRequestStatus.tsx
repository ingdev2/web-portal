"use client";

import React from "react";

import { SelectProps } from "antd";
import CustomSelectTagMultipleOptions from "@/components/common/custom_select_tag_multiple_options/CustomSelectTagMultipleOptions";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

const FilterByStatus: React.FC<{
  statusOfRequestLocalState: SelectProps["options"];
  onChange: (selectedStatus: number[]) => void;
  isLoading: boolean;
}> = ({ statusOfRequestLocalState, onChange, isLoading }) => {
  return isLoading ? (
    <CustomSpin />
  ) : (
    <CustomSelectTagMultipleOptions
      placeholderCustomSelect="Filtrar por estado de solicitud"
      defaultValueCustomSelect={[]}
      optionsCustomSelect={statusOfRequestLocalState}
      onChangeCustomSelect={onChange}
    />
  );
};

export default FilterByStatus;
