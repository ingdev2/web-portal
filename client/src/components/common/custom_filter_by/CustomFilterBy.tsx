"use client";

import React from "react";

import { SelectProps } from "antd";
import CustomSelectTagMultipleOptions from "@/components/common/custom_select_tag_multiple_options/CustomSelectTagMultipleOptions";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

const CustomFilterBy: React.FC<{
  optionsToFilterLocalState: SelectProps["options"];
  labelOptionToFilterLocalState: string;
  onChange: (selectedTypes: number[]) => void;
  isLoading: boolean;
}> = ({
  optionsToFilterLocalState,
  labelOptionToFilterLocalState,
  onChange,
  isLoading,
}) => {
  return isLoading ? (
    <CustomSpin />
  ) : (
    <CustomSelectTagMultipleOptions
      placeholderCustomSelect={labelOptionToFilterLocalState}
      defaultValueCustomSelect={[]}
      optionsCustomSelect={optionsToFilterLocalState}
      onChangeCustomSelect={onChange}
    />
  );
};

export default CustomFilterBy;
