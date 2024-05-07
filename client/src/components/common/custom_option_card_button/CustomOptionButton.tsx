"use client";

import React, { ReactNode } from "react";

import { Button } from "antd";

const CustomOptionButton: React.FC<{
  titleCustomOptionButton: string;
  iconCustomOptionButton: ReactNode;
  textColorCustomOptionButton: string;
  backgroundColorCustomOptionButton: string;
  borderColorCustomOptionButton: string;
  handleClickCustomOptionButton: () => void;
}> = ({
  titleCustomOptionButton: titleCustomCardButton,
  iconCustomOptionButton: iconCustomCardButton,
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
        paddingInline: "13px",
        paddingBlock: "13px",
        display: "flex",
        flexFlow: "column nowrap",
        alignItems: "center",
        backgroundColor: backgroundColorCustomOptionButton,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.4)",
        borderColor: borderColorCustomOptionButton,
        borderWidth: "2px",
        color: textColorCustomOptionButton,
      }}
      size="large"
    >
      <div
        style={{
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
        {iconCustomCardButton}
        {titleCustomCardButton}
      </div>
    </Button>
  );
};

export default CustomOptionButton;
