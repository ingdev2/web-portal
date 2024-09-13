"use client";

import React from "react";

import { DatePicker } from "antd";
import { TimeRangePickerProps } from "antd/lib";
import dayjs from "dayjs";

const CustomDoubleDatePicker: React.FC<{
  onChangeDateCustomDoubleDatePicker:
    | ((dates: any, dateStrings: [string, string]) => void)
    | undefined;
}> = ({ onChangeDateCustomDoubleDatePicker }) => {
  const DATE_FORMAT = "YYYY-MM-DD";

  const { RangePicker } = DatePicker;

  const rangePresets: TimeRangePickerProps["presets"] = [
    {
      label: "Últimos 3 meses",
      value: [dayjs().subtract(3, "month"), dayjs()],
    },
    {
      label: "Últimos 6 meses",
      value: [dayjs().subtract(6, "month"), dayjs()],
    },
    { label: "Último año", value: [dayjs().subtract(1, "year"), dayjs()] },
    { label: "Últimos 2 años", value: [dayjs().subtract(2, "year"), dayjs()] },
    {
      label: "Todos los registros",
      value: [dayjs().subtract(30, "year"), dayjs()],
    },
  ];

  return (
    <RangePicker
      className="custom-double-date-picker"
      placeholder={["Fecha inicial", "Fecha final"]}
      style={{
        width: "100%",
        height: "100%",
      }}
      format={{
        format: DATE_FORMAT,
        // type: "mask",
      }}
      minDate={dayjs().subtract(130, "year")}
      disabledDate={(current) => current && current > dayjs().endOf("day")}
      size="middle"
      allowClear
      presets={rangePresets}
      onChange={onChangeDateCustomDoubleDatePicker}
      showTime={{ format: "HH" }}
      placement="bottomRight"
    />
  );
};

export default CustomDoubleDatePicker;
