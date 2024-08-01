"use client";

import React, { useState } from "react";

import type { TableColumnsType, TableProps } from "antd";
import { Button, Space, Table } from "antd";
import { FaFilterCircleXmark } from "react-icons/fa6";
import { FaSort } from "react-icons/fa";
import { LuListRestart } from "react-icons/lu";

type GetSingle<T> = T extends (infer U)[] ? U : never;

type OnChange = NonNullable<TableProps<MedicalReq>["onChange"]>;
type Filters = Parameters<OnChange>[1];
type Sorts = GetSingle<Parameters<OnChange>[2]>;

const CustomTableFiltersAndSorting: React.FC<{
  dataCustomTable: MedicalReq[];
  column1TitleCustomTable: string;
  column1KeyAndIndexCustomTable: string;
  column1WidthCustomTable: string;
  column1FiltersCustomTable?: {
    text: string;
    value: React.Key;
  }[];
  column1OnFilterCustomTable?: (
    value: boolean | React.Key,
    record: MedicalReq
  ) => boolean;
  column1SorterCustomTable?: (a: MedicalReq, b: MedicalReq) => number;
  column2TitleCustomTable: string;
  column2KeyAndIndexCustomTable: string;
  column2WidthCustomTable: string;
  column2FiltersCustomTable?: {
    text: string;
    value: React.Key;
  }[];
  column2OnFilterCustomTable?: (
    value: boolean | React.Key,
    record: MedicalReq
  ) => boolean;
  column2SorterCustomTable?: (a: MedicalReq, b: MedicalReq) => number;
  column3TitleCustomTable: string;
  column3KeyAndIndexCustomTable: string;
  column3WidthCustomTable: string;
  column3FiltersCustomTable?: {
    text: string;
    value: React.Key;
  }[];
  column3OnFilterCustomTable?: (
    value: boolean | React.Key,
    record: MedicalReq
  ) => boolean;
  column3SorterCustomTable?: (a: MedicalReq, b: MedicalReq) => number;
  column4TitleCustomTable: string;
  column4KeyAndIndexCustomTable: string;
  column4WidthCustomTable: string;
  column4FiltersCustomTable?: {
    text: string;
    value: React.Key;
  }[];
  column4OnFilterCustomTable?: (
    value: boolean | React.Key,
    record: MedicalReq
  ) => boolean;
  column4SorterCustomTable?: (a: MedicalReq, b: MedicalReq) => number;
}> = ({
  dataCustomTable,
  column1TitleCustomTable,
  column1KeyAndIndexCustomTable,
  column1WidthCustomTable,
  column1FiltersCustomTable,
  column1OnFilterCustomTable,
  column1SorterCustomTable,
  column2TitleCustomTable,
  column2KeyAndIndexCustomTable,
  column2WidthCustomTable,
  column2FiltersCustomTable,
  column2OnFilterCustomTable,
  column2SorterCustomTable,
  column3TitleCustomTable,
  column3KeyAndIndexCustomTable,
  column3WidthCustomTable,
  column3FiltersCustomTable,
  column3OnFilterCustomTable,
  column3SorterCustomTable,
  column4TitleCustomTable,
  column4KeyAndIndexCustomTable,
  column4WidthCustomTable,
  column4FiltersCustomTable,
  column4OnFilterCustomTable,
  column4SorterCustomTable,
}) => {
  const [filteredInfo, setFilteredInfo] = useState<Filters>({});
  const [sortedInfo, setSortedInfo] = useState<Sorts>({});

  const handleChange: OnChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter as Sorts);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearSorting = () => {
    setSortedInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const columns: TableColumnsType<MedicalReq> = [
    {
      title: column1TitleCustomTable,
      key: column1KeyAndIndexCustomTable,
      dataIndex: column1KeyAndIndexCustomTable,
      width: column1WidthCustomTable,
      filters: column1FiltersCustomTable,
      filteredValue: filteredInfo[column1KeyAndIndexCustomTable] || null,
      onFilter: column1OnFilterCustomTable,
      sorter: column1SorterCustomTable,
      sortOrder:
        sortedInfo.columnKey === column1KeyAndIndexCustomTable
          ? sortedInfo.order
          : null,
      ellipsis: true,
    },
    {
      title: column2TitleCustomTable,
      key: column2KeyAndIndexCustomTable,
      dataIndex: column2KeyAndIndexCustomTable,
      width: column2WidthCustomTable,
      filters: column2FiltersCustomTable,
      filteredValue: filteredInfo[column2KeyAndIndexCustomTable] || null,
      onFilter: column2OnFilterCustomTable,
      sorter: column2SorterCustomTable,
      sortOrder:
        sortedInfo.columnKey === column2KeyAndIndexCustomTable
          ? sortedInfo.order
          : null,
      ellipsis: true,
    },
    {
      title: column3TitleCustomTable,
      key: column3KeyAndIndexCustomTable,
      dataIndex: column3KeyAndIndexCustomTable,
      width: column3WidthCustomTable,
      filters: column3FiltersCustomTable,
      filteredValue: filteredInfo[column3KeyAndIndexCustomTable] || null,
      onFilter: column3OnFilterCustomTable,
      sorter: column3SorterCustomTable,
      sortOrder:
        sortedInfo.columnKey === column3KeyAndIndexCustomTable
          ? sortedInfo.order
          : null,
      ellipsis: true,
    },
    {
      title: column4TitleCustomTable,
      key: column4KeyAndIndexCustomTable,
      dataIndex: column4KeyAndIndexCustomTable,
      width: column4WidthCustomTable,
      filters: column4FiltersCustomTable,
      filteredValue: filteredInfo[column4KeyAndIndexCustomTable] || null,
      onFilter: column4OnFilterCustomTable,
      sorter: column4SorterCustomTable,
      sortOrder:
        sortedInfo.columnKey === column4KeyAndIndexCustomTable
          ? sortedInfo.order
          : null,
      ellipsis: true,
    },
  ];

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "row wrap",
          justifyContent: "flex-start",
          alignContent: "flex-start",
          alignItems: "flex-start",
          paddingBlock: "7px",
        }}
      >
        <Space direction="horizontal" size={"small"}>
          <Button
            style={{
              display: "flex",
              flexFlow: "row wrap",
              color: "#015E90",
              borderColor: "#015E90",
              fontWeight: "bold",
              borderRadius: 22,
              borderWidth: 2,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingInline: 7,
              paddingBlock: 7,
            }}
            size="small"
            icon={<FaFilterCircleXmark />}
            onClick={clearFilters}
          >
            Quitar fil.
          </Button>
          <Button
            style={{
              display: "flex",
              flexFlow: "row wrap",
              color: "#015E90",
              borderColor: "#015E90",
              fontWeight: "bold",
              borderRadius: 22,
              borderWidth: 2,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingInline: 7,
              paddingBlock: 7,
            }}
            size="small"
            icon={<FaSort />}
            onClick={clearSorting}
          >
            Quitar orde.
          </Button>
          <Button
            style={{
              display: "flex",
              flexFlow: "row wrap",
              color: "#960202",
              borderColor: "#960202",
              fontWeight: "bold",
              borderRadius: 22,
              borderWidth: 2,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              paddingInline: 7,
              paddingBlock: 7,
            }}
            size="small"
            icon={<LuListRestart />}
            onClick={clearAll}
          >
            Quitar todo
          </Button>
        </Space>
      </div>

      <Table
        size="small"
        style={{
          marginBlock: "7px",
        }}
        scroll={{
          //   x: "max-content",
          //   y: "max-content",
          scrollToFirstRowOnChange: true,
        }}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={dataCustomTable}
        onChange={handleChange}
        footer={undefined}
        pagination={{
          pageSize: 8,
          size: "default",
          position: ["bottomCenter"],
        }}
      />
    </>
  );
};

export default CustomTableFiltersAndSorting;
