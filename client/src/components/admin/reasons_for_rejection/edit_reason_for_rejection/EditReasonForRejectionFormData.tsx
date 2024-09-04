"use client";

import React from "react";

import { Button, Col, Form, Input, Row } from "antd";
import { Store } from "antd/es/form/interface";
import { titleStyleCss } from "@/theme/text_styles";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { MdDriveFileRenameOutline } from "react-icons/md";
import TextArea from "antd/es/input/TextArea";

const EditReasonForRejectionFormData: React.FC<{
  nameReasonForRejectionFormData: string;
  onChangeNameReasonForRejectionFormData: (e: any) => void;
  messageReasonForRejectionFormData: string;
  onChangeMessageReasonForRejectionFormData: (e: any) => void;
  handleConfirmEpsCompanyFormData: (
    e: React.FormEvent<HTMLFormElement>
  ) => Promise<void>;
  initialValuesEditAdminFormData: Store | undefined;
  isSubmittingEditAdminFormData: boolean;
  handleButtonClickFormData: () => void;
  hasChangesFormData: boolean;
}> = ({
  nameReasonForRejectionFormData,
  onChangeNameReasonForRejectionFormData,
  messageReasonForRejectionFormData,
  onChangeMessageReasonForRejectionFormData,
  handleConfirmEpsCompanyFormData,
  initialValuesEditAdminFormData,
  isSubmittingEditAdminFormData,
  handleButtonClickFormData,
  hasChangesFormData,
}) => {
  return (
    <Form
      id="edit-reason-for-rejection-form"
      name="edit-reason-for-rejection-form"
      className="edit-reason-for-rejection-form"
      onFinish={handleConfirmEpsCompanyFormData}
      initialValues={initialValuesEditAdminFormData}
      autoComplete="false"
      layout="vertical"
      style={{
        width: "100%",
        paddingBlock: "7px",
        paddingInline: "13px",
      }}
    >
      <h2
        className="title-edit-reason-for-rejection-form"
        style={{
          ...titleStyleCss,
          textAlign: "center",
          marginTop: "7px",
          marginBottom: "22px",
        }}
      >
        Editar motivo de rechazo
      </h2>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-reason-for-rejection-name"
            label="Titulo de motivo de rechazo:"
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
                message: "¡Por favor ingrese el nombre del motivo!",
              },
              {
                min: 10,
                message: "El nombre debe tener al menos 10 caracteres",
              },
              {
                max: 50,
                message: "El nombre no puede tener más de 50 caracteres",
              },
              {
                pattern: /^[A-ZÁÉÍÓÚÑ\s]*$/,
                message:
                  "El nombre solo puede contener letras mayúsculas con tildes y espacios",
              },
            ]}
          >
            <Input
              id="name-reason-for-rejection"
              prefix={
                <MdDriveFileRenameOutline className="site-form-item-icon" />
              }
              type="text"
              value={nameReasonForRejectionFormData}
              placeholder="Nombre de motivo"
              onChange={onChangeNameReasonForRejectionFormData}
              autoComplete="off"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item
            name="edit-reason-for-rejection-message"
            label="Mensaje de motivo:"
            style={{ marginBottom: "13px" }}
            rules={[
              {
                required: false,
                message: "¡Por favor ingresa el mensaje del motivo!",
              },
              {
                min: 20,
                message: "El mensaje debe tener al menos 20 caracteres",
              },
              {
                max: 200,
                message: "El mensaje no puede tener más de 200 caracteres",
              },
            ]}
          >
            <TextArea
              id="message-reason-for-rejection"
              value={messageReasonForRejectionFormData}
              placeholder="Mensaje de motivo"
              onChange={onChangeMessageReasonForRejectionFormData}
              autoComplete="off"
              autoSize={{ minRows: 2, maxRows: 10 }}
              maxLength={200}
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
        {isSubmittingEditAdminFormData ? (
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
              className="edit-reason-for-rejection-form-button"
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

export default EditReasonForRejectionFormData;
