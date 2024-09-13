"use client";

import React from "react";

import { Empty } from "antd";

const CustomEmpty: React.FC<{
  titleCustomEmpty: string;
}> = ({ titleCustomEmpty }) => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={<span>{titleCustomEmpty}</span>}
  />
);

export default CustomEmpty;
