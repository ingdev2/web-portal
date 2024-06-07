"use client";

import React from "react";

import { SelectProps } from "antd";
import CustomSelectTagMultipleOptions from "@/components/common/custom_select_tag_multiple_options/CustomSelectTagMultipleOptions";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";

const FilterByType: React.FC<{
  typesOfRequestLocalState: SelectProps["options"];
  onChange: (selectedTypes: number[]) => void;
  isLoading: boolean;
}> = ({ typesOfRequestLocalState, onChange, isLoading }) => {
  return isLoading ? (
    <CustomSpin />
  ) : (
    <CustomSelectTagMultipleOptions
      placeholderCustomSelect="Filtrar por tipo de solicitud"
      defaultValueCustomSelect={[]}
      optionsCustomSelect={typesOfRequestLocalState}
      onChangeCustomSelect={onChange}
    />
  );
};

export default FilterByType;
