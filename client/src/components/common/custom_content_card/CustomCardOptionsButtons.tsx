"use client";

import React, { ReactNode } from "react";

import { Button, Space } from "antd";

const CustomCardOptionsButtons: React.FC<{
  backgroundColorButtonOptionDelete?: string;
  onClickButtonOptionDelete?: () => void;
  iconButtonOptionDelete?: ReactNode;
  titleButtonOptionDelete?: string;
  backgroundColorButtonOptionDetails?: string;
  onClickButtonOptionDetails?: () => void;
  iconButtonOptionDetails?: ReactNode;
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
          className="delete-custom-list-card-button"
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
          className="view-details-custom-list-card-button"
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

export default CustomCardOptionsButtons;
