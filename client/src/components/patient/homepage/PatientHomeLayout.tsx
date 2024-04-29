import React from "react";

import { Layout, Row, Col } from "antd";

const { Header, Content, Footer } = Layout;

const PatientHomeLayout: React.FC = () => {
  return (
    <div className="layout-patient-homepage-content">
      <div
        className="background-homepage-patient"
        style={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
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
          flexDirection: "column",
          backgroundColor: "transparent",
          width: "100vw",
          height: "100vh",
          zIndex: 1,
        }}
      >
        <Header
          style={{
            position: "sticky",
            width: "100%",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#015E90",
          }}
        ></Header>
        <Content
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
          }}
        >
          <Row>
            <Col xs={24} md={24} lg={24} style={{ padding: "13px 31px" }}>
              <div>
                Contenido Aquí de toda la pagina de inicio de los pacientes
              </div>
            </Col>
          </Row>
        </Content>
        <Footer
          style={{
            height: 13,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
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
