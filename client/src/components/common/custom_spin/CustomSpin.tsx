import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function CustomSpin() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 31 }} spin />} />
    </div>
  );
}
