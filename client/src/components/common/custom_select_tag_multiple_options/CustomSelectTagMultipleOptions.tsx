"use-client";

import React from "react";

import { Select } from "antd";
import type { SelectProps } from "antd";

const CustomSelectTagMultipleOptions: React.FC<{
  placeholderCustomSelect: string;
  optionsCustomSelect: SelectProps["options"];
  defaultValueCustomSelect: string[];
}> = ({
  placeholderCustomSelect,
  optionsCustomSelect,
  defaultValueCustomSelect,
}) => {
  return (
    <Select
      mode="multiple"
      placeholder={placeholderCustomSelect}
      options={optionsCustomSelect}
      defaultValue={defaultValueCustomSelect}
      style={{ width: "100%", paddingInline: "7px", paddingBlock: "7px" }}
      allowClear
    />
  );
};

export default CustomSelectTagMultipleOptions;
