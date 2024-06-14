"use client";

import React from "react";

import { Select, Col } from "antd";
import { SortRelativesBy } from "./enums/select_sortby.enums";
import { subtitleStyleCss } from "@/theme/text_styles";

const SortByRelatives: React.FC<{
  selectValueToSort: SortRelativesBy;
  handleSelectSortBy: (value: SortRelativesBy) => void;
}> = ({ selectValueToSort, handleSelectSortBy }) => {
  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={24}
      style={{
        width: "100%",
        display: "flex",
        flexFlow: "row wrap",
        justifyContent: "center",
        alignContent: "center",
        paddingBlock: "7px",
      }}
    >
      <h3
        className="title-orderby-relatives"
        style={{
          ...subtitleStyleCss,
          textAlign: "center",
          alignContent: "center",
          justifyContent: "center",
          color: "#0707077F",
          paddingInline: "13px",
        }}
      >
        Ordenar por:
      </h3>

      <Select
        style={{ width: "45%" }}
        value={selectValueToSort}
        onChange={handleSelectSortBy}
      >
        {Object.values(SortRelativesBy).map((sortOption) => (
          <Select.Option key={sortOption} value={sortOption}>
            {sortOption}
          </Select.Option>
        ))}
      </Select>
    </Col>
  );
};

export default SortByRelatives;
