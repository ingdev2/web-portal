"use client";

import React from "react";

import { Button, Row } from "antd";
import { LuInspect } from "react-icons/lu";
import { GrSend } from "react-icons/gr";

const ModalActionButtons: React.FC<{}> = ({}) => {
  return (
    <Row justify={"center"} align={"middle"}>
      <Button
        className="send-to-another-area-button"
        size="large"
        style={{
          backgroundColor: "#015E90",
          color: "#F7F7F7",
        }}
        onClick={() => {}}
      >
        <div
          style={{
            minWidth: "137px",
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <LuInspect size={17} />
          &nbsp;Gestionar solicitud
        </div>
      </Button>
    </Row>
  );
};

export default ModalActionButtons;
