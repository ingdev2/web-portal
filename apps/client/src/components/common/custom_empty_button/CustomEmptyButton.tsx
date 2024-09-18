"use client";

import React from "react";

import { Empty, Button } from "antd";

const CustomEmptyButton: React.FC<{
  titleCustomEmpty: string;
  buttonCustomEmpty: string;
  handleClickCustomEmpty: () => void;
}> = ({ titleCustomEmpty, buttonCustomEmpty, handleClickCustomEmpty }) => (
  <Empty
    image={Empty.PRESENTED_IMAGE_SIMPLE}
    description={<span>{titleCustomEmpty}</span>}
  >
    <Button
      type="primary"
      size="large"
      className="custom-empty-button"
      style={{
        paddingInline: 31,
        borderRadius: 31,
        backgroundColor: "#015E90",
        color: "#f2f2f2",
      }}
      onClick={handleClickCustomEmpty}
    >
      {buttonCustomEmpty}
    </Button>
  </Empty>
);

export default CustomEmptyButton;
