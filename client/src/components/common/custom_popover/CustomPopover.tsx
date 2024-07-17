"use client";

import React from "react";

import { Popover } from "antd";
import { subtitleStyleCss } from "@/theme/text_styles";
import { FaInfoCircle } from "react-icons/fa";

const CustomPopover: React.FC<{
  titleCustomPopover: string;
  contentCustomPopover: string;
}> = ({ titleCustomPopover, contentCustomPopover }) => {
  const content = (
    <div
      style={{
        width: "270px",
        display: "flex",
        flexFlow: "column wrap",
        textAlign: "center",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        margin: "0px",
        padding: "0px",
      }}
    >
      <p style={subtitleStyleCss}>{contentCustomPopover}</p>
    </div>
  );

  return (
    <Popover
      title={titleCustomPopover}
      content={content}
      style={{
        margin: "0px",
        padding: "0px",
      }}
      trigger={"hover"}
    >
      <div style={{ margin: "0px", padding: "0px" }}>
        {<FaInfoCircle color="#A7BAB7" size={"17px"} />}
      </div>
    </Popover>
  );
};

export default CustomPopover;
