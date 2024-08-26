"use client";

import React from "react";

import { DatePicker } from "antd";

import dayjs from "dayjs";

const CustomDatePickerOneDate: React.FC<{
  onChangeDateCustomDatePicker: (
    date: dayjs.Dayjs,
    dateString: string | string[]
  ) => void;
  dateFormatCustomDatePicker: string;
  pickerFormatCustomDatePicker: "year" | "month";
  placeholderCustomDatePicker: string;
  marginBlockCustomDatePicker: string | number;
}> = ({
  onChangeDateCustomDatePicker,
  dateFormatCustomDatePicker,
  pickerFormatCustomDatePicker,
  placeholderCustomDatePicker,
  marginBlockCustomDatePicker,
}) => {
  return (
    <DatePicker
      className="custom-date-picker-one-date-filter"
      placeholder={placeholderCustomDatePicker}
      onChange={onChangeDateCustomDatePicker}
      picker={pickerFormatCustomDatePicker}
      format={{
        format: dateFormatCustomDatePicker,
        // type: "mask",
      }}
      minDate={dayjs().subtract(1, "year")}
      disabledDate={(current) => current && current > dayjs().endOf("day")}
      style={{
        width: "50%",
        display: "flex",
        flexFlow: "row wrap",
        marginTop: marginBlockCustomDatePicker,
      }}
      popupStyle={{
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}
      allowClear
    />
  );
};

export default CustomDatePickerOneDate;
