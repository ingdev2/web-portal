"use client";

import React from "react";

import { Select } from "antd";

const FilterOptions: React.FC<FilterOptionProps> = ({
  filterOption,
  setFilterOption,
}) => {
  return (
    <Select
      value={filterOption}
      placeholder="Seleccione una opción de filtrado"
      onChange={(value) => setFilterOption(value)}
    >
      <Select.Option value="">Todas las solicitudes</Select.Option>
      <Select.Option value="TIPO">Tipo de solicitudes</Select.Option>
      <Select.Option value="ESTADO">Estado de solicitudes</Select.Option>
      <Select.Option value="SOLICITANTE">Tipo de solicitante</Select.Option>
    </Select>
  );
};

export default FilterOptions;
