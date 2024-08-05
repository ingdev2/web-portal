"use client";

import React, { ReactNode } from "react";

import { Space } from "antd";

const CustomCardDescription: React.FC<{
  descriptionCard1: string;
  tagComponentCard1: ReactNode;
  descriptionCard2?: string;
  tagComponentCard2?: ReactNode;
  descriptionCard3?: string;
  descriptionCard4?: string;
  itemCard1?: ReactNode;
  itemCard2?: ReactNode;
}> = ({
  descriptionCard1,
  tagComponentCard1,
  descriptionCard2,
  tagComponentCard2,
  descriptionCard3,
  descriptionCard4,
  itemCard1,
  itemCard2,
}) => {
  return (
    <Space size={"small"} direction="vertical">
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          margin: 0,
          paddingTop: 0,
          paddingBottom: 7,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "37px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {descriptionCard1}

          {tagComponentCard1}
        </div>

        <div
          style={{
            width: "100%",
            height: "37px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {descriptionCard2}

          {tagComponentCard2}
        </div>

        <div
          style={{
            width: "100%",
            height: "37px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {descriptionCard3} <b>{itemCard1}</b>
        </div>

        <div
          style={{
            width: "100%",
            height: "37px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {descriptionCard4}
          <b>{itemCard2}</b>
        </div>
      </div>
    </Space>
  );
};

export default CustomCardDescription;
