"use client";

import React from "react";

import { Col, Row } from "antd";
import { FcDocument } from "react-icons/fc";
import { FcViewDetails } from "react-icons/fc";
import CustomOptionButton from "@/components/common/custom_option_card_button/CustomOptionButton";

const HomepageOptions: React.FC = () => {
  return (
    <Row
      justify={"center"}
      align={"top"}
      gutter={[
        { xs: 24, sm: 36, md: 48, lg: 48 },
        { xs: 12, sm: 12, md: 12, lg: 12 },
      ]}
      style={{
        width: "100%",
        height: "auto",
        paddingInline: "45px",
      }}
    >
      <Col
        xs={12}
        sm={12}
        md={6}
        lg={4}
        style={{
          padding: "7px 7px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomOptionButton
          iconCustomOptionButton={<FcDocument size={"45px"} />}
          titleCustomOptionButton="Crear solicitud"
          textColorCustomOptionButton="#f2f2f2"
          backgroundColorCustomOptionButton="#015E90"
          borderColorCustomOptionButton="#3F97AF"
          handleClickCustomOptionButton={() => {
            console.log("CLICK EN CARD");
          }}
        />
      </Col>

      <Col
        xs={12}
        sm={12}
        md={6}
        lg={4}
        style={{
          padding: "7px 7px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomOptionButton
          iconCustomOptionButton={<FcViewDetails size={"45px"} />}
          titleCustomOptionButton="Ver solicitudes"
          textColorCustomOptionButton="#f2f2f2"
          backgroundColorCustomOptionButton="#015E90"
          borderColorCustomOptionButton="#3F97AF"
          handleClickCustomOptionButton={() => {
            console.log("CLICK EN CARD");
          }}
        />
      </Col>

      <Col
        xs={12}
        sm={12}
        md={6}
        lg={4}
        style={{
          padding: "7px 7px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomOptionButton
          iconCustomOptionButton={<FcDocument size={"45px"} />}
          titleCustomOptionButton="Actualización de datos"
          textColorCustomOptionButton="#f2f2f2"
          backgroundColorCustomOptionButton="#015E90"
          borderColorCustomOptionButton="#3F97AF"
          handleClickCustomOptionButton={() => {
            console.log("CLICK EN CARD");
          }}
        />
      </Col>

      <Col
        xs={12}
        sm={12}
        md={6}
        lg={4}
        style={{
          padding: "7px 7px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomOptionButton
          iconCustomOptionButton={<FcDocument size={"45px"} />}
          titleCustomOptionButton="Ver núcleo familiar"
          textColorCustomOptionButton="#f2f2f2"
          backgroundColorCustomOptionButton="#015E90"
          borderColorCustomOptionButton="#3F97AF"
          handleClickCustomOptionButton={() => {
            console.log("CLICK EN CARD");
          }}
        />
      </Col>
    </Row>
  );
};

export default HomepageOptions;
