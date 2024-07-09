"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Row, Col } from "antd";
import { MdAssignmentAdd } from "react-icons/md";
import { MdFormatListNumbered } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { FaRegCommentDots } from "react-icons/fa";
import CustomOptionButton from "@/components/common/custom_option_card_button/CustomOptionButton";
import CustomPopover from "@/components/common/custom_popover/CustomPopover";

const HomepageOptionsFamiliar: React.FC = () => {
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
              await router.push("/familiar/homepage/create_request", {
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
              await router.push("/familiar/homepage/request_list", {
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
            iconCustomOptionButton={<RxUpdate size={"45px"} />}
            titleCustomOptionButton="Actualizar datos personales"
            textColorCustomOptionButton="#f2f2f2"
            iconColorCustomOptionButton="#00B5E8"
            backgroundColorCustomOptionButton="#015E90"
            borderColorCustomOptionButton="#3F97AF"
            handleClickCustomOptionButton={async () => {
              await router.push("/familiar/homepage/update_personal_data", {
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
    </>
  );
};

export default HomepageOptionsFamiliar;
