"use client";

import React, { ReactNode } from "react";

import { Button, Space } from "antd";

const RequestCardOptionsButtons: React.FC<{
  backgroundColorButtonOptionDelete?: string;
  onClickButtonOptionDelete: () => void;
  iconButtonOptionDelete: ReactNode;
  titleButtonOptionDelete?: string;
  backgroundColorButtonOptionDetails?: string;
  onClickButtonOptionDetails: () => void;
  iconButtonOptionDetails: ReactNode;
  titleButtonOptionDetails?: string;
}> = ({
  backgroundColorButtonOptionDelete,
  onClickButtonOptionDelete,
  iconButtonOptionDelete,
  titleButtonOptionDelete,
  backgroundColorButtonOptionDetails,
  onClickButtonOptionDetails,
  iconButtonOptionDetails,
  titleButtonOptionDetails,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "flex-start",
        paddingTop: "7px",
        margin: "0px",
      }}
    >
      <Space size={"middle"}>
        <Button
          className="delete-medical-req-button"
          size="middle"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: backgroundColorButtonOptionDelete,
            color: "#F7F7F7",
          }}
          onClick={onClickButtonOptionDelete}
          icon={iconButtonOptionDelete}
        >
          {titleButtonOptionDelete}
        </Button>

        <Button
          className="view-details-medical-req-button"
          size="middle"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            alignContent: "center",
            justifyContent: "center",
            backgroundColor: backgroundColorButtonOptionDetails,
            color: "#F7F7F7",
          }}
          onClick={onClickButtonOptionDetails}
          icon={iconButtonOptionDetails}
        >
          {titleButtonOptionDetails}
        </Button>
      </Space>
    </div>
  );
};

export default RequestCardOptionsButtons;
