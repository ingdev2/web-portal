"use client";

import React from "react";

import { Col, Row } from "antd";
import { MdAssignmentAdd } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import CustomOptionButton from "@/components/common/custom_option_card_button/CustomOptionButton";

const HomepageOptions: React.FC = () => {
  return (
    <Row
      justify={"center"}
      align={"top"}
      // gutter={[12, 24]}
      style={{
        width: "100%",
        paddingBlock: "13px",
        paddingInline: "22px",
      }}
    >
      <Col
        xs={12}
        sm={12}
        md={6}
        lg={4}
        style={{
          padding: "13px 31px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomOptionButton
          iconCustomOptionButton={<MdAssignmentAdd size={"45px"} />}
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
          padding: "13px 31px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomOptionButton
          iconCustomOptionButton={<MdFormatListNumbered size={"45px"} />}
          titleCustomOptionButton="Solicitudes hechas"
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
          padding: "13px 31px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomOptionButton
          iconCustomOptionButton={<RxUpdate size={"45px"} />}
          titleCustomOptionButton="Actualizar datos"
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
          padding: "13px 31px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <CustomOptionButton
          iconCustomOptionButton={<FaUsers size={"45px"} />}
          titleCustomOptionButton="Núcleo familiar"
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
