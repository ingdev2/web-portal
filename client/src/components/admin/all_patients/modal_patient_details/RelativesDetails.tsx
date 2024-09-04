"use client";

import React from "react";
import { useAppSelector } from "@/redux/hooks";

import { Col, Row } from "antd";
import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllIdTypesQuery } from "@/redux/apis/id_types/idTypesApi";
import { useGetAllRelationshipTypesQuery } from "@/redux/apis/relatives/relationship_types/relationshipTypesApi";

import { transformIdToNameMap } from "@/helpers/transform_id_to_name/transform_id_to_name";

const RelativesDetails: React.FC = () => {
  const NOT_REGISTER: string = "NO REGISTRA";

  const patientRelativesState = useAppSelector(
    (state) => state.patient.familiar
  );

  const {
    data: idTypesData,
    isLoading: idTypesLoading,
    isFetching: idTypesFetching,
    error: idTypesError,
  } = useGetAllIdTypesQuery(null);

  const {
    data: relationShipTypesData,
    isLoading: relationShipTypesLoading,
    isFetching: relationShipTypesFetching,
    error: relationShipTypesError,
  } = useGetAllRelationshipTypesQuery(null);

  const idTypeGetName = transformIdToNameMap(idTypesData);
  const relationShipTypesGetName = transformIdToNameMap(relationShipTypesData);

  const transformedData = Array.isArray(patientRelativesState)
    ? patientRelativesState.map((req: any) => ({
        ...req,
        user_id_type: idTypeGetName?.[req.user_id_type] || req.user_id_type,
        rel_with_patient:
          relationShipTypesGetName?.[req.rel_with_patient] ||
          req.rel_with_patient,
      }))
    : [];

  return transformedData.length > 0 ? (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "column wrap",
      }}
    >
      {transformedData.map((relative, index) => (
        <Col
          key={index}
          style={{
            width: "100%",
            padding: "0px",
            margin: "7px 0px",
            border: "0.7px solid #013B5A22",
            borderRadius: "7px",
            background: "#EFF7F8",
          }}
        >
          <Row style={{ marginTop: "7px" }}>
            <Col span={24}>
              <h3
                style={{
                  ...subtitleStyleCss,
                  fontWeight: "bold",
                  color: "#015E90",
                  textAlign: "center",
                }}
              >
                Familiar {index + 1}
              </h3>
            </Col>
          </Row>

          <Row
            style={{
              marginInline: "13px",
              marginBottom: "5px",
              padding: "0px",
            }}
          >
            <Col
              span={12}
              style={{
                width: "100%",
                textAlign: "start",
              }}
            >
              <p
                style={{
                  marginBlock: "4px",
                }}
              >
                <strong>Nombre(s):</strong>&nbsp;
                {relative.name}
              </p>
            </Col>

            <Col
              span={12}
              style={{
                width: "100%",
                textAlign: "start",
              }}
            >
              <p
                style={{
                  marginBlock: "4px",
                }}
              >
                <strong>Apellido(s):</strong>&nbsp;
                {relative.last_name}
              </p>
            </Col>
          </Row>

          <Row
            style={{
              marginInline: "13px",
              marginBottom: "5px",
              padding: "0px",
            }}
          >
            <Col
              span={12}
              style={{
                width: "100%",
                textAlign: "start",
              }}
            >
              <p
                style={{
                  marginBlock: "4px",
                }}
              >
                <strong>Tipo de ID:</strong>&nbsp;
                {relative.user_id_type}
              </p>
            </Col>

            <Col
              span={12}
              style={{
                width: "100%",
                textAlign: "start",
              }}
            >
              <p
                style={{
                  marginBlock: "4px",
                }}
              >
                <strong>Número de ID:</strong>&nbsp;
                {relative.id_number}
              </p>
            </Col>
          </Row>

          <Row
            style={{
              marginInline: "13px",
              marginBottom: "5px",
              padding: "0px",
            }}
          >
            <Col
              span={12}
              style={{
                width: "100%",
                textAlign: "start",
              }}
            >
              <p
                style={{
                  marginBlock: "4px",
                }}
              >
                <strong>Parentesco:</strong>&nbsp;
                {relative.rel_with_patient}
              </p>
            </Col>

            <Col
              span={12}
              style={{
                width: "100%",
                textAlign: "start",
              }}
            >
              <p
                style={{
                  marginBlock: "4px",
                }}
              >
                <strong>Número celular:</strong>&nbsp;
                {relative.cellphone || NOT_REGISTER}
              </p>
            </Col>
          </Row>

          <Row
            style={{
              marginInline: "13px",
              marginBottom: "13px",
              padding: "0px",
            }}
          >
            <Col
              span={12}
              style={{
                width: "100%",
                textAlign: "start",
              }}
            >
              <p
                style={{
                  marginBlock: "4px",
                }}
              >
                <strong>WhatsApp:</strong>&nbsp;
                {relative.whatsapp || NOT_REGISTER}
              </p>
            </Col>

            <Col
              span={12}
              style={{
                width: "100%",
                textAlign: "start",
              }}
            >
              <p
                style={{
                  marginBlock: "4px",
                }}
              >
                <strong>Email:</strong>&nbsp;
                {relative.email || NOT_REGISTER}
              </p>
            </Col>
          </Row>
        </Col>
      ))}
    </div>
  ) : (
    <p style={{ color: "#960202" }}>Sin familiares activos</p>
  );
};

export default RelativesDetails;
