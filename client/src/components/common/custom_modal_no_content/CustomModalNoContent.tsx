"use client";

import React, { ReactNode } from "react";

import { Modal } from "antd";

const CustomModalNoContent: React.FC<{
  openCustomModalState: boolean;
  contentCustomModal: ReactNode;
}> = ({ openCustomModalState, contentCustomModal }) => {
  return (
    <div>
      <Modal
        className="custom-modal-no-content"
        width={371}
        style={{
          minWidth: "345px",
        }}
        open={openCustomModalState}
        destroyOnClose={true}
        footer={null}
        maskClosable={false}
        closable={false}
        centered
      >
        <div
          className="content-custom-modal"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            textAlign: "center",
            alignItems: "center",
            marginBlock: "7px",
            marginInline: "7px",
          }}
        >
          {contentCustomModal}
        </div>
      </Modal>
    </div>
  );
};

export default CustomModalNoContent;
