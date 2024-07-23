"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Layout, Menu, theme } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer, Sider } = Layout;

const items = [
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),

  icon: React.createElement(icon),

  label: `navegacion larga ${index + 1}`,
}));

const CustomDashboardLayout: React.FC<{
  //   customLayoutBackground: string;
  //   customLayoutHeader: ReactNode;
  //   customLayoutContent: ReactNode;
  customLayoutFooter: any;
}> = ({
  //   customLayoutBackground,
  //   customLayoutHeader,
  //   customLayoutContent,
  customLayoutFooter,
}) => {
  const router = useRouter();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      className="custom-dashboard-layout"
      style={{
        minWidth: "720px",
        backgroundColor: "transparent",
        margin: "0px",
        padding: "0px",
      }}
    >
      <Sider
        className="custom--dashboard-layout-sider"
        breakpoint="md"
        collapsedWidth="77"
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
        collapsed={collapsed}
        trigger={null}
        style={{
          height: "100vh",
          backgroundColor: "#f2f2f2",
          overflow: "auto",
          margin: "0px",
          padding: "0px",
        }}
      >
        <a
          className="custom--dashboard-layout-logo"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "#f2f2f2",
            marginBlock: "13px",
            paddingBlock: "7px",
            overflow: "hidden",
          }}
          onClick={() => {
            router.replace("/admin/dashboard", { scroll: true });
          }}
        >
          <img
            src={
              collapsed
                ? "/logos/LOGO-ICONO-130-X-130-PX.png"
                : "/logos/LOGO-HORIZONTAL-TRANS-130-X-130-PX.png"
            }
            alt="Logo de Proced"
            style={{
              maxWidth: collapsed ? "45%" : "77%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </a>
        <Menu
          className="custom--dashboard-layout-menu"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={items}
        />
      </Sider>
      <Layout>
        <Header
          className="custom--dashboard-layout-header"
          style={{
            background: colorBgContainer,
            padding: "0px",
            margin: "0px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              width: "45px",
              height: "45px",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: "#DFEBF2",
              marginLeft: "7px",
            }}
          />
        </Header>
        <Content
          className="custom--dashboard-layout-content"
          style={{ margin: "13px 13px" }}
        >
          <div
            style={{
              display: "flex",
              flexFlow: "column wrap",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              backgroundColor: colorBgContainer,
              borderRadius: borderRadiusLG,
              padding: "13px",
            }}
          >
            CONTENIDO AQUÍ
          </div>
        </Content>
        <Footer
          className="custom--dashboard-layout-footer"
          style={{
            display: "flex",
            flexFlow: "column wrap",
            textAlign: "center",
            backgroundColor: colorBgContainer,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            height: "13px",
          }}
        >
          {customLayoutFooter}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CustomDashboardLayout;
