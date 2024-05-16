"use client";

import React, { ReactNode } from "react";

import { Button } from "antd";
import { subtitleStyleCss } from "@/theme/text_styles";

const CustomOptionButton: React.FC<{
  titleCustomOptionButton: string;
  iconCustomOptionButton: ReactNode;
  textColorCustomOptionButton: string;
  iconColorCustomOptionButton: string;
  backgroundColorCustomOptionButton: string;
  borderColorCustomOptionButton: string;
  handleClickCustomOptionButton: () => void;
}> = ({
  titleCustomOptionButton,
  iconCustomOptionButton,
  textColorCustomOptionButton,
  iconColorCustomOptionButton,
  backgroundColorCustomOptionButton,
  borderColorCustomOptionButton,
  handleClickCustomOptionButton,
}) => {
  return (
    <Button
      onClick={handleClickCustomOptionButton}
      style={{
        width: "100%",
        height: "153px",
        paddingInline: "13px",
        paddingBlock: "7px",
        display: "flex",
        flexFlow: "column wrap",
        alignItems: "center",
        justifyContent: "center",
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
          display: "flex",
          flexFlow: "column wrap",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          wordWrap: "break-word",
          whiteSpace: "break-spaces",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        <div
          style={{
            display: "flex",
            flexFlow: "column wrap",
            color: iconColorCustomOptionButton,
          }}
        >
          {iconCustomOptionButton}
        </div>
        {titleCustomOptionButton}
      </div>
    </Button>
  );
};

export default CustomOptionButton;