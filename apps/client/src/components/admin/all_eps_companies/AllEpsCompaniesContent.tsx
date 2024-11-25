"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import EditEpsCompanyForm from "./edit_eps_company/EditEpsCompanyForm";
import { tableColumnsAllEpsCompanies } from "./table_columns_all_eps_companies/TableColumnsAllEpsCompanies";
import ModalEpsUserDetails from "./modal_eps_company_details/ModalEpsCompanyDetails";
import CreateButton from "./create_button/CreateButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { FaEdit } from "react-icons/fa";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";

import {
  setIdEpsCompany,
  setNitEpsCompany,
  setNameEpsCompany,
  setMainEmailEpsCompany,
  setErrorsEpsCompany,
  setResetEpsCompany,
} from "@/redux/features/eps_company/epsCompanySlice";

import {
  useUpdateEpsFromHosvitalMutation,
  useGetAllEpsCompanyAdminDashboardQuery,
  useBanEpsCompanyMutation,
} from "@/redux/apis/eps_company/epsCompanyApi";

const AllEpsCompaniesContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const [isEditVisibleLocalState, setIsEditVisibleLocalState] = useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<EpsCompany | null>(null);

  const [isSubmittingUpdate, setIsSubmittingUpdate] = useState(false);
  const [isSubmittingBan, setIsSubmittingBan] = useState(false);
  const [isSubmittingRegisterPage, setIsSubmittingRegisterPage] =
    useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const epsCompanyErrorsState = useAppSelector(
    (state) => state.epsCompany.errors
  );

  const [
    updateEpsFromHosvital,
    {
      data: updateEpsFromHosvitalData,
      isLoading: updateEpsFromHosvitalLoading,
      isSuccess: updateEpsFromHosvitalSuccess,
      isError: updateEpsFromHosvitalError,
    },
  ] = useUpdateEpsFromHosvitalMutation({
    fixedCacheKey: "updateEpsFromHosvital",
  });

  const [
    banEpsCompany,
    {
      data: banEpsCompanyData,
      isLoading: banEpsCompanyLoading,
      isSuccess: banEpsCompanyFetching,
      isError: banEpsCompanyError,
    },
  ] = useBanEpsCompanyMutation({
    fixedCacheKey: "banEpsCompanyData",
  });

  const {
    data: allEpsCompaniesData,
    isLoading: allEpsCompaniesLoading,
    isFetching: allEpsCompaniesFetching,
    error: allEpsCompaniesError,
    refetch: refecthAllEpsCompanies,
  } = useGetAllEpsCompanyAdminDashboardQuery(null);

  const transformedData = Array.isArray(allEpsCompaniesData)
    ? allEpsCompaniesData.map((req: any) => ({
        ...req,
      }))
    : [];

  const handleClickSeeMore = (record: EpsCompany) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllEpsCompanies();

    dispatch(setIdEpsCompany(record?.id));
    dispatch(setNitEpsCompany(record?.nit));
    dispatch(setNameEpsCompany(record?.name));
    dispatch(setMainEmailEpsCompany(record?.main_email));
  };

  const handleUpdateButton = async () => {
    try {
      setIsSubmittingUpdate(true);

      const response: any = await updateEpsFromHosvital(null);

      let updateSuccess = response.data;

      let updateError = response.error;

      if (updateSuccess?.status === 202 && !updateError) {
        const successMessage = updateSuccess?.message;

        setSuccessMessage(successMessage);
        setShowSuccessMessage(true);
      } else {
        const errorMessage = updateError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsEpsCompany(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsEpsCompany(errorMessage));

          setShowErrorMessage(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refecthAllEpsCompanies();

      setIsSubmittingUpdate(false);
    }
  };

  const handleOnChangeSwitch = async (record: EpsCompany) => {
    try {
      setIsSubmittingBan(true);

      const response: any = await banEpsCompany({
        id: record.id,
      });

      let banSuccess = response.data;

      let banError = response.error;

      if (banSuccess?.statusCode === 202 && !banError) {
        const successMessage = banSuccess?.message;

        setSuccessMessage(successMessage);
        setShowSuccessMessage(true);
      } else {
        const errorMessage = banError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsEpsCompany(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsEpsCompany(errorMessage));

          setShowErrorMessage(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refecthAllEpsCompanies();

      setIsSubmittingBan(false);
    }
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);

    dispatch(setErrorsEpsCompany([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            epsCompanyErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessage?.toString() || `Acción realizada correctamente!`
          }
        />
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-request-details-eps-company"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllEpsCompanies();

            setIsModalVisibleLocalState(false);
            setIsEditVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setResetEpsCompany());
          }}
          contentCustomModal={
            <>
              {!isEditVisibleLocalState ? (
                <>
                  <ModalEpsUserDetails
                    titleDescription="Detalle completo de empresa Eps"
                    labelEpsCompanyNit="NIT"
                    selectedEpsCompanyNit={selectedRowDataLocalState?.nit}
                    labelEpsCompanyName="Nombre de empresa"
                    selectedEpsCompanyName={selectedRowDataLocalState?.name}
                    labelEpsCompanyEmail="Email principal"
                    selectedEpsCompanyEmail={
                      selectedRowDataLocalState?.main_email || NOT_REGISTER
                    }
                  />

                  <Button
                    className="edit-eps-company-button"
                    size="large"
                    style={{
                      backgroundColor: "#015E90",
                      color: "#F7F7F7",
                      borderRadius: "31px",
                      paddingInline: "31px",
                      marginBlock: "13px",
                    }}
                    onClick={() => {
                      setIsEditVisibleLocalState(true);
                    }}
                  >
                    <div
                      style={{
                        minWidth: "137px",
                        display: "flex",
                        flexFlow: "row wrap",
                        alignItems: "center",
                        alignContent: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaEdit size={17} />
                      &nbsp; Editar empresa EPS
                    </div>
                  </Button>
                </>
              ) : (
                <EditEpsCompanyForm />
              )}
            </>
          }
        />
      )}

      <CustomDashboardLayout
        customLayoutContent={
          <div
            style={{
              width: "100%",
              display: "flex",
              flexFlow: "column wrap",
            }}
          >
            <CreateButton
              isSubmittingCreateButton={isSubmittingRegisterPage}
              setIsSubmittingCreateButton={setIsSubmittingRegisterPage}
            />

            <CustomTableFiltersAndSorting
              dataCustomTable={transformedData || []}
              columnsCustomTable={tableColumnsAllEpsCompanies({
                handleClickSeeMore: handleClickSeeMore,
                handleOnChangeSwitch: handleOnChangeSwitch,
                onClickSwitch: handleButtonClick,
                isLoadingSwitch: isSubmittingBan,
              })}
              onClickUpdateCustomTable={handleUpdateButton}
            />
          </div>
        }
      />
    </>
  );
};

export default AllEpsCompaniesContent;
