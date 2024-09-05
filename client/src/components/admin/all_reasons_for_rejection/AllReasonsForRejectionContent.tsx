"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Button } from "antd";
import CustomDashboardLayout from "@/components/common/custom_dashboard_layout/CustomDashboardLayout";
import CustomTableFiltersAndSorting from "@/components/common/custom_table_filters_and_sorting/CustomTableFiltersAndSorting";
import EditReasonForRejectionForm from "./edit_reason_for_rejection/EditReasonForRejectionForm";
import { tableColumnsAllReasonsForRejection } from "./table_columns_all_reasons_for_rejection/TableColumnsAllReasonsForRejection";
import ModalReasonForRejectionDetails from "./modal_reason_for_rejection_details/ModalReasonForRejectionDetails";
import CreateButton from "./create_button/CreateButton";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { FaEdit } from "react-icons/fa";

import { setTableRowId } from "@/redux/features/common/modal/modalSlice";

import {
  setIdReasonForRejection,
  setRejectionTitleReasonForRejection,
  setReasonMessageReasonForRejection,
  setErrorsReasonForRejection,
  setResetReasonForRejection,
} from "@/redux/features/medical_req/reason_for_rejection/reasonForRejection";

import { useGetAllMedicalReqReasonsForRejectionQuery } from "@/redux/apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";

const AllReasonsForRejectionContent: React.FC = () => {
  const dispatch = useAppDispatch();

  const NOT_REGISTER: string = "NO REGISTRA";

  const [isEditVisibleLocalState, setIsEditVisibleLocalState] = useState(false);
  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);
  const [selectedRowDataLocalState, setSelectedRowDataLocalState] =
    useState<MedicalReqReasonForRejection | null>(null);

  const [isSubmittingRegisterPage, setIsSubmittingRegisterPage] =
    useState(false);

  const [successMessage, setSuccessMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  const reasonForRejectionErrorsState = useAppSelector(
    (state) => state.reasonForRejection.errors
  );

  const {
    data: allReasonsForRejectionData,
    isLoading: allReasonsForRejectionLoading,
    isFetching: allReasonsForRejectionFetching,
    error: allReasonsForRejectionError,
    refetch: refecthAllReasonsForRejection,
  } = useGetAllMedicalReqReasonsForRejectionQuery(null);

  const transformedData = Array.isArray(allReasonsForRejectionData)
    ? allReasonsForRejectionData.map((req: any) => ({
        ...req,
      }))
    : [];

  const handleClickSeeMore = (record: MedicalReqReasonForRejection) => {
    dispatch(setTableRowId(""));
    setSelectedRowDataLocalState(record);

    dispatch(setTableRowId(record.id));

    setIsModalVisibleLocalState(true);

    refecthAllReasonsForRejection();

    dispatch(setIdReasonForRejection(record?.id));
    dispatch(setRejectionTitleReasonForRejection(record?.rejection_title));
    dispatch(setReasonMessageReasonForRejection(record?.reason_message));
  };

  const handleButtonUpdate = () => {
    refecthAllReasonsForRejection();
  };

  return (
    <>
      {showErrorMessage && (
        <CustomMessage
          typeMessage="error"
          message={
            reasonForRejectionErrorsState?.toString() ||
            "¡Error en la petición!"
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
          key={"custom-modal-reason-for-rejection-details"}
          widthCustomModalNoContent={"69%"}
          minWidthCustomModalNoContent="321px"
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            refecthAllReasonsForRejection();

            setIsModalVisibleLocalState(false);
            setIsEditVisibleLocalState(false);

            setSelectedRowDataLocalState(null);
            dispatch(setResetReasonForRejection());
          }}
          contentCustomModal={
            <>
              {!isEditVisibleLocalState ? (
                <>
                  <ModalReasonForRejectionDetails
                    titleDescription="Detalle completo de motivo de rechazo"
                    labelReasonForRejectionId="Id"
                    selectedReasonForRejectionId={selectedRowDataLocalState?.id}
                    labelReasonForRejectionTitle="Titulo de motivo"
                    selectedReasonForRejectionTitle={
                      selectedRowDataLocalState?.rejection_title
                    }
                    labelReasonForRejectionMessage="Mensaje a mostrar de motivo de rechazo"
                    selectedReasonForRejectionMessage={
                      selectedRowDataLocalState?.reason_message
                    }
                  />

                  <Button
                    className="edit-reason-for-rejection-button"
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
                      &nbsp; Editar motivo de rechazo
                    </div>
                  </Button>
                </>
              ) : (
                <EditReasonForRejectionForm />
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
              columnsCustomTable={tableColumnsAllReasonsForRejection({
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

export default AllReasonsForRejectionContent;
