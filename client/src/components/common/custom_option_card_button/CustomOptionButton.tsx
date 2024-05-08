"use client";

import React, { ReactNode } from "react";

import { Button } from "antd";
import { subtitleStyleCss } from "@/theme/text_styles";

const CustomOptionButton: React.FC<{
  titleCustomOptionButton: string;
  iconCustomOptionButton: ReactNode;
  textColorCustomOptionButton: string;
  backgroundColorCustomOptionButton: string;
  borderColorCustomOptionButton: string;
  handleClickCustomOptionButton: () => void;
}> = ({
  titleCustomOptionButton,
  iconCustomOptionButton,
  textColorCustomOptionButton,
  backgroundColorCustomOptionButton,
  borderColorCustomOptionButton,
  handleClickCustomOptionButton,
}) => {
  return (
    <Button
      onClick={handleClickCustomOptionButton}
      style={{
        width: "100%",
        height: "100%",
        paddingInline: "7px",
        paddingBlock: "7px",
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        backgroundColor: backgroundColorCustomOptionButton,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        borderColor: borderColorCustomOptionButton,
        borderWidth: "3.1px",
        color: textColorCustomOptionButton,
      }}
      size="middle"
    >
      <div
        style={{
          ...subtitleStyleCss,
          marginBottom: "2px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
          maxWidth: "100%",
          wordWrap: "break-word",
          whiteSpace: "break-spaces",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {iconCustomOptionButton}
        {titleCustomOptionButton}
      </div>
    </Button>
  );
};

export default CustomOptionButton;
