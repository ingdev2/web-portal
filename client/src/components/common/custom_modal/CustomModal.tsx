"use client";

import React, { ReactNode } from "react";

import { Modal, Button, Space } from "antd";

import CustomSpin from "../custom_spin/CustomSpin";

const CustomModal: React.FC<{
  iconCustomModal: ReactNode;
  titleCustomModal: string;
  subtitleCustomModal: string;
  openCustomModalState: boolean;
  handleCancelCustomModal: () => void;
  handleConfirmCustomModal: (e: React.MouseEvent<any>) => Promise<void>;
  isSubmittingConfirm: boolean;
}> = ({
  iconCustomModal,
  titleCustomModal,
  subtitleCustomModal,
  openCustomModalState,
  handleCancelCustomModal,
  handleConfirmCustomModal,
  isSubmittingConfirm,
}) => {
  return (
    <div>
      <Modal
        className="custom-modal"
        open={openCustomModalState}
        onOk={handleConfirmCustomModal}
        confirmLoading={isSubmittingConfirm}
        onCancel={handleCancelCustomModal}
        destroyOnClose={true}
        width={371}
        footer={null}
        maskClosable={true}
        centered
      >
        <div
          className="content-custom-modal"
          style={{
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",
            marginBlock: 13,
            marginInline: 7,
          }}
        >
          <Space
            direction="vertical"
            size="small"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div style={{ marginBlock: 2 }}>{iconCustomModal}</div>

            <h2
              className="title-custom-modal"
              style={{
                fontWeight: "bold",
                lineHeight: 1.3,
                marginBlock: 2,
              }}
            >
              {titleCustomModal}
            </h2>

            <h4
              className="subtitle-modal-patient"
              style={{
                fontWeight: "normal",
                lineHeight: 1.3,
                marginBlock: 7,
              }}
            >
              {subtitleCustomModal}
            </h4>

            <Space
              direction="horizontal"
              size="middle"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignContent: "center",
                marginTop: 13,
              }}
            >
              {isSubmittingConfirm ? (
                <div
                  style={{
                    marginInline: 54,
                  }}
                >
                  <CustomSpin />
                </div>
              ) : (
                <Button
                  key={"confirm-button-custom-modal"}
                  className="confirm-button-custom-modal"
                  size="large"
                  style={{
                    paddingInline: 31,
                    borderRadius: 31,
                    backgroundColor: "#015E90",
                    color: "#f2f2f2",
                  }}
                  htmlType="submit"
                  onClick={handleConfirmCustomModal}
                >
                  Confirmar
                </Button>
              )}

              <Button
                key="cancel-button-custom-modal"
                className="cancel-button-custom-modal"
                size="large"
                style={{
                  paddingInline: 31,
                  borderRadius: 31,
                  backgroundColor: "#8C1111",
                  color: "#f2f2f2",
                }}
                onClick={handleCancelCustomModal}
              >
                Cancelar
              </Button>
            </Space>
          </Space>
        </div>
      </Modal>
    </div>
  );
};

export default CustomModal;
