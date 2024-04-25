"use client";

import React from "react";

import { Button, Result } from "antd";
import { ResultStatusType } from "antd/es/result";
import CustomSpin from "../custom_spin/CustomSpin";

const CustomResultOneButton: React.FC<{
  statusTypeResult: ResultStatusType;
  titleCustomResult: string;
  subtitleCustomResult: string;
  handleClickCustomResult: () => void;
  isSubmittingButton: boolean;
  textButtonCustomResult: string;
}> = ({
  statusTypeResult,
  titleCustomResult,
  subtitleCustomResult,
  handleClickCustomResult,
  isSubmittingButton,
  textButtonCustomResult,
}) => {
  return (
    <Result
      className="custom-result-one-button"
      status={statusTypeResult}
      title={titleCustomResult}
      subTitle={subtitleCustomResult}
      style={{
        maxWidth: "max-content",
        height: "max-content",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBlock: 13,
        paddingInline: 0,
      }}
      extra={[
        isSubmittingButton ? (
          <CustomSpin />
        ) : (
          <Button
            key={"button-custom-result"}
            className="button-custom-result"
            size="large"
            style={{
              paddingInline: 31,
              borderRadius: 31,
              backgroundColor: "#015E90",
              color: "#f2f2f2",
              marginInline: 7,
            }}
            onClick={handleClickCustomResult}
            loading={isSubmittingButton}
          >
            {textButtonCustomResult}
          </Button>
        ),
      ]}
    />
  );
};

export default CustomResultOneButton;
