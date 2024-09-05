"use client";

import React from "react";

import { Button, Col, Form, Input, Row } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { MdDriveFileRenameOutline } from "react-icons/md";

const EditTypeOfRequestFormData: React.FC<{
  nameTypeOfRequestFormData: string;
  onChangeNameTypeOfRequestFormData: (e: any) => void;
  handleConfirmDataFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditFormData: Store | undefined;
  isSubmittingEditFormData: boolean;
  handleButtonClickFormData: () => void;
  hasChangesFormData: boolean;
}> = ({
  nameTypeOfRequestFormData,
  onChangeNameTypeOfRequestFormData,
  handleConfirmDataFormData,
  initialValuesEditFormData,
  isSubmittingEditFormData,
  handleButtonClickFormData,
  hasChangesFormData,
}) => {
  return (
    <Form
      id="edit-type-of-request-form"
      name="edit-type-of-request-form"
      className="edit-type-of-request-form"
      onFinish={handleConfirmDataFormData}
      initialValues={initialValuesEditFormData}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
        paddingBlock: "7px",
        paddingInline: "13px",
      }}
    >
      <h2
        className="title-edit-type-of-request-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Editar tipo de solicitud
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-type-of-request-name"
            label="Nombre de tipo de solicitud:"
            style={{ marginBottom: "13px" }}
            normalize={(value) => {
              if (!value) return "";

              const filteredValue = value
                .toUpperCase()
                .replace(/[^A-ZÁÉÍÓÚÑ\s]/g, "");

              return filteredValue;
            }}
            rules={[
              {
                required: false,
                message: "¡Por favor ingrese el nombre del tipo de solicitud!",
              },
              {
                min: 5,
                message: "El nombre debe tener al menos 5 caracteres",
              },
              {
                max: 40,
                message: "El nombre no puede tener más de 40 caracteres",
              },
              {
                pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas con tildes y espacios",
              },
            ]}
          >
            <Input
              id="name-type-of-request"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={nameTypeOfRequestFormData}
              placeholder="Nombre de tipo de solicitud"
              onChange={onChangeNameTypeOfRequestFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        style={{
          textAlign: "center",
          marginBlock: "0px",
          paddingBlock: "13px",
        }}
      >
        {isSubmittingEditFormData ? (
          <CustomSpin />
        ) : (
          <div
            style={{
              display: "flex",
              flexFlow: "row",
              justifyContent: "center",
            }}
          >
            <Button
              size="large"
              style={{
                backgroundColor: !hasChangesFormData ? "#D8D8D8" : "#015E90",
                color: !hasChangesFormData ? "#A0A0A0" : "#f2f2f2",
                fontWeight: "bold",
                paddingInline: 54,
                borderRadius: 31,
              }}
              htmlType="submit"
              className="edit-type-of-request-form-button"
              onClick={handleButtonClickFormData}
              disabled={!hasChangesFormData}
            >
              Actualizar datos
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default EditTypeOfRequestFormData;
