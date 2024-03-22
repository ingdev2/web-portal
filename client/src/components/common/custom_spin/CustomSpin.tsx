import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const CustomSpin = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin
        indicator={
          <LoadingOutlined style={{ fontSize: 31, color: "#017DC0" }} spin />
        }
      />
    </div>
  );
};

export default CustomSpin;
