"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import EditCompanyAreaForm from "./edit_company_area/EditCompanyAreaForm";
import { tableColumnsAllCompanyAreas } from "./table_columns_all_company_areas/TableColumnsAllCompanyAreas";
import ModalCompanyAreaDetails from "./modal_company_area_details/ModalCompanyAreaDetails";
import CreateButton from "./create_button/CreateButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { FaEdit } from "react-icons/fa";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";

import {
  setIdCompanyArea,
  setNameCompanyArea,
  setErrorsCompanyArea,
  setResetCompanyArea,
} from "@/redux/features/company_area/companyAreaSlice";

import { useGetAllCompanyAreaQuery } from "@/redux/apis/company_area/companyAreaApi";

const AllCompanyAreasContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const [isEditVisibleLocalState, setIsEditVisibleLocalState] = useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<CompanyArea | null>(null);

  const [isSubmittingRegisterPage, setIsSubmittingRegisterPage] =
    useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const companyAreaErrorsState = useAppSelector(
    (state) => state.companyArea.errors
  );

  const {
    data: allCompanyAreasData,
    isLoading: allCompanyAreasLoading,
    isFetching: allCompanyAreasFetching,
    error: allCompanyAreasError,
    refetch: refecthAllCompanyAreas,
  } = useGetAllCompanyAreaQuery(null);

  const transformedData = Array.isArray(allCompanyAreasData)
    ? allCompanyAreasData.map((req: any) => ({
        ...req,
      }))
    : [];

  const handleClickSeeMore = (record: CompanyArea) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllCompanyAreas();

    dispatch(setIdCompanyArea(record?.id));
    dispatch(setNameCompanyArea(record?.name));
  };

  const handleButtonUpdate = () => {
    refecthAllCompanyAreas();
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            companyAreaErrorsState?.toString() || "¡Error en la petición!"
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
          key={"custom-modal-company-area-details"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllCompanyAreas();

            setIsModalVisibleLocalState(false);
            setIsEditVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setResetCompanyArea());
          }}
          contentCustomModal={
            <>
              {!isEditVisibleLocalState ? (
                <>
                  <ModalCompanyAreaDetails
                    titleDescription="Detalle completo de área empresa"
                    labelCompanyAreaId="Id"
                    selectedCompanyAreaId={selectedRowDataLocalState?.id}
                    labelCompanyAreaName="Nombre"
                    selectedCompanyAreaName={selectedRowDataLocalState?.name}
                  />

                  <Button
                    className="edit-company-area-button"
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
                      &nbsp; Editar área de empresa
                    </div>
                  </Button>
                </>
              ) : (
                <EditCompanyAreaForm />
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
              columnsCustomTable={tableColumnsAllCompanyAreas({
                handleClickSeeMore: handleClickSeeMore,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default AllCompanyAreasContent;
