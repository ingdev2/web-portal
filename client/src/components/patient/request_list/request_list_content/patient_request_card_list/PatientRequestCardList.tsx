"use-client";

import React, { useEffect, useState, ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Avatar, Card, List, Col, SelectProps } from "antd";
import CustomSelectTagMultipleOptions from "@/components/common/custom_select_tag_multiple_options/CustomSelectTagMultipleOptions";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import RequestDetailsModal from "./request_details_content/RequestDetailsModal";
import RequestCardDescription from "./request_card/RequestCardDescription";
import RequestCardOptionsButtons from "./request_card/RequestCardOptionsButtons";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { FcHighPriority } from "react-icons/fc";
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

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

  const [
    deletedMedicalReqPatient,
    {
      data: deletedMedicalReqData,
      isLoading: deletedMedicalReqLoading,
      isSuccess: deletedMedicalReqSuccess,
      isError: deletedMedicalReqError,
    },
  ] = useDeletedMedicalReqMutation({
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
          value: type.id.toString(),
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
          value: status.id.toString(),
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
        <Col xs={24} sm={12} md={12} lg={12}>
          {userMedicalReqTypeLoading || userMedicalReqTypeFetching ? (
            <CustomSpin />
          ) : (
            <CustomSelectTagMultipleOptions
              placeholderCustomSelect="Filtrar por tipo de solicitud"
              defaultValueCustomSelect={[]}
              optionsCustomSelect={typesOfRequestLocalState}
            />
          )}
        </Col>

        <Col xs={24} sm={12} md={12} lg={12}>
          <CustomSelectTagMultipleOptions
            placeholderCustomSelect="Filtrar por estado de solicitud"
            defaultValueCustomSelect={[]}
            optionsCustomSelect={statusOfRequestLocalState}
          />
        </Col>
      </Col>

      <List
        className="list-of-medical-reqs-cards"
        itemLayout="vertical"
        size="large"
        dataSource={requestCardListData}
        style={{ margin: "0px", padding: "0px" }}
        renderItem={(item) => (
          <Card
            key={"card-list-of-request"}
            style={{
              display: "flex",
              flexFlow: "column wrap",
              backgroundColor: "#fcfcfc",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
              padding: "0px 0px",
              margin: "13px 0px",
            }}
          >
            <List.Item
              key={item.id}
              style={{
                padding: "0px 0px",
                margin: "0px 0px",
              }}
              // actions={[null]}
              // extra={null}
            >
              <List.Item.Meta
                style={{
                  padding: "7px 0px",
                  margin: "0px 0px",
                }}
                // avatar={<Avatar src={item.avatar} />}
                key={item.id}
                title={`"N° Radicado:" ${formatFilingNumber(
                  item.filing_number
                )}`}
                description={
                  <RequestCardDescription
                    descriptionCard1={"Tipo de solicitud:"}
                    tagComponentType={getTagComponentType(
                      typeMapList[item.requirement_type]
                    )}
                    descriptionCard2={"Estado de solicitud:"}
                    tagComponentStatus={getTagComponentStatus(
                      statusMapList[item.requirement_status]
                    )}
                    descriptionCard3={"Fecha de solicitud:"}
                    itemDateOfAdmission={<b>{item.date_of_admission}</b>}
                    descriptionCard4={"Fecha de respuesta:"}
                    itemAnswerDate={
                      <b>
                        {item.answer_date || (
                          <b style={{ color: "#960202" }}>
                            En proceso de revisión
                          </b>
                        )}
                      </b>
                    }
                  />
                }
              />
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
                    getTagComponentStatus(
                      statusMapList[item.requirement_status]
                    )
                  );
                  setSelectedRequestResponseDocumentsLocalState(
                    item.documents_delivered
                  );
                  setSelectedRequestUserCommentsLocalState(item.user_message);
                  setSelectedRequestResponseCommentsLocalState(
                    item.response_comments
                  );
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
            </List.Item>
          </Card>
        )}
        // footer={null}
        pagination={{
          pageSize: 4,
          align: "center",
          position: "both",
        }}
      />
    </>
  );
};

export default PatientRequestCardList;
