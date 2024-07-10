"use client";

import React, { ReactNode } from "react";

import { Layout } from "antd";

const CustomLayout: React.FC<{
  customLayoutBackground: string;
  customLayoutHeader: ReactNode;
  customLayoutContent: ReactNode;
  customLayoutFooter: any;
}> = ({
  customLayoutBackground,
  customLayoutHeader,
  customLayoutContent,
  customLayoutFooter,
}) => {
  const { Header, Content, Footer } = Layout;

  return (
    <Layout
      className="custom-layout"
      style={{
        width: "100%",
        height: "100%",
        minWidth: "371px",
        display: "flex",
        flexFlow: "column wrap",
        backgroundColor: "transparent",
        margin: "0px",
        padding: "0px",
      }}
    >
      <div
        className="custom-layout-background"
        style={{
          position: "fixed",
          width: "100%",
          height: "100%",
          backgroundImage: customLayoutBackground,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
          margin: "0px",
          padding: "0px",
        }}
      />
      <Header
        className="custom-layout-header"
        style={{
          minWidth: "371px",
          position: "sticky",
          display: "flex",
          flexFlow: "column wrap",
          alignContent: "center",
          backgroundColor: "#015E90",
          top: "0px",
          padding: "0 54px",
          margin: "0px",
          zIndex: 1,
        }}
      >
        {customLayoutHeader}
      </Header>
      <Content
        style={{
          minWidth: "371px",
          display: "flex",
          flexFlow: "column wrap",
          alignItems: "center",
          paddingBlock: "13px",
        }}
      >
        {customLayoutContent}
      </Content>
      <Footer
        style={{
          minWidth: "371px",
          display: "flex",
          flexFlow: "column wrap",
          justifyContent: "center",
          alignItems: "center",
          height: "13px",
          backgroundColor: "transparent",
          bottom: "0px",
        }}
      >
        {customLayoutFooter}
      </Footer>
    </Layout>
  );
};

export default CustomLayout;
