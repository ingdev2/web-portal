"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button, Col, Row } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { IoMdAddCircleOutline } from "react-icons/io";
import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllMedicalReqTypesAdminDashboardQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";

const CreateButton: React.FC<{
  isSubmittingCreateButton: boolean;
  setIsSubmittingCreateButton: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isSubmittingCreateButton, setIsSubmittingCreateButton }) => {
  const router = useRouter();

  const {
    data: allTypesOfRequestsData,
    isLoading: allTypesOfRequestsLoading,
    isFetching: allTypesOfRequestsFetching,
    error: allTypesOfRequestsError,
    refetch: refecthTypesOfRequestsCompany,
  } = useGetAllMedicalReqTypesAdminDashboardQuery(null);

  return (
    <Row
      align="middle"
      justify={"center"}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "row wrap",
        marginBlock: "7px",
      }}
    >
      <Col
        span={18}
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: "0px",
          margin: "0px",
        }}
      >
        <h2
          style={{
            ...subtitleStyleCss,
            textAlign: "center",
            marginLeft: "45px",
          }}
        >
          Total de&nbsp;
          <b>
            {allTypesOfRequestsData?.length || 0}
            &nbsp;tipo(s) de solicitud(es)
          </b>
        </h2>
      </Col>

      <Col
        span={6}
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          padding: "0px",
          margin: "0px",
        }}
      >
        {isSubmittingCreateButton ? (
          <CustomSpin />
        ) : (
          <Button
            type="primary"
            size="middle"
            icon={<IoMdAddCircleOutline size={17} />}
            style={{
              backgroundColor: "#1D8348",
              color: "#f2f2f2",
              fontWeight: "bold",
              display: "flex",
              flexFlow: "row wrap",
              alignContent: "center",
              alignItems: "center",
              paddingInline: "13px",
              margin: "0px",
            }}
            htmlType="button"
            className="type-of-request-register-button"
            onClick={async () => {
              try {
                setIsSubmittingCreateButton(true);

                await router.push("all_types_of_requests/register", {
                  scroll: true,
                });
              } catch (error) {
                console.error(error);
              } finally {
                setIsSubmittingCreateButton(false);
              }
            }}
          >
            Crear nuevo
          </Button>
        )}
      </Col>
    </Row>
  );
};

export default CreateButton;
