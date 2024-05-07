"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Layout, Row, Col } from "antd";
import CustomDropdown from "@/components/common/custom_dropdown/CustomDropdown";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { FaSignOutAlt } from "react-icons/fa";
import { PiUserListBold } from "react-icons/pi";
import { UserOutlined } from "@ant-design/icons";
import PatientHomepageContent from "./homepage_content/PatientHomepageContent";

import {
  setNameUserPatient,
  setDefaultValuesUserPatient,
} from "@/redux/features/patient/patientSlice";

import { useGetUserByIdNumberPatientQuery } from "@/redux/apis/users/usersApi";

const PatientHomeLayout: React.FC = () => {
  const { Header, Content, Footer } = Layout;
  const dispatch = useAppDispatch();
  const router = useRouter();

  const idNumberUserPatientState = useAppSelector(
    (state) => state.patientUserLogin.id_number
  );

  const nameUserPatientState = useAppSelector((state) => state.patient.name);

  const {
    data: userPatientData,
    isLoading: userPatientLoading,
    isFetching: userPatientFetching,
    error: userPatientError,
  } = useGetUserByIdNumberPatientQuery(idNumberUserPatientState);

  useEffect(() => {
    if (!nameUserPatientState) {
      dispatch(setNameUserPatient(userPatientData?.name));
    }
  }, [nameUserPatientState]);

  const handleClickUpdatePersonalData = async () => {
    try {
      await router.replace("/patient/update_personal_data", {
        scroll: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const handleClickSignOut = async () => {
    try {
      dispatch(setDefaultValuesUserPatient());

      const response = await signOut();
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  const getFirstName = (fullName: string) => {
    if (!fullName) return "";

    const words = fullName.split(" ");
    return words[0];
  };

  return (
    <Layout
      className="layout-patient-homepage"
      style={{
        display: "flex",
        flexFlow: "column wrap",
        minWidth: "100vw",
        minHeight: "100vh",
        backgroundColor: "transparent",
        margin: "0px",
        padding: "0px",
      }}
    >
      <div
        className="background-homepage-patient"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: "url('/background/back-healt-opacity.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          margin: "0px",
          padding: "0px",
        }}
      />
      <Header
        className="header-patient-homepage"
        style={{
          position: "sticky",
          display: "flex",
          flexFlow: "row wrap",
          alignContent: "center",
          backgroundColor: "#015E90",
          top: "0px",
          padding: "0 54px",
          zIndex: 1,
        }}
      >
        <Row
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <Col
            xs={8}
            md={8}
            lg={8}
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "flex-start",
              alignContent: "flex-start",
            }}
          >
            <div
              className="logo-header-patient-homepage"
              style={{
                display: "flex",
                flexFlow: "column wrap",
                justifyContent: "center",
                alignContent: "center",
                width: "60%",
                height: "80%",
                backgroundColor: "#f2f2f2",
                borderEndStartRadius: 7,
                borderEndEndRadius: 7,
                overflow: "hidden",
              }}
            >
              <img
                src="/logos/LOGO-HORIZONTAL-TRANS-130-X-130-PX.png"
                alt="Logo de Proced"
                style={{
                  maxWidth: "80%",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </div>
          </Col>
          <Col
            xs={16}
            md={16}
            lg={16}
            style={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "flex-end",
              alignContent: "center",
            }}
          >
            <>
              {userPatientFetching && userPatientLoading ? (
                <CustomSpin />
              ) : (
                <div
                  className="avatar-patient-homepage"
                  style={{
                    display: "flex",
                    flexFlow: "row wrap",
                    justifyContent: "flex-end",
                    alignContent: "center",
                  }}
                >
                  <div>
                    <CustomDropdown
                      titleCustomDropdown={getFirstName(nameUserPatientState)}
                      iconCustomItem1={<PiUserListBold />}
                      iconCustomItem2={<FaSignOutAlt />}
                      titleCustomItem1="Actualizar Datos"
                      titleCustomItem2="Cerrar Sesión"
                      handleClickCustomItem1={handleClickUpdatePersonalData}
                      handleClickCustomItem2={handleClickSignOut}
                      iconCustomDropdown={<UserOutlined />}
                    />
                  </div>
                </div>
              )}
            </>
          </Col>
        </Row>
      </Header>
      <Content
        style={{
          display: "flex",
          flexFlow: "column nowrap",
          alignItems: "center",
          // padding: "13px 31px",
          margin: "0px",
        }}
      >
        <PatientHomepageContent />
      </Content>
      <Footer
        style={{
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "13px",
          backgroundColor: "transparent",
          marginTop: "13px",
          bottom: "0px",
        }}
      >
        Clínica Bonnadona © {new Date().getFullYear()}
      </Footer>
    </Layout>
  );
};

export default PatientHomeLayout;
