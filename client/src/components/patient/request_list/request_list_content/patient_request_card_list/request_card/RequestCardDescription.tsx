"use client";

import React, { ReactNode } from "react";

import { Space } from "antd";

const RequestCardDescription: React.FC<{
  descriptionCard1: string;
  tagComponentType: ReactNode;
  descriptionCard2: string;
  tagComponentStatus: ReactNode;
  descriptionCard3?: string;
  itemDateOfAdmission: ReactNode;
  descriptionCard4?: string;
  itemAnswerDate: ReactNode;
}> = ({
  descriptionCard1,
  tagComponentType,
  descriptionCard2,
  tagComponentStatus,
  descriptionCard3,
  itemDateOfAdmission,
  descriptionCard4,
  itemAnswerDate,
}) => {
  return (
    <Space size={"small"} direction="vertical">
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          margin: 0,
          padding: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "31px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: "2px",
          }}
        >
          {descriptionCard1}

          {tagComponentType}
        </div>

        <div
          style={{
            width: "100%",
            height: "31px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: "2px",
          }}
        >
          {descriptionCard2}

          {tagComponentStatus}
        </div>

        <div
          style={{
            width: "100%",
            height: "31px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: "2px",
          }}
        >
          {descriptionCard3} <b>{itemDateOfAdmission}</b>
        </div>

        <div
          style={{
            width: "100%",
            height: "31px",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-between",
            alignItems: "center",
            paddingBlock: "2px",
          }}
        >
          {descriptionCard4}
          <b>{itemAnswerDate}</b>
        </div>
      </div>
    </Space>
  );
};

export default RequestCardDescription;
