"use client";

import React from "react";

import { Card, Col, Row, Space, Divider } from "antd";

const HomepageOptions: React.FC = () => {
  return (
    <Row justify={"center"} align={"top"} gutter={[16, 16]}>
      <Col xs={12} sm={8} md={8} lg={8}>
        <Card bordered={false}>Card content</Card>
      </Col>
      <Col xs={12} sm={8} md={8} lg={8}>
        <Card bordered={false}>Card content</Card>
      </Col>
      <Col xs={12} sm={8} md={8} lg={8}>
        <Card bordered={false}>Card content</Card>
      </Col>
      <Col xs={12} sm={8} md={8} lg={8}>
        <Card bordered={false}>Card content</Card>
      </Col>
      <Col xs={12} sm={8} md={8} lg={8}>
        <Card bordered={false}>Card content</Card>
      </Col>
    </Row>
  );
};

export default HomepageOptions;
