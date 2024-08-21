"use client";

import React from "react";

import { Select } from "antd";

const FilterOptionsByDate: React.FC<FilterOptionByDateProps> = ({
  filterOption,
  setFilterOption,
  widthFilterOptions,
}) => {
  return (
    <Select
      value={filterOption}
      placeholder="Seleccione una opción de filtrado"
      onChange={(value) => setFilterOption(value)}
      style={{ width: widthFilterOptions }}
    >
      <Select.Option value="">Seleccione filtro de fecha</Select.Option>
      <Select.Option value="MES">Filtrar por mes</Select.Option>
      <Select.Option value="AÑO">Filtrar por año</Select.Option>
    </Select>
  );
};

export default FilterOptionsByDate;
