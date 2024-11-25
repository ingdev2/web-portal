"use client";

import React, { useMemo, useState } from "react";

import { Col } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomDonutPlot from "@/components/common/custom_donut_plot/CustomDonutPlot";
import FilterOptions from "./filter_options/FilterOptions";
import FilterOptionsByDate from "./filter_options/FilterOptionsByDate";
import CustomDatePickerOneDate from "@/components/common/custom_date_picker/CustomDatePickerOneDate";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import { subtitleStyleCss, titleStyleCss } from "@/theme/text_styles";

import dayjs from "dayjs";

import {
  useGetAverageResponseTimeData,
  useMedicalReqData,
  useMedicalReqDataByApplicantType,
  useMedicalReqDataByStatus,
  useMedicalReqDataByType,
} from "./users_medical_req/users_medical_req_data";

const StatisticsContent: React.FC = () => {
  const DATE_FORMAT_MONTH = "YYYY-MM";
  const DATE_FORMAT_YEAR = "YYYY";

  const [filterOption, setFilterOption] = useState<FilterOption | "">("");
  const [filterByDateOption, setFilterByDateOption] = useState<
    FilterOptionByDate | ""
  >("");
  const [selectedMonthYear, setSelectedMonthYear] =
    useState<dayjs.Dayjs | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(
    undefined
  );

  var year = selectedMonthYear?.year() || selectedYear;
  var month = selectedMonthYear ? selectedMonthYear.month() + 1 : undefined;

  const { allMedicalReqData, isLoadingAllByDate, isFetchingAllByDate } =
    useMedicalReqData(year, month);

  const {
    clinicHistoryData,
    isLoadingClinicHistory,
    isFetchingClinicHistory,
    medicalDisabilityData,
    isLoadingMedicalDisability,
    isFetchingMedicalDisability,
    medicalOrderData,
    isLoadingMedicalOrder,
    isFetchingMedicalOrder,
    mipresExternalConsultationData,
    isLoadingMipresExternalConsultation,
    isFetchingMipresExternalConsultation,
  } = useMedicalReqDataByType(year, month);

  const {
    createdData,
    isLoadingCreatedRequests,
    isFetchingCreatedRequests,
    visualizedData,
    isLoadingVisualizedRequests,
    isFetchingVisualizedRequests,
    underReviewData,
    isLoadingUnderReviewRequests,
    isFetchingUnderReviewRequests,
    deliveredData,
    isLoadingDeliveredRequests,
    isFetchingDeliveredRequests,
    rejectedData,
    isLoadingRejectedRequests,
    isFetchingRejectedRequests,
    expiredData,
    isLoadingExpiredRequests,
    isFetchingExpiredRequests,
  } = useMedicalReqDataByStatus(year, month);

  const {
    patientData,
    isLoadingPatientTypeRequests,
    isFetchingPatientTypeRequests,
    epsData,
    isLoadingEpsTypeRequests,
    isFetchingEpsTypeRequests,
    familiarData,
    isLoadingFamiliarTypeRequests,
    isFetchingFamiliarTypeRequests,
  } = useMedicalReqDataByApplicantType(year, month);

  const isLoadingData =
    isLoadingAllByDate ||
    isFetchingAllByDate ||
    isLoadingClinicHistory ||
    isFetchingClinicHistory ||
    isLoadingMedicalDisability ||
    isFetchingMedicalDisability ||
    isLoadingMedicalOrder ||
    isFetchingMedicalOrder ||
    isLoadingMipresExternalConsultation ||
    isFetchingMipresExternalConsultation ||
    isLoadingCreatedRequests ||
    isFetchingCreatedRequests ||
    isLoadingVisualizedRequests ||
    isFetchingVisualizedRequests ||
    isLoadingUnderReviewRequests ||
    isFetchingUnderReviewRequests ||
    isLoadingDeliveredRequests ||
    isFetchingDeliveredRequests ||
    isLoadingRejectedRequests ||
    isFetchingRejectedRequests ||
    isLoadingExpiredRequests ||
    isFetchingExpiredRequests ||
    isLoadingPatientTypeRequests ||
    isFetchingPatientTypeRequests ||
    isLoadingEpsTypeRequests ||
    isFetchingEpsTypeRequests ||
    isLoadingFamiliarTypeRequests ||
    isFetchingFamiliarTypeRequests;

  const { averageResponseTime } = useGetAverageResponseTimeData();

  const dataToShow: DataCustomDonutPlot[] = useMemo(() => {
    switch (filterOption) {
      case "TIPO":
        return [
          { type: "Historia Clínica", value: clinicHistoryData?.length || 0 },
          {
            type: "Certificado Incapacidad Médica",
            value: medicalDisabilityData?.length || 0,
          },
          { type: "Orden Médica", value: medicalOrderData?.length || 0 },
          {
            type: "MIPRES Consulta Externa",
            value: mipresExternalConsultationData?.length || 0,
          },
        ];
      case "ESTADO":
        return [
          { type: "Creadas", value: createdData?.length || 0 },
          { type: "Visualizadas", value: visualizedData?.length || 0 },
          { type: "En Revisión", value: underReviewData?.length || 0 },
          { type: "Docs. Entregados", value: deliveredData?.length || 0 },
          { type: "Rechazadas", value: rejectedData?.length || 0 },
          { type: "Docs. Expirados", value: expiredData?.length || 0 },
        ];
      case "SOLICITANTE":
        return [
          { type: "Paciente", value: patientData?.length || 0 },
          { type: "EPS", value: epsData?.length || 0 },
          { type: "Familiar", value: familiarData?.length || 0 },
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

  const handleMonthYearChange = (date: dayjs.Dayjs | null) => {
    setSelectedMonthYear(date);

    setSelectedYear(undefined);
  };

  const handleYearChange = (date: dayjs.Dayjs | null) => {
    setSelectedYear(date ? date.year() : undefined);

    setSelectedMonthYear(null);
  };

  return (
    <>
      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              height: "100%",
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
                Filtrado por fecha:
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
                <FilterOptionsByDate
                  widthFilterOptions="72%"
                  filterOption={filterByDateOption}
                  setFilterOption={setFilterByDateOption}
                />

                {filterByDateOption === "AÑO" && (
                  <CustomDatePickerOneDate
                    placeholderCustomDatePicker="Seleccionar año"
                    onChangeDateCustomDatePicker={handleYearChange}
                    dateFormatCustomDatePicker={DATE_FORMAT_YEAR}
                    pickerFormatCustomDatePicker="year"
                    marginBlockCustomDatePicker={"13px"}
                  />
                )}

                {filterByDateOption === "MES" && (
                  <CustomDatePickerOneDate
                    placeholderCustomDatePicker="Seleccionar mes"
                    onChangeDateCustomDatePicker={handleMonthYearChange}
                    dateFormatCustomDatePicker={DATE_FORMAT_MONTH}
                    pickerFormatCustomDatePicker="month"
                    marginBlockCustomDatePicker={"13px"}
                  />
                )}
              </div>
            </Col>

            <div
              style={{
                width: "100%",
                display: "flex",
                flexFlow: "column wrap",
                marginTop: "17px",
                marginBottom: "2px",
                padding: "0px",
              }}
            >
              <h3
                style={{
                  ...subtitleStyleCss,
                  textAlign: "center",
                  padding: "0px",
                  margin: "0px",
                }}
              >
                Tiempo de respuesta promedio:&nbsp;
                <b style={{ color: "#137A2B" }}>{averageResponseTime}</b>
              </h3>
            </div>

            <div
              style={{
                width: "100%",
                height: "270px",
                display: "flex",
                flexFlow: "column wrap",
                marginBlock: "22px",
              }}
            >
              {isLoadingData ? (
                <CustomSpin />
              ) : (
                <CustomDonutPlot dataCustomDonutPlot={dataToShow} />
              )}
            </div>
          </div>
        }
      />
    </>
  );
};

export default StatisticsContent;
