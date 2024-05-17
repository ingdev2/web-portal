"use client";

import React from "react";

import { Upload, Button, message } from "antd";
import type { UploadProps } from "antd";
import { FcPlus } from "react-icons/fc";

const props: UploadProps = {
  name: "file",
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`¡${info.file.name} cargado correctamente!`);
    } else if (info.file.status === "error") {
      message.error(`¡${info.file.name} error al cargar!`);
    }
  },
  progress: {
    strokeColor: {
      "0%": "#8C1111",
      "100%": "#137A2B",
    },
    size: 7,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const CustomUpload: React.FC<{ titleCustomUpload: string }> = ({
  titleCustomUpload,
}) => (
  <Upload {...props}>
    <Button
      style={{
        paddingInline: 17,
        color: "#015E90",
        borderColor: "#015E90",
        fontWeight: "bold",
        borderRadius: 7,
        borderWidth: 1.3,
        display: "flex",
        flexFlow: "row wrap",
        alignContent: "center",
        alignItems: "center",
      }}
      type="default"
      className="upload-file-button"
      icon={<FcPlus size={17} />}
    >
      {titleCustomUpload}
    </Button>
  </Upload>
);

export default CustomUpload;
