"use client";

import React, { ReactNode } from "react";

import { Modal, Button, Space } from "antd";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

import CustomSpin from "../custom_spin/CustomSpin";

const CustomModalTwoOptions: React.FC<{
  iconCustomModal: ReactNode;
  titleCustomModal: string;
  subtitleCustomModal: string;
  openCustomModalState: boolean;
  handleCancelCustomModal: () => void;
  handleConfirmCustomModal: (e: React.MouseEvent<any>) => Promise<void>;
  handleClickCustomModal: () => void;
  isSubmittingConfirm: boolean;
}> = ({
  iconCustomModal,
  titleCustomModal,
  subtitleCustomModal,
  openCustomModalState,
  handleCancelCustomModal,
  handleConfirmCustomModal,
  handleClickCustomModal,
  isSubmittingConfirm,
}) => {
  return (
    <div>
      <Modal
        className="custom-modal-two-options"
        width={371}
        style={{
          minWidth: "345px",
        }}
        open={openCustomModalState}
        onOk={handleConfirmCustomModal}
        confirmLoading={isSubmittingConfirm}
        onCancel={handleCancelCustomModal}
        destroyOnClose={true}
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
                ...titleStyleCss,
                textAlign: "center",
              }}
            >
              {titleCustomModal}
            </h2>

            <h4
              className="subtitle-modal-patient"
              style={{
                ...subtitleStyleCss,
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
                  onMouseDown={handleClickCustomModal}
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
                onMouseDown={handleClickCustomModal}
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

export default CustomModalTwoOptions;
