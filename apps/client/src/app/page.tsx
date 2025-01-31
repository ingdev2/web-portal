"use client";

import React from "react";
import ButtonAuth from "@/components/auth/ButtonAuth";

import { Card, Col, Divider, Row } from "antd";
import CustomOptionButton from "@/components/common/custom_option_card_button/CustomOptionButton";
import { GiChemicalDrop } from "react-icons/gi";
import { FaRegCommentDots } from "react-icons/fa";

import CustomPopover from "@/components/common/custom_popover/CustomPopover";

const HomePage = () => {
  return (
    <div
      className="homepage"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexFlow: "column wrap",
      }}
    >
      <div
        className="background-page"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: "url('/background/back-healt.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
      />

      <div
        className="content-homepage"
        style={{
          zIndex: 1,
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="bonna-logo"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingTop: "13px",
            paddingBottom: "2px",
          }}
        >
          <img
            src="/logos/LOGO-BONNADONA.png"
            alt="Logo de Bonnadona"
            style={{ height: 88 }}
          />
        </div>

        <Col
          xs={24}
          lg={24}
          style={{
            padding: "0px 7px",
            width: "100vw",
            maxWidth: "540px",
            minWidth: "231px",
          }}
        >
          <Card
            className="content-card"
            style={{
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "#fcfcfc",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              padding: "2px",
              marginBlock: "13px",
              marginInline: "13px",
            }}
          >
            <div className="text-card">
              <h2
                className="presentation-text"
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  lineHeight: 1.3,
                  paddingBlock: "7px",
                }}
              >
                Portal web para pacientes, familiares y entidades aliadas.
              </h2>

              <h3
                className="presentation-text"
                style={{
                  textAlign: "center",
                  fontWeight: "normal",
                  lineHeight: 1.3,
                  paddingBlock: "13px",
                }}
              >
                Trámites en línea para hacer más fácil y ágil tus solicitudes
                con nosotros, a un solo clic de distancia.
              </h3>
              <ButtonAuth />
            </div>
          </Card>
        </Col>

        <Row
          gutter={[24, 2]}
          justify={"center"}
          align={"top"}
          style={{ paddingBottom: "13px" }}
        >
          <Divider
            orientation="center"
            type="horizontal"
            style={{
              fontSize: "14px",
              fontWeight: "normal",
              marginBlock: "2px",
              borderColor: "#A7BAB7",
            }}
          >
            Otros servicios
          </Divider>

          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            style={{
              padding: "13px 22px",
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <a
              className="url-annarlab-redirect"
              href={process.env.NEXT_PUBLIC_ANNARLAB}
              target="_blank"
              style={{
                display: "flex",
                flexFlow: "column wrap",
                width: "100%",
                height: "100%",
              }}
            >
              <CustomOptionButton
                iconCustomOptionButton={<GiChemicalDrop size={"45px"} />}
                titleCustomOptionButton="Ver resultados de laboratorio"
                textColorCustomOptionButton="#070707"
                iconColorCustomOptionButton="#3F97AF"
                backgroundColorCustomOptionButton="#EFF7F8"
                borderColorCustomOptionButton="#3F97AF"
                handleClickCustomOptionButton={() => {}}
                iconPopoverCustomOptionButton={
                  <CustomPopover
                    titleCustomPopover={
                      "¿Donde puedo ver mis resultados de laboratorio?"
                    }
                    contentCustomPopover={
                      "Tus resultados de laboratorio los podrás ver o descargar desde nuestra plataforma Annarlab."
                    }
                  />
                }
              />
            </a>
          </Col>

          <Col
            xs={10}
            sm={10}
            md={10}
            lg={10}
            style={{
              padding: "13px 22px",
              display: "flex",
              flexFlow: "column wrap",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <a
              className="url-halcon-redirect"
              href={process.env.NEXT_PUBLIC_HALCON_PQRS}
              target="_blank"
              style={{
                display: "flex",
                flexFlow: "column wrap",
                width: "100%",
                height: "100%",
              }}
            >
              <CustomOptionButton
                iconCustomOptionButton={<FaRegCommentDots size={"45px"} />}
                titleCustomOptionButton="PQRS"
                textColorCustomOptionButton="#070707"
                iconColorCustomOptionButton="#3F97AF"
                backgroundColorCustomOptionButton="#EFF7F8"
                borderColorCustomOptionButton="#3F97AF"
                handleClickCustomOptionButton={() => {}}
                iconPopoverCustomOptionButton={
                  <CustomPopover
                    titleCustomPopover={"¿Qué es PQRS?"}
                    contentCustomPopover={
                      "Aquí en esta sección podrás interponer una petición, queja, reclamo, sugerencia o felicitación a cualquiera de nuestros servicios."
                    }
                  />
                }
              />
            </a>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
