"use client";

import React, { useCallback, useMemo, useState } from "react";

import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomDonutPlot from "@/components/common/custom_donut_plot/CustomDonutPlot";
import { titleStyleCss } from "@/theme/text_styles";

import dayjs from "dayjs";

import {
  useMedicalReqData,
  useMedicalReqByDate,
  useMedicalReqDataByApplicantType,
  useMedicalReqDataByStatus,
  useMedicalReqDataByType,
} from "./users_medical_req/users_medical_req_data";
import FilterOptions from "./filter_options/FilterOptions";
import { Button, DatePicker } from "antd";

const StatisticsContent: React.FC<{}> = ({}) => {
  const DATE_FORMAT = "YYYY-MM";

  const [filterOption, setFilterOption] = useState<FilterOption | "">("");

  const [year, setYear] = useState<number | null>(null);
  const [month, setMonth] = useState<number | null>(null);

  const { filterMedicalReqByDate, refetchFilterMedicalReqByDate } =
    useMedicalReqByDate(year, month);

  const { allMedicalReqData } = useMedicalReqData();

  const { clinicHistoryData, medicalDisabilityData, medicalOrderData } =
    useMedicalReqDataByType();

  const {
    createdData,
    visualizedData,
    underReviewData,
    deliveredData,
    rejectedData,
    expiredData,
  } = useMedicalReqDataByStatus();

  const { patientData, epsData, familiarData } =
    useMedicalReqDataByApplicantType();

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

  const handleMonthChange = useCallback((date: any) => {
    if (date) {
      setYear(date.year());
      setMonth(date.month() + 1);
    } else {
      setYear(null);
      setMonth(null);
    }
  }, []);

  const handleFilter = useCallback(() => {
    refetchFilterMedicalReqByDate();
    console.log(filterMedicalReqByDate);
    console.log({ year, month });
  }, [refetchFilterMedicalReqByDate, filterMedicalReqByDate, year, month]);

  return (
    <>
      <CustomDashboardLayout
        customLayoutContent={
          <>
            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "column wrap",
              }}
            >
              <h2
                style={{
                  width: "100%",
                  ...titleStyleCss,
                  textAlign: "center",
                  marginBlock: "7px",
                }}
              >
                Seleccione una opción de filtrado:
              </h2>
            </div>

            <div
              style={{
                width: "50%",
                display: "flex",
                flexFlow: "column wrap",
                marginBlock: "7px",
              }}
            >
              <FilterOptions
                filterOption={filterOption}
                setFilterOption={setFilterOption}
              />
            </div>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "row wrap",
                gap: "13px",
                marginBlock: "7px",
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              <DatePicker
                className="custom-date-picker-data-filter"
                placeholder="Seleccionar fecha"
                onChange={handleMonthChange}
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
                  width: "31%",
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

              <Button
                className="update-date-filter-button"
                size="middle"
                style={{
                  backgroundColor: "#015E90",
                  color: "#F7F7F7",
                  borderRadius: "31px",
                  paddingInline: "31px",
                }}
                onClick={handleFilter}
              >
                Aplicar filtros
              </Button>
            </div>

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
          </>
        }
      />
    </>
  );
};

export default StatisticsContent;
