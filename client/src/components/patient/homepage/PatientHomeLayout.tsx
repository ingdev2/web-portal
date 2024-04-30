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
    console.log(nameUserPatientState);

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
    <div
      className="layout-patient-homepage-content"
      style={{ height: "100vh", width: "100vw" }}
    >
      <div
        className="background-homepage-patient"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: "url('/background/back-healt.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.2,
        }}
      />
      <Layout
        className="layout-patient-homepage"
        style={{
          display: "flex",
          flexFlow: "column wrap",
          width: "100vw",
          height: "100vh",
          minWidth: "405px",
          backgroundColor: "transparent",
          zIndex: 1,
        }}
      >
        <Header
          className="header-patient-homepage"
          style={{
            position: "sticky",
            display: "flex",
            flexFlow: "row wrap",
            alignContent: "center",
            backgroundColor: "#015E90",
            top: 0,
            padding: "0 54px",
            zIndex: 2,
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
              lg={8}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "flex-start",
                alignContent: "center",
              }}
            >
              <div
                className="logo-header-patient-homepage"
                style={{
                  display: "flex",
                  flexFlow: "column wrap",
                  justifyContent: "center",
                  alignContent: "center",
                  width: "80%",
                  height: "80%",
                  backgroundColor: "#f2f2f2",
                  borderRadius: 7,
                  overflow: "hidden",
                }}
              >
                <img
                  src="/logos/LOGO-HORIZONTAL-TRANS-130-X-130-PX.png"
                  alt="Logo de Proced"
                  style={{
                    width: "80%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
            </Col>
            <Col
              xs={16}
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
            flexFlow: "column wrap",
            // justifyContent: "center",
            // alignContent: "center",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Row>
            <Col xs={24} lg={24} style={{ padding: "13px 31px" }}>
              <div>Contenido Aquí</div>
            </Col>
          </Row>
        </Content>
        <Footer
          style={{
            height: 13,
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "transparent",
            bottom: 0,
            zIndex: 1,
          }}
        >
          Clínica Bonnadona © {new Date().getFullYear()}
        </Footer>
      </Layout>
    </div>
  );
};

export default PatientHomeLayout;
