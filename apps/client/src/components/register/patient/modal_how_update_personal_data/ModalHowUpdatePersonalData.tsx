"use client";

import React from "react";

import { Col, List, Row } from "antd";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";
import { EMAIL_CONTACT } from "@/utils/constants/constants";

const ModalHowUpdatePersonalData: React.FC<{
  showCustomEmailUpdatePersonalDataModal: boolean;
  setShowCustomEmailUpdatePersonalDataModal: (
    value: React.SetStateAction<boolean>
  ) => void;
}> = ({
  showCustomEmailUpdatePersonalDataModal,
  setShowCustomEmailUpdatePersonalDataModal,
}) => {
  return (
    <CustomModalNoContent
      key={"custom-modal-data-update-request-process"}
      widthCustomModalNoContent={"69%"}
      minWidthCustomModalNoContent="321px"
      openCustomModalState={showCustomEmailUpdatePersonalDataModal}
      closableCustomModal={true}
      maskClosableCustomModal={true}
      handleCancelCustomModal={() => {
        setShowCustomEmailUpdatePersonalDataModal(false);
      }}
      contentCustomModal={
        <div>
          <h2
            className="title-data-update-request-process"
            style={{
              ...titleStyleCss,
              marginBottom: 7,
              textAlign: "center",
              paddingBlock: "13px",
            }}
          >
            ¿Como solicitar actualización de datos personales?
          </h2>

          <Row gutter={24}>
            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "column wrap",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                paddingInline: "7px",
                paddingBlock: "7px",
                margin: "0px",
              }}
            >
              <img
                src="/images/mostrando-documento-de-identidad.png"
                alt="Logo de Bonnadona"
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "cover",
                  borderRadius: "13px",
                  backgroundColor: "#A7BAB7",
                }}
              />
            </Col>

            <Col
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                paddingInline: "22px",
              }}
            >
              <List
                dataSource={[
                  {
                    title: "Asunto del correo:",
                    description: "Actualización de datos",
                  },
                  {
                    title: "Cuerpo del correo:",
                    description: "Escribir y enviar los siguientes datos:",
                    items: [
                      "1. Adjuntar copia legible de documento de identidad (ambos lados)",
                      "2. Adjuntar foto frontal de paciente con documento de identidad original (similar a imagen de ejemplo)",
                      "3. Escribir número de celular actualizado",
                      "4. Escribir correo electrónico actualizado",
                    ],
                  },
                  {
                    title: "Enviar al siguiente correo:",
                    description: (
                      <b style={{ fontSize: 17, color: "#137A2B" }}>
                        {EMAIL_CONTACT}
                      </b>
                    ),
                  },
                ]}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <p
                          style={{
                            ...titleStyleCss,
                            textAlign: "start",
                            padding: "0px",
                            margin: "0px",
                          }}
                        >
                          {item.title}
                        </p>
                      }
                      description={
                        item.items ? (
                          <>
                            <p
                              style={{
                                ...subtitleStyleCss,
                                textAlign: "start",
                                paddingBottom: "7px",
                                margin: "0px",
                              }}
                            >
                              {item.description}
                            </p>
                            <List
                              dataSource={item.items}
                              renderItem={(subItem) => (
                                <List.Item
                                  style={{
                                    padding: "0px",
                                    margin: "0px",
                                  }}
                                >
                                  <p
                                    style={{
                                      ...subtitleStyleCss,
                                      textAlign: "start",
                                      paddingBlock: "8px",
                                      margin: "0px",
                                    }}
                                  >
                                    {subItem}
                                  </p>
                                </List.Item>
                              )}
                            />
                          </>
                        ) : (
                          <p
                            style={{
                              ...subtitleStyleCss,
                              textAlign: "start",
                              padding: "0px",
                              margin: "0px",
                            }}
                          >
                            {item.description}
                          </p>
                        )
                      }
                    />
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </div>
      }
    />
  );
};

export default ModalHowUpdatePersonalData;
