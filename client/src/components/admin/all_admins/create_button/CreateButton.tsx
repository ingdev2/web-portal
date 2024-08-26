"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button, Col, Row } from "antd";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { TiUserAdd } from "react-icons/ti";
import { subtitleStyleCss } from "@/theme/text_styles";

import { useGetAllAdminsQuery } from "@/redux/apis/admins/adminsApi";

const CreateButton: React.FC<{
  isSubmittingCreateButton: boolean;
  setIsSubmittingCreateButton: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ isSubmittingCreateButton, setIsSubmittingCreateButton }) => {
  const router = useRouter();

  const {
    data: allAdminsData,
    isLoading: allAdminsLoading,
    isFetching: allAdminsFetching,
    error: allAdminsError,
    refetch: refecthAllAdmins,
  } = useGetAllAdminsQuery(null);

  return (
    <Row
      gutter={24}
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
          justifyContent: "flex-end",
          alignContent: "center",
          alignItems: "center",
          padding: "0px 88px",
        }}
      >
        <h2
          style={{
            ...subtitleStyleCss,
            textAlign: "center",
            paddingInline: "22px",
          }}
        >
          Total de&nbsp;
          <b>
            {allAdminsData?.length || 0}
            &nbsp;administrador(es)
          </b>
        </h2>
      </Col>

      <Col
        span={6}
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-end",
          alignContent: "center",
          alignItems: "center",
          padding: "0px",
        }}
      >
        {isSubmittingCreateButton ? (
          <CustomSpin />
        ) : (
          <Button
            type="primary"
            size="middle"
            icon={<TiUserAdd size={17} />}
            style={{
              backgroundColor: "#1D8348",
              color: "#f2f2f2",
              fontWeight: "bold",
              display: "flex",
              flexFlow: "row wrap",
              alignContent: "center",
              alignItems: "center",
              paddingInline: "13px",
            }}
            htmlType="button"
            className="admin-register-button"
            onClick={async () => {
              try {
                setIsSubmittingCreateButton(true);

                await router.push("all_admins/register", {
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
