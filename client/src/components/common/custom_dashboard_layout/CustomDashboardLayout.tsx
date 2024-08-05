"use client";

import React, { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import AdminHeaderLayout from "@/components/admin/header_layout_dashboard/AdminHeaderLayout";
import { Button, Col, Layout, Menu, Row, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ItemKeys } from "./enums/item_names_and_keys.enums";
import { useMenuItems } from "@/components/admin/items_menu_dashboard_admin/items_menu_dashboard_admin";
import {
  setSelectedKey,
  setSelectedOpenKeys,
} from "@/redux/features/common/modal/modalSlice";

const { Header, Content, Footer, Sider } = Layout;

const CustomDashboardLayout: React.FC<{
  customLayoutHeader?: ReactNode;
  customLayoutContent: ReactNode;
  customLayoutFooter?: any;
}> = ({ customLayoutHeader, customLayoutContent, customLayoutFooter }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useMenuItems();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKeyState = useAppSelector((state) => state.modal.selectedKey);
  const selectedOpenKeysState = useAppSelector(
    (state) => state.modal.selectedOpenKeys
  );

  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = (key: string) => {
    dispatch(setSelectedKey(key));

    router.push(`/admin/dashboard/${key}`);
  };

  const handleOpenChange: any = (keys: string[]) => {
    dispatch(setSelectedOpenKeys(keys));
  };

  return (
    <Layout
      className="custom-dashboard-layout-sider"
      style={{
        minWidth: "777px",
        minHeight: "100vh",
        backgroundColor: "transparent",
        margin: "0px",
        padding: "0px",
        overflow: "auto",
      }}
    >
      <Sider
        className="custom--dashboard-layout-sider"
        breakpoint="md"
        collapsedWidth={54}
        width={173}
        onBreakpoint={(broken) => {}}
        onCollapse={(collapsed, type) => {}}
        collapsed={collapsed}
        collapsible
        trigger={null}
        style={{
          backgroundColor: "#013B5A",
          margin: "0px",
          padding: "0px",
          overflow: "auto",
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
            paddingBlock: "22px",
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
          mode="inline"
          items={items}
          selectedKeys={[selectedKeyState]}
          defaultSelectedKeys={[ItemKeys.ITEM_REQUESTS_KEY]}
          openKeys={selectedOpenKeysState}
          onOpenChange={handleOpenChange}
          onClick={({ key }) => handleMenuClick(key)}
          style={{
            margin: "0px",
            padding: "0px",
          }}
        />
      </Sider>
      <Layout
        className="custom-dashboard-layout-components"
        style={{
          display: "flex",
          flexFlow: "column wrap",
          backgroundColor: "#DFEBF2",
          margin: "0px",
          padding: "0px",
        }}
      >
        <Header
          className="custom--dashboard-layout-header"
          style={{
            display: "flex",
            flexFlow: "row wrap",
            background: "#013B5A",
            alignItems: "center",
            padding: "0px",
            margin: "0px",
          }}
        >
          <Row
            style={{
              width: "100%",
              height: "100%",
            }}
          >
            <Col
              xs={12}
              sm={6}
              md={6}
              lg={6}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                alignContent: "center",
                justifyContent: "flex-start",
                paddingLeft: "17px",
              }}
            >
              <Button
                type="text"
                icon={
                  collapsed ? (
                    <MenuUnfoldOutlined style={{ color: "#013B5A" }} />
                  ) : (
                    <MenuFoldOutlined style={{ color: "#013B5A" }} />
                  )
                }
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  width: "37px",
                  height: "37px",
                  backgroundColor: "#00B5E8",
                }}
              />
            </Col>

            <Col
              xs={12}
              sm={18}
              md={18}
              lg={18}
              style={{
                display: "flex",
                flexFlow: "row wrap",
                justifyContent: "flex-end",
                alignContent: "center",
                paddingRight: "17px",
              }}
            >
              {customLayoutHeader || <AdminHeaderLayout />}
            </Col>
          </Row>
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
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              padding: "13px",
            }}
          >
            {customLayoutContent}
          </div>
        </Content>
        <Footer
          className="custom--dashboard-layout-footer"
          style={{
            height: "13px",
            display: "flex",
            flexFlow: "column wrap",
            textAlign: "center",
            backgroundColor: colorBgContainer,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {customLayoutFooter ||
            `Clínica Bonnadona © ${new Date().getFullYear()}`}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default CustomDashboardLayout;
