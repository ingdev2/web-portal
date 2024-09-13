"use client";

import React from "react";

import { DatePicker } from "antd";
import dayjs from "dayjs";

const CustomDatePicker: React.FC<{
  onChangeDateCustomDatePicker: (
    date: any,
    dateString: string | string[]
  ) => void;
}> = ({ onChangeDateCustomDatePicker }) => {
  const DATE_FORMAT = "YYYY-MM-DD";

  return (
    <DatePicker
      className="custom-date-picker"
      placeholder="Seleccionar fecha"
      style={{
        width: "100%",
      }}
      format={{
        format: DATE_FORMAT,
        // type: "mask",
      }}
      minDate={dayjs().subtract(130, "year")}
      disabledDate={(current) => current && current > dayjs().endOf("day")}
      // mode="date"
      size="middle"
      allowClear
      onChange={onChangeDateCustomDatePicker}
      popupStyle={{
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
    />
  );
};

export default CustomDatePicker;
