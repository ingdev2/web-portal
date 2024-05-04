"use client";

import React from "react";

import { Card, Col, Row } from "antd";

const HomepageOptions: React.FC = () => {
  return (
    <div style={{ display: "flex", flexFlow: "column wrap", width: "100%" }}>
      <Row justify={"center"} align={"top"} gutter={[24, 24]}>
        <Col span={12}>
          <Card>Card content 1</Card>
          <Card>Card content 3</Card>
        </Col>
        <Col span={12}>
          <Card>Card content 2</Card>
          <Card>Card content 4</Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomepageOptions;
