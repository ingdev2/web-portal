"use-client";

import React from "react";

import { Select } from "antd";
import type { SelectProps } from "antd";

const CustomSelectTagMultipleOptions: React.FC<{
  placeholderCustomSelect: string;
  optionsCustomSelect: SelectProps["options"];
  defaultValueCustomSelect: number[];
  onChangeCustomSelect: (value: number[]) => void;
}> = ({
  placeholderCustomSelect,
  optionsCustomSelect,
  defaultValueCustomSelect,
  onChangeCustomSelect,
}) => (
  <Select
    mode="multiple"
    placeholder={placeholderCustomSelect}
    options={optionsCustomSelect}
    defaultValue={defaultValueCustomSelect}
    onChange={onChangeCustomSelect}
    style={{ width: "100%", paddingInline: "7px", paddingBlock: "7px" }}
    allowClear
  />
);

export default CustomSelectTagMultipleOptions;
