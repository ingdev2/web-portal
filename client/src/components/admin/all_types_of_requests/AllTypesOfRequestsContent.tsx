"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import EditTypeOfRequestForm from "./edit_type_of_request/EditTypeOfRequestForm";
import { tableColumnsAllTypesOfRequests } from "./table_columns_all_types_of_requests/TableColumnsAllTypesOfRequests";
import ModalTypeOfRequestDetails from "./modal_type_of_request_details/ModalTypeOfRequestDetails";
import CreateButton from "./create_button/CreateButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { FaEdit } from "react-icons/fa";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";

import {
  setIdTypeOfMedicalRequest,
  setNameTypeOfMedicalRequest,
  setErrorsTypeOfMedicalRequest,
  setResetTypeOfMedicalRequest,
} from "@/redux/features/medical_req/type_of_medical_request/typeOfMedicalRequest";

import {
  useGetAllMedicalReqTypesAdminDashboardQuery,
  useBanMedicalReqTypeMutation,
} from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";

const AllTypesOfRequestsContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const [isEditVisibleLocalState, setIsEditVisibleLocalState] = useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<MedicalReqType | null>(null);

  const [isSubmittingBan, setIsSubmittingBan] = useState(false);
  const [isSubmittingRegisterPage, setIsSubmittingRegisterPage] =
    useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const typeOfRequestErrorsState = useAppSelector(
    (state) => state.typeOfMedicalRequest.errors
  );

  const [
    banTypeOfRequest,
    {
      data: banTypeOfRequestData,
      isLoading: banTypeOfRequestLoading,
      isSuccess: banTypeOfRequestFetching,
      isError: banTypeOfRequestError,
    },
  ] = useBanMedicalReqTypeMutation({
    fixedCacheKey: "banTypeOfRequestData",
  });

  const {
    data: allTypesOfRequestsData,
    isLoading: allTypesOfRequestsLoading,
    isFetching: allTypesOfRequestsFetching,
    error: allTypesOfRequestsError,
    refetch: refecthAllTypesOfRequests,
  } = useGetAllMedicalReqTypesAdminDashboardQuery(null);

  const transformedData = Array.isArray(allTypesOfRequestsData)
    ? allTypesOfRequestsData.map((req: any) => ({
        ...req,
      }))
    : [];

  const handleClickSeeMore = (record: MedicalReqType) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllTypesOfRequests();

    dispatch(setIdTypeOfMedicalRequest(record?.id));
    dispatch(setNameTypeOfMedicalRequest(record?.name));
  };

  const handleOnChangeSwitch = async (record: MedicalReqType) => {
    try {
      setIsSubmittingBan(true);

      const response: any = await banTypeOfRequest({
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
          dispatch(setErrorsTypeOfMedicalRequest(errorMessage[0]));

          setShowErrorMessage(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsTypeOfMedicalRequest(errorMessage));

          setShowErrorMessage(true);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      refecthAllTypesOfRequests();

      setIsSubmittingBan(false);
    }
  };

  const handleButtonUpdate = () => {
    refecthAllTypesOfRequests();
  };

  const handleButtonClick = () => {
    setSuccessMessage("");
    setShowSuccessMessage(false);

    dispatch(setErrorsTypeOfMedicalRequest([]));
    setShowErrorMessage(false);
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            typeOfRequestErrorsState?.toString() || "¡Error en la petición!"
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
          key={"custom-modal-type-of-request-details"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllTypesOfRequests();

            setIsModalVisibleLocalState(false);
            setIsEditVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setResetTypeOfMedicalRequest());
          }}
          contentCustomModal={
            <>
              {!isEditVisibleLocalState ? (
                <>
                  <ModalTypeOfRequestDetails
                    titleDescription="Detalle completo de tipo de solicitud"
                    labelTypeOfRequestId="Id"
                    selectedTypeOfRequestId={selectedRowDataLocalState?.id}
                    labelTypeOfRequestName="Nombre"
                    selectedTypeOfRequestName={selectedRowDataLocalState?.name}
                  />

                  <Button
                    className="edit-type-of-request-button"
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
                      &nbsp; Editar tipo de solicitud
                    </div>
                  </Button>
                </>
              ) : (
                <EditTypeOfRequestForm />
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
              columnsCustomTable={tableColumnsAllTypesOfRequests({
                handleClickSeeMore: handleClickSeeMore,
                handleOnChangeSwitch: handleOnChangeSwitch,
                onClickSwitch: handleButtonClick,
                isLoadingSwitch: isSubmittingBan,
              })}
              onClickUpdateCustomTable={handleButtonUpdate}
            />
          </div>
        }
      />
    </>
  );
};

export default AllTypesOfRequestsContent;
