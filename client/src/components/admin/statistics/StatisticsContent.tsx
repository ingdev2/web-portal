"use client";

import React, { useMemo, useState } from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomDonutPlot from "@/components/common/custom_donut_plot/CustomDonutPlot";
import FilterOptions from "./filter_options/FilterOptions";
import { Col, DatePicker } from "antd";
import { titleStyleCss } from "@/theme/text_styles";

import dayjs from "dayjs";

import {
  useMedicalReqData,
  useMedicalReqDataByApplicantType,
  useMedicalReqDataByStatus,
  useMedicalReqDataByType,
} from "./users_medical_req/users_medical_req_data";

const StatisticsContent: React.FC<{}> = ({}) => {
  const DATE_FORMAT = "YYYY-MM";

  const [filterOption, setFilterOption] = useState<FilterOption | "">("");
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  var year = selectedDate?.year();
  var month = selectedDate?.month() ? selectedDate?.month() + 1 : undefined;

  const { allMedicalReqData } = useMedicalReqData(year, month);

  const { clinicHistoryData, medicalDisabilityData, medicalOrderData } =
    useMedicalReqDataByType(year, month);

  const {
    createdData,
    visualizedData,
    underReviewData,
    deliveredData,
    rejectedData,
    expiredData,
  } = useMedicalReqDataByStatus(year, month);

  const { patientData, epsData, familiarData } =
    useMedicalReqDataByApplicantType(year, month);

  const dataToShow: DataCustomDonutPlot[] = useMemo(() => {
    switch (filterOption) {
      case "TIPO":
        return [
          { type: "Historia Clínica", value: clinicHistoryData?.length || 0 },
          {
            type: "Discapacidad Médica",
            value: medicalDisabilityData?.length || 0,
          },
          { type: "Orden Médica", value: medicalOrderData?.length || 0 },
        ];
      case "ESTADO":
        return [
          { type: "Creado", value: createdData?.length || 0 },
          { type: "Visualizado", value: visualizedData?.length || 0 },
          { type: "En Revisión", value: underReviewData?.length || 0 },
          { type: "Entregado", value: deliveredData?.length || 0 },
          { type: "Rechazado", value: rejectedData?.length || 0 },
          { type: "Expirado", value: expiredData?.length || 0 },
        ];
      case "SOLICITANTE":
        return [
          { type: "Paciente", value: patientData?.length || 0 },
          { type: "EPS", value: epsData?.length || 0 },
          { type: "Familiar Autorizado", value: familiarData?.length || 0 },
        ];
      default:
        return [
          {
            type: "Todas las solicitudes",
            value: allMedicalReqData?.length || 0,
          },
        ];
    }
  }, [
    filterOption,
    selectedDate,
    clinicHistoryData,
    medicalDisabilityData,
    medicalOrderData,
    createdData,
    visualizedData,
    underReviewData,
    deliveredData,
    rejectedData,
    expiredData,
    patientData,
    epsData,
    familiarData,
    allMedicalReqData,
  ]);

  const handleFilterByDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  return (
    <>
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "row wrap",
            }}
          >
            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{
                width: "100%",
              }}
            >
              <h3
                style={{
                  width: "100%",
                  ...titleStyleCss,
                  textAlign: "center",
                  marginBlock: "7px",
                }}
              >
                Seleccione una opción de filtrado:
              </h3>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "column wrap",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  marginBlock: "7px",
                }}
              >
                <FilterOptions
                  widthFilterOptions="72%"
                  filterOption={filterOption}
                  setFilterOption={setFilterOption}
                />
              </div>
            </Col>

            <Col
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{
                width: "100%",
              }}
            >
              <h3
                style={{
                  width: "100%",
                  ...titleStyleCss,
                  textAlign: "center",
                  marginBlock: "7px",
                }}
              >
                Seleccione una fecha:
              </h3>

              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexFlow: "column wrap",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  marginBlock: "7px",
                }}
              >
                <DatePicker
                  className="custom-date-picker-data-filter"
                  placeholder="Seleccionar fecha"
                  onChange={handleFilterByDateChange}
                  picker="month"
                  format={{
                    format: DATE_FORMAT,
                    // type: "mask",
                  }}
                  minDate={dayjs().subtract(1, "year")}
                  disabledDate={(current) =>
                    current && current > dayjs().endOf("day")
                  }
                  style={{
                    width: "50%",
                    display: "flex",
                    flexFlow: "row wrap",
                  }}
                  popupStyle={{
                    alignItems: "center",
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                  allowClear
                />
              </div>
            </Col>

            <div
              style={{
                width: "100%",
                height: "270px",
                display: "flex",
                flexFlow: "column wrap",
                marginBlock: "7px",
              }}
            >
              <CustomDonutPlot dataCustomDonutPlot={dataToShow} />
            </div>
          </div>
        }
      />
    </>
  );
};

export default StatisticsContent;
