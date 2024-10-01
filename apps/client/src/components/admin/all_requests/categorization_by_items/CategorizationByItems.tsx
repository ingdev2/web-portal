"use client";

import React from "react";

import { Col, Divider, Row } from "antd";

import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllMedicalReqUsersQuery } from "@/redux/apis/medical_req/medicalReqApi";

import { RequirementStatusEnum } from "../../../utils/enums/requirement_status.enum";
import { RequirementTypeEnum } from "../../../utils/enums/requirement_type.enum";

const CategorizationByItems: React.FC = () => {
  const { data: allMedicalReqStatusCreatedData } =
    useGetAllMedicalReqUsersQuery({ status: RequirementStatusEnum.CREATED });

  const { data: allMedicalReqStatusVisualizedData } =
    useGetAllMedicalReqUsersQuery({ status: RequirementStatusEnum.VISUALIZED });

  const { data: allMedicalReqStatusUnderReviewData } =
    useGetAllMedicalReqUsersQuery({
      status: RequirementStatusEnum.UNDER_REVIEW,
    });

  const { data: allMedicalReqStatusDeliveredData } =
    useGetAllMedicalReqUsersQuery({ status: RequirementStatusEnum.DELIVERED });

  const { data: allMedicalReqStatusRejectedData } =
    useGetAllMedicalReqUsersQuery({ status: RequirementStatusEnum.REJECTED });

  const { data: allMedicalReqStatusExpiredData } =
    useGetAllMedicalReqUsersQuery({
      status: RequirementStatusEnum.EXPIRED,
    });

  const { data: allMedicalReqTypeClinicHistoryData } =
    useGetAllMedicalReqUsersQuery({
      type: RequirementTypeEnum.CLINIC_HISTORY,
    });

  const { data: allMedicalReqTypeMedicalOrderData } =
    useGetAllMedicalReqUsersQuery({
      type: RequirementTypeEnum.MEDICAL_ORDER,
    });

  const { data: allMedicalReqTypeMedicalDisabilityData } =
    useGetAllMedicalReqUsersQuery({
      type: RequirementTypeEnum.MEDICAL_DISABILITY,
    });

  const {
    data: allMedicalReqUsersData,
    isLoading: allMedicalReqUsersLoading,
    isFetching: allMedicalReqUsersFetching,
    error: allMedicalReqUsersError,
  } = useGetAllMedicalReqUsersQuery({});

  return (
    <>
      {!allMedicalReqUsersData &&
      !allMedicalReqStatusCreatedData &&
      !allMedicalReqStatusVisualizedData &&
      !allMedicalReqStatusUnderReviewData &&
      !allMedicalReqStatusDeliveredData &&
      !allMedicalReqStatusRejectedData ? (
        <CustomSpin />
      ) : (
        <>
          <Col
            style={{ width: "100%", marginTop: "7px", marginBottom: "13px" }}
          >
            <h2
              style={{
                ...subtitleStyleCss,
                textAlign: "center",
                margin: "0px",
              }}
            >
              Total de&nbsp;
              <b>
                {allMedicalReqUsersData?.length}
                &nbsp;solicitud(es)
              </b>
            </h2>
          </Col>

          <div
            style={{
              paddingBlock: "7px",
              paddingInline: "13px",
              backgroundColor: "#013B5A22",
              borderRadius: "13px",
              marginBottom: "13px",
            }}
          >
            <Col style={{ width: "100%", marginBlock: "0px" }}>
              <h3
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  color: "#1D8348",
                  fontWeight: "bold",
                  margin: "0px",
                }}
              >
                Categorización por estado de solicitud
              </h3>
            </Col>

            <Row
              align="middle"
              style={{
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginBlock: "7px",
              }}
            >
              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                  color: "#013B5A",
                }}
              >
                Creadas:&nbsp;
                <b>{allMedicalReqStatusCreatedData?.length || 0}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                  color: "#9960B0",
                }}
              >
                Visualizadas:&nbsp;
                <b>{allMedicalReqStatusVisualizedData?.length || 0}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                  color: "#F4D03F",
                }}
              >
                En Revisión:&nbsp;
                <b>{allMedicalReqStatusUnderReviewData?.length || 0}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                  color: "#137A2B",
                }}
              >
                Docs. Entregados:&nbsp;
                <b>{allMedicalReqStatusDeliveredData?.length || 0}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                  color: "#8C1111",
                }}
              >
                Rechazadas:&nbsp;
                <b>{allMedicalReqStatusRejectedData?.length || 0}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                  color: "#BA3400",
                }}
              >
                Expiradas:&nbsp;
                <b>{allMedicalReqStatusExpiredData?.length || 0} </b>
              </h4>
            </Row>
          </div>

          <div
            style={{
              paddingBlock: "7px",
              paddingInline: "13px",
              backgroundColor: "#013B5A22",
              borderRadius: "13px",
              marginBottom: "13px",
            }}
          >
            <Col style={{ width: "100%", marginBlock: "0px" }}>
              <h3
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  color: "#1D8348",
                  fontWeight: "bold",
                  margin: "0px",
                }}
              >
                Categorización por tipo de solicitud
              </h3>
            </Col>

            <Row
              align="middle"
              style={{
                height: "100%",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
                marginBlock: "7px",
              }}
            >
              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                Historias clínicas:&nbsp;
                <b>{allMedicalReqTypeClinicHistoryData?.length}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                Órdenes médicas:&nbsp;
                <b>{allMedicalReqTypeMedicalOrderData?.length}</b>
              </h4>

              <Divider
                type="vertical"
                style={{
                  height: "22px",
                  borderWidth: "1.3px",
                  borderColor: "#8C11117F",
                }}
              />

              <h4
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  margin: "0px",
                }}
              >
                Incapacidades médicas:&nbsp;
                <b>{allMedicalReqTypeMedicalDisabilityData?.length}</b>
              </h4>
            </Row>
          </div>
        </>
      )}
    </>
  );
};

export default CategorizationByItems;
