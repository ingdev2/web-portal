"use client";

import React, { ReactNode } from "react";

import { Modal, Button, Space } from "antd";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

import CustomSpin from "../custom_spin/CustomSpin";

const CustomModalTwoOptions: React.FC<{
  iconCustomModal: ReactNode;
  titleCustomModal: string;
  subtitleCustomModal: ReactNode;
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
    <Modal
      className="custom-modal-two-options"
      width={"45%"}
      style={{
        minWidth: "345px",
        paddingBlock: "31px",
        margin: "0px",
      }}
      open={openCustomModalState}
      onOk={handleConfirmCustomModal}
      confirmLoading={isSubmittingConfirm}
      onCancel={handleCancelCustomModal}
      destroyOnClose={true}
      maskClosable={true}
      footer={null}
      centered
    >
      <div
        className="content-custom-modal-two-options"
        style={{
          display: "flex",
          flexFlow: "column wrap",
          textAlign: "center",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
          marginBlock: "13px",
          marginInline: "7px",
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
            size="large"
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
                  paddingInline: 54,
                  borderRadius: 31,
                  backgroundColor: "#015E90",
                  color: "#f2f2f2",
                }}
                htmlType="submit"
                onClick={handleConfirmCustomModal}
                onMouseDown={handleClickCustomModal}
              >
                SÍ
              </Button>
            )}

            <Button
              key="cancel-button-custom-modal"
              className="cancel-button-custom-modal"
              size="large"
              style={{
                paddingInline: 54,
                borderRadius: 31,
                backgroundColor: "#8C1111",
                color: "#f2f2f2",
              }}
              onClick={handleCancelCustomModal}
              onMouseDown={handleClickCustomModal}
            >
              NO
            </Button>
          </Space>
        </Space>
      </div>
    </Modal>
  );
};

export default CustomModalTwoOptions;
