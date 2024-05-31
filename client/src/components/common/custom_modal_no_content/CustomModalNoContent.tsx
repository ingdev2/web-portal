"use client";

import React, { ReactNode } from "react";

import { Modal } from "antd";

const CustomModalNoContent: React.FC<{
  openCustomModalState: boolean;
  maskClosableCustomModal: boolean;
  closableCustomModal: boolean;
  contentCustomModal: ReactNode;
  handleCancelCustomModal?: () => void;
}> = ({
  openCustomModalState,
  maskClosableCustomModal,
  closableCustomModal,
  contentCustomModal,
  handleCancelCustomModal,
}) => {
  return (
    <div>
      <Modal
        className="custom-modal-no-content"
        width={"72%"}
        style={{
          minWidth: "345px",
          paddingBlock: "31px",
        }}
        open={openCustomModalState}
        onCancel={handleCancelCustomModal}
        maskClosable={maskClosableCustomModal}
        closable={closableCustomModal}
        destroyOnClose={true}
        footer={null}
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
