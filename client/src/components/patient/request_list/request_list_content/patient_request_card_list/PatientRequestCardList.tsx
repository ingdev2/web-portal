"use-client";

import React, { useEffect, useState, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Avatar, Col, Row, Select, SelectProps } from "antd";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import RequestDetailsModal from "./request_details_content/RequestDetailsModal";
import RequestCardOptionsButtons from "./request_card/RequestCardOptionsButtons";
import FilterByType from "./filters_request_card_list/FilterByRequestType";
import FilterByStatus from "./filters_request_card_list/FilterByRequestStatus";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import ListOfRequestsCard from "./list_of_requests/ListOfRequests";
import { FcHighPriority } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { subtitleStyleCss } from "@/theme/text_styles";

import { setErrorsMedicalReq } from "@/redux/features/medical_req/medicalReqSlice";

import {
  useDeletedMedicalReqMutation,
  useLazyGetAllMedicalReqOfAUsersQuery,
} from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";
import { useGetAllMedicalReqReasonsForRejectionQuery } from "@/redux/apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";

import { typesMap } from "@/helpers/medical_req_type_map/types_map";
import { getTagComponentType } from "@/components/common/custom_tags_type/CustomTagsTypes";
import { statusMap } from "@/helpers/medical_req_status_map/status_map";
import { getTagComponentStatus } from "@/components/common/custom_tags_status/CustomTagsStatus";
import { updateSelectedRequestReasonsForRejection } from "@/helpers/medical_req_reason_for_rejection_map/update_selected_reasons_for_rejection";
import { reasonForRejectionMap } from "@/helpers/medical_req_reason_for_rejection_map/reason_for_rejection_map";
import { formatFilingNumber } from "@/helpers/format_filing_number/format_filing_number";
import { filterRequests } from "./filters_request_card_list/filtered_request";
import { SortRequestsBy } from "./request_details_content/enums/select_sortby.enums";
import SortByRequest from "./sortby_request_card_list/SortByRequest";
import { sortRequests } from "./sortby_request_card_list/sort_request_by_options";

const PatientRequestCardList: React.FC<{
  requestCardListData: MedicalReq[];
}> = ({ requestCardListData }) => {
  const dispatch = useAppDispatch();

  const idUserPatientState = useAppSelector((state) => state.patient.id);
  const medicalReqErrorsState = useAppSelector(
    (state) => state.medicalReq.errors
  );

  const [selectedRequestIdLocalState, setSelectedRequestIdLocalState] =
    useState("");
  const [
    selectedRequestFilingNumberLocalState,
    setSelectedRequestFilingNumberLocalState,
  ] = useState("");
  const [selectedRequestTypeLocalState, setSelectedRequestTypeLocalState] =
    useState<ReactNode>(null);
  const [selectedRequestStatusLocalState, setSelectedRequestStatusLocalState] =
    useState<ReactNode>(null);
  const [
    selectedRequestResponseDocumentsLocalState,
    setSelectedRequestResponseDocumentsLocalState,
  ] = useState<ReactNode>(null);
  const [
    selectedRequestReasonsForRejectionLocalState,
    setSelectedRequestReasonsForRejectionLocalState,
  ] = useState<string[]>([]);
  const [
    selectedRequestUserCommentsLocalState,
    setSelectedRequestUserCommentsLocalState,
  ] = useState("");
  const [
    selectedRequestResponseCommentsLocalState,
    setSelectedRequestResponseCommentsLocalState,
  ] = useState("");

  const [sortRequestsByOptionsLocalState, setSortRequestsByOptionsLocalState] =
    useState<SortRequestsBy>(SortRequestsBy.MOST_RECENT);
  const [filterRequestTypesLocalState, setFilterRequestTypesLocalState] =
    useState<number[]>([]);
  const [filterRequestStatusLocalState, setFilterRequestStatusLocalState] =
    useState<number[]>([]);

  const [typesOfRequestLocalState, setTypesOfRequestLocalState] = useState<
    SelectProps["options"]
  >([]);
  const [statusOfRequestLocalState, setStatusOfRequestLocalState] = useState<
    SelectProps["options"]
  >([]);

  const [modalOpenRequestDetails, setModalOpenRequestDetails] = useState(false);
  const [modalOpenDeleteRequest, setModalOpenDeleteRequest] = useState(false);

  const [isSubmittingDeletedMedicalReq, setIsSubmittingDeletedMedicalReq] =
    useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorMessageMedicalReq, setShowErrorMessageMedicalReq] =
    useState(false);

  const [
    trigger,
    {
      data: userMedicalLazyReqData,
      isLoading: userMedicalLazyReqLoading,
      isFetching: userMedicalLazyReqFetching,
      error: userMedicalLazyReqError,
    },
  ] = useLazyGetAllMedicalReqOfAUsersQuery({});

  const {
    data: userMedicalReqTypeData,
    isLoading: userMedicalReqTypeLoading,
    isFetching: userMedicalReqTypeFetching,
    error: userMedicalReqTypeError,
  } = useGetAllMedicalReqTypesQuery(null);

  const {
    data: userMedicalReqStatusData,
    isLoading: userMedicalReqStatusLoading,
    isFetching: userMedicalReqStatusFetching,
    error: userMedicalReqStatusError,
  } = useGetAllMedicalReqStatusQuery(null);

  const [deletedMedicalReqPatient] = useDeletedMedicalReqMutation({
    fixedCacheKey: "deletedMedicalReqPatientData",
  });

  const {
    data: userMedicalReqReasonsForRejectionData,
    isLoading: userMedicalReqReasonsForRejectionLoading,
    isFetching: userMedicalReqReasonsForRejectionFetching,
    error: userMedicalReqReasonsForRejectionError,
  } = useGetAllMedicalReqReasonsForRejectionQuery(null);

  const typeMapList = typesMap(userMedicalReqTypeData || []);
  const statusMapList = statusMap(userMedicalReqStatusData || []);

  const reasonForRejectionMapList = reasonForRejectionMap(
    userMedicalReqReasonsForRejectionData || []
  );

  useEffect(() => {
    if (
      userMedicalReqTypeData &&
      !userMedicalReqTypeLoading &&
      !userMedicalReqTypeFetching
    ) {
      const formattedTypesOfRequest = userMedicalReqTypeData.map(
        (type: any) => ({
          value: type.id,
          label: type.name,
        })
      );
      setTypesOfRequestLocalState(formattedTypesOfRequest);
    }

    if (userMedicalReqTypeError) {
      dispatch(
        setErrorsMedicalReq(
          "¡No se pudo obtener los tipos de requerimientos médicos!"
        ),
        setShowErrorMessageMedicalReq(true)
      );
    }

    if (
      userMedicalReqStatusData &&
      !userMedicalReqStatusLoading &&
      !userMedicalReqStatusFetching
    ) {
      const formattedStatusOfRequest = userMedicalReqStatusData.map(
        (status: any) => ({
          value: status.id,
          label: status.name,
        })
      );
      setStatusOfRequestLocalState(formattedStatusOfRequest);
    }

    if (userMedicalReqStatusError) {
      dispatch(
        setErrorsMedicalReq(
          "¡No se pudo obtener los estados de requerimientos médicos!"
        ),
        setShowErrorMessageMedicalReq(true)
      );
    }
  }, [
    userMedicalReqTypeData,
    userMedicalReqTypeLoading,
    userMedicalReqTypeFetching,
    userMedicalReqTypeError,
    userMedicalReqStatusData,
    userMedicalReqStatusLoading,
    userMedicalReqStatusFetching,
    userMedicalReqStatusError,
  ]);

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingDeletedMedicalReq(true);

      const response: any = await deletedMedicalReqPatient(
        selectedRequestIdLocalState
      );

      var isDeletedMedicalReqError = response.error;

      var isDeletedMedicalReqSuccess = response.data;

      if (isDeletedMedicalReqError) {
        const errorMessage = isDeletedMedicalReqError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsMedicalReq(errorMessage[0]));
          setShowErrorMessageMedicalReq(true);
        }
        if (typeof errorMessage === "string") {
          dispatch(setErrorsMedicalReq(errorMessage));
          setShowErrorMessageMedicalReq(true);
        }
      }

      if (isDeletedMedicalReqSuccess) {
        trigger(idUserPatientState);
        setSuccessMessage(
          `Solicitud con N° Radicado ${formatFilingNumber(
            selectedRequestFilingNumberLocalState
          )} eliminada correctamente`
        );
        setShowSuccessMessage(true);
        setModalOpenDeleteRequest(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingDeletedMedicalReq(false);
    }
  };

  const handleButtonClick = () => {
    dispatch(setErrorsMedicalReq([]));
    setShowErrorMessageMedicalReq(false);
  };

  const renderOptionsButtons = (item: MedicalReq) => (
    <RequestCardOptionsButtons
      backgroundColorButtonOptionDelete={"#8C1111"}
      onClickButtonOptionDelete={() => {
        setSelectedRequestIdLocalState(item.id);
        setSelectedRequestFilingNumberLocalState(item.filing_number);
        setModalOpenDeleteRequest(true);
      }}
      iconButtonOptionDelete={<MdDeleteOutline size={17} />}
      titleButtonOptionDelete={"Eliminar"}
      backgroundColorButtonOptionDetails={"#015E90"}
      onClickButtonOptionDetails={() => {
        setSelectedRequestFilingNumberLocalState(item.filing_number);
        setSelectedRequestTypeLocalState(
          getTagComponentType(typeMapList[item.requirement_type])
        );
        setSelectedRequestStatusLocalState(
          getTagComponentStatus(statusMapList[item.requirement_status])
        );
        setSelectedRequestResponseDocumentsLocalState(item.documents_delivered);
        setSelectedRequestUserCommentsLocalState(item.user_message);
        setSelectedRequestResponseCommentsLocalState(item.response_comments);
        updateSelectedRequestReasonsForRejection(
          item.motive_for_rejection || [],
          reasonForRejectionMapList,
          setSelectedRequestReasonsForRejectionLocalState
        );
        setModalOpenRequestDetails(true);
      }}
      iconButtonOptionDetails={<FaRegEye size={17} />}
      titleButtonOptionDetails={"Ver detalles"}
    />
  );

  var filteredRequests = filterRequests(
    requestCardListData,
    filterRequestTypesLocalState,
    filterRequestStatusLocalState
  );

  sortRequests(filteredRequests, sortRequestsByOptionsLocalState);

  const handleOnChangeSelectSortBy = (value: SortRequestsBy) => {
    setSortRequestsByOptionsLocalState(value);
  };

  const handleTypeSelectionChange = (selectedTypes: number[]) => {
    setFilterRequestTypesLocalState(selectedTypes);
  };

  const handleStatusSelectionChange = (selectedStatus: number[]) => {
    setFilterRequestStatusLocalState(selectedStatus);
  };

  return (
    <>
      {showErrorMessageMedicalReq && (
        <CustomMessage
          typeMessage="error"
          message={
            medicalReqErrorsState?.toString() || "¡Error en la petición!"
          }
        />
      )}

      {showSuccessMessage && (
        <CustomMessage
          typeMessage="success"
          message={successMessage || "¡Proceso finalizado con éxito!"}
        />
      )}

      {modalOpenRequestDetails && (
        <RequestDetailsModal
          modalOpenRequestDetailsModal={modalOpenRequestDetails}
          selectedRequestFilingNumberModal={formatFilingNumber(
            selectedRequestFilingNumberLocalState
          )}
          selectedRequestTypeModal={selectedRequestTypeLocalState}
          selectedRequestStatusModal={selectedRequestStatusLocalState}
          selectedRequestResponseDocumentsModal={
            selectedRequestResponseDocumentsLocalState
          }
          selectedRequestReasonsForRejectionModal={
            selectedRequestReasonsForRejectionLocalState
          }
          selectedRequestUserCommentsModal={
            selectedRequestUserCommentsLocalState
          }
          selectedRequestResponseCommentsModal={
            selectedRequestResponseCommentsLocalState
          }
          handleCancelRequestDetailsModal={() => {
            setModalOpenRequestDetails(false);
          }}
        />
      )}

      {modalOpenDeleteRequest && (
        <CustomModalTwoOptions
          openCustomModalState={modalOpenDeleteRequest}
          iconCustomModal={<FcHighPriority size={77} />}
          titleCustomModal="¿Deseas eliminar esta solicitud?"
          subtitleCustomModal={
            <p>
              Se va a eliminar el requerimiento con número de radicado: &nbsp;
              <b>{formatFilingNumber(selectedRequestFilingNumberLocalState)}</b>
            </p>
          }
          handleCancelCustomModal={() => {
            setModalOpenDeleteRequest(false);
          }}
          handleConfirmCustomModal={handleConfirmDataModal}
          isSubmittingConfirm={isSubmittingDeletedMedicalReq}
          handleClickCustomModal={handleButtonClick}
        />
      )}

      <SortByRequest
        selectValueToSort={sortRequestsByOptionsLocalState}
        handleSelectSortBy={handleOnChangeSelectSortBy}
      />

      <Row justify={"center"} align={"middle"}>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={24}
          style={{
            width: "100%",
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <Col
            xs={6}
            sm={4}
            md={4}
            lg={4}
            style={{
              display: "flex",
              flexFlow: "column wrap",
              alignContent: "flex-end",
              justifyContent: "center",
            }}
          >
            <h3
              className="title-filter-req"
              style={{
                ...subtitleStyleCss,
                color: "#0707077F",
                paddingInline: "7px",
              }}
            >
              Filtrar por:
            </h3>
          </Col>

          <Col xs={9} sm={10} md={10} lg={10}>
            <FilterByType
              typesOfRequestLocalState={typesOfRequestLocalState}
              onChange={handleTypeSelectionChange}
              isLoading={
                userMedicalReqTypeLoading || userMedicalReqTypeFetching
              }
            />
          </Col>

          <Col xs={9} sm={10} md={10} lg={10}>
            <FilterByStatus
              statusOfRequestLocalState={statusOfRequestLocalState}
              onChange={handleStatusSelectionChange}
              isLoading={
                userMedicalReqStatusLoading || userMedicalReqStatusFetching
              }
            />
          </Col>
        </Col>
      </Row>

      <ListOfRequestsCard
        dataSourceList={filteredRequests}
        optionsButtonSectionListOfRequest={renderOptionsButtons}
      />
    </>
  );
};

export default PatientRequestCardList;
