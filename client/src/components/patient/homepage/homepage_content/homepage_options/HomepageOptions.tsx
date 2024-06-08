"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Row, Col } from "antd";
import { MdAssignmentAdd } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { GiChemicalDrop } from "react-icons/gi";
import { FaUsers } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { FaRegCommentDots } from "react-icons/fa";
import CustomOptionButton from "@/components/common/custom_option_card_button/CustomOptionButton";

const HomepageOptions: React.FC = () => {
  const router = useRouter();

  return (
    <>
      <Row
        justify={"center"}
        align={"top"}
        // gutter={[12, 24]}
        style={{
          display: "flex",
          flexFlow: "row wrap",
          width: "100%",
          paddingBlock: "7px",
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
            titleCustomOptionButton="Solicitar documento médico"
            textColorCustomOptionButton="#f2f2f2"
            iconColorCustomOptionButton="#00B5E8"
            backgroundColorCustomOptionButton="#015E90"
            borderColorCustomOptionButton="#3F97AF"
            handleClickCustomOptionButton={async () => {
              await router.push("/patient/homepage/create_request", {
                scroll: true,
              });
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
            titleCustomOptionButton="Ver documentos médicos solicitados"
            textColorCustomOptionButton="#f2f2f2"
            iconColorCustomOptionButton="#00B5E8"
            backgroundColorCustomOptionButton="#015E90"
            borderColorCustomOptionButton="#3F97AF"
            handleClickCustomOptionButton={async () => {
              await router.push("/patient/homepage/request_list", {
                scroll: true,
              });
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
              textColorCustomOptionButton="#f2f2f2"
              iconColorCustomOptionButton="#00B5E8"
              backgroundColorCustomOptionButton="#015E90"
              borderColorCustomOptionButton="#3F97AF"
              handleClickCustomOptionButton={() => {}}
            />
          </a>
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
            titleCustomOptionButton="Ver núcleo familiar autorizado"
            textColorCustomOptionButton="#f2f2f2"
            iconColorCustomOptionButton="#00B5E8"
            backgroundColorCustomOptionButton="#015E90"
            borderColorCustomOptionButton="#3F97AF"
            handleClickCustomOptionButton={async () => {
              await router.push("/patient/homepage/family_nucleus", {
                scroll: true,
              });
            }}
          />
        </Col>
      </Row>

      <Row
        justify={"center"}
        align={"top"}
        // gutter={[12, 24]}
        style={{
          display: "flex",
          width: "100%",
          flexFlow: "row wrap",
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
            iconCustomOptionButton={<RxUpdate size={"45px"} />}
            titleCustomOptionButton="Actualizar datos personales"
            textColorCustomOptionButton="#f2f2f2"
            iconColorCustomOptionButton="#00B5E8"
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
              textColorCustomOptionButton="#f2f2f2"
              iconColorCustomOptionButton="#00B5E8"
              backgroundColorCustomOptionButton="#015E90"
              borderColorCustomOptionButton="#3F97AF"
              handleClickCustomOptionButton={() => {}}
            />
          </a>
        </Col>
      </Row>
    </>
  );
};

export default HomepageOptions;
