"use-client";

import React, { ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  Avatar,
  Button,
  Card,
  Col,
  Row,
  List,
  Space,
  Descriptions,
} from "antd";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import { TbEye } from "react-icons/tb";
import { FcHighPriority } from "react-icons/fc";

import { setErrorsMedicalReq } from "@/redux/features/medical_req/medicalReqSlice";

import { useDeletedMedicalReqMutation } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";
import { useGetAllMedicalReqReasonsForRejectionQuery } from "@/redux/apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";

import { typesMap } from "@/helpers/medical_req_type_map/types_map";
import { getTagComponentType } from "@/components/common/custom_tags_type/CustomTagsTypes";
import { statusMap } from "@/helpers/medical_req_status_map/status_map";
import { getTagComponentStatus } from "@/components/common/custom_tags_status/CustomTagsStatus";
import { reasonForRejectionMap } from "@/helpers/medical_req_reason_for_rejection_map/reason_for_rejection_map";
import { formatFilingNumber } from "@/helpers/format_filing_number/format_filing_number";
import RequestDetailsContent from "./request_details_content/RequestDetailsContent";

const PatientRequestCardList: React.FC<{
  requestCardListData: MedicalReq[];
  titleCardList: string;
  descriptionCardList1: string;
  descriptionCardList2: string;
  descriptionCardList3?: string;
  descriptionCardList4?: string;
  iconButtonDetails?: ReactNode;
  titleButtonDetails?: string;
  backgroundColorButtonDetails?: string;
  iconButtonDelete?: ReactNode;
  titleButtonDelete?: string;
  backgroundColorButtonDelete?: string;
}> = ({
  requestCardListData,
  titleCardList,
  descriptionCardList1,
  descriptionCardList2,
  descriptionCardList3,
  descriptionCardList4,
  iconButtonDetails,
  titleButtonDetails,
  backgroundColorButtonDetails,
  iconButtonDelete,
  titleButtonDelete,
  backgroundColorButtonDelete,
}) => {
  const dispatch = useAppDispatch();

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
  const [modalOpenRequestDetails, setModalOpenRequestDetails] = useState(false);
  const [modalOpenDeleteRequest, setModalOpenDeleteRequest] = useState(false);

  const [isSubmittingDeletedMedicalReq, setIsSubmittingDeletedMedicalReq] =
    useState(false);
  const [showErrorMessageMedicalReq, setShowErrorMessageMedicalReq] =
    useState(false);

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
  const updateSelectedRequestReasonsForRejection = (
    motiveIds: number[] = [],
    reasonMap: { [key: number]: string }
  ) => {
    const rejectionTitles = motiveIds.map((id) => reasonMap[id]);
    setSelectedRequestReasonsForRejectionLocalState(rejectionTitles);
  };

  const reasonForRejectionMapList = reasonForRejectionMap(
    userMedicalReqReasonsForRejectionData || []
  );

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

      {modalOpenRequestDetails && (
        <CustomModalNoContent
          openCustomModalState={modalOpenRequestDetails}
          contentCustomModal={
            <RequestDetailsContent
              titleDescription1={"Detalles de solicitud"}
              labelFilingNumber={"N° de Radicado:"}
              selectedRequestFilingNumber={formatFilingNumber(
                selectedRequestFilingNumberLocalState
              )}
              labelRequestType={"Tipo:"}
              selectedRequestType={selectedRequestTypeLocalState}
              labelRequestStatus={"Estado:"}
              selectedRequestStatus={selectedRequestStatusLocalState}
              labelResponseDocuments={"Documentos de respuesta a solicitud:"}
              selectedRequestResponseDocuments={
                selectedRequestResponseDocumentsLocalState ? (
                  <Button
                    className="documents-response-link-button"
                    size="middle"
                    icon={<TbEye size={17} />}
                    style={{
                      display: "flex",
                      flexFlow: "column wrap",
                      alignContent: "center",
                      justifyContent: "center",
                      backgroundColor: "#015E90",
                      color: "#F7F7F7",
                    }}
                    href={selectedRequestResponseDocumentsLocalState?.toString()}
                    target="_blank"
                  >
                    Ver documentos
                  </Button>
                ) : (
                  <b style={{ color: "#960202" }}>No hay documentos anexados</b>
                )
              }
              labelReasonsForRejection="Motivos de rechazo de solicitud"
              selectedRequestReasonsForRejection={
                selectedRequestReasonsForRejectionLocalState.length > 0 ? (
                  <ul>
                    {selectedRequestReasonsForRejectionLocalState.map(
                      (reason, index) => (
                        <li key={index}>{reason}</li>
                      )
                    )}
                  </ul>
                ) : (
                  <b style={{ color: "#960202" }}>No aplica</b>
                )
              }
              labelUserComments={"Comentarios de usuario"}
              selectedRequestUserComments={
                selectedRequestUserCommentsLocalState
              }
              labelRequestResponse={"Mensaje de respuesta a solicitud"}
              selectedRequestResponse={
                selectedRequestResponseCommentsLocalState || (
                  <b style={{ color: "#960202" }}>En proceso de revisión</b>
                )
              }
            />
          }
          maskClosableCustomModal={true}
          closableCustomModal={true}
          handleCancelCustomModal={() => {
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

      <List
        className="list-of-medical-reqs-cards"
        itemLayout="vertical"
        size="large"
        dataSource={requestCardListData}
        style={{ margin: "0px", paddingBlock: "0px" }}
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
                title={`${titleCardList} ${formatFilingNumber(
                  item.filing_number
                )}`}
                description={
                  <Space size={"small"} direction="vertical">
                    <div
                      style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "31px",
                          display: "flex",
                          flexFlow: "row wrap",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingBlock: "2px",
                        }}
                      >
                        {descriptionCardList1}

                        {getTagComponentType(
                          typeMapList[item.requirement_type]
                        )}
                      </div>

                      <div
                        style={{
                          width: "100%",
                          height: "31px",
                          display: "flex",
                          flexFlow: "row wrap",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingBlock: "2px",
                        }}
                      >
                        {descriptionCardList2}

                        {getTagComponentStatus(
                          statusMapList[item.requirement_status]
                        )}
                      </div>

                      <div
                        style={{
                          width: "100%",
                          height: "31px",
                          display: "flex",
                          flexFlow: "row wrap",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingBlock: "2px",
                        }}
                      >
                        {descriptionCardList3} <b>{item.date_of_admission}</b>
                      </div>

                      <div
                        style={{
                          width: "100%",
                          height: "31px",
                          display: "flex",
                          flexFlow: "row wrap",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingBlock: "2px",
                        }}
                      >
                        {descriptionCardList4}
                        <b>
                          {item.answer_date || (
                            <b style={{ color: "#960202" }}>
                              En proceso de revisión
                            </b>
                          )}
                        </b>
                      </div>
                    </div>
                  </Space>
                }
              />

              <div
                style={{
                  display: "flex",
                  flexFlow: "row wrap",
                  justifyContent: "flex-end",
                  padding: 0,
                  margin: 0,
                }}
              >
                <Space size={"middle"}>
                  <Button
                    className="view-details-medical-req-button"
                    size="middle"
                    style={{
                      display: "flex",
                      flexFlow: "column wrap",
                      alignContent: "center",
                      justifyContent: "center",
                      backgroundColor: backgroundColorButtonDetails,
                      color: "#F7F7F7",
                    }}
                    onClick={() => {
                      setSelectedRequestFilingNumberLocalState(
                        item.filing_number
                      );
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
                      setSelectedRequestUserCommentsLocalState(
                        item.user_message
                      );
                      setSelectedRequestResponseCommentsLocalState(
                        item.response_comments
                      );
                      updateSelectedRequestReasonsForRejection(
                        item.motive_for_rejection || [],
                        reasonForRejectionMapList
                      );

                      setModalOpenRequestDetails(true);
                    }}
                    icon={iconButtonDetails}
                  >
                    {titleButtonDetails}
                  </Button>

                  <Button
                    className="delete-medical-req-button"
                    size="middle"
                    style={{
                      width: "100%",
                      display: "flex",
                      flexFlow: "column wrap",
                      alignContent: "center",
                      justifyContent: "center",
                      backgroundColor: backgroundColorButtonDelete,
                      color: "#F7F7F7",
                    }}
                    onClick={() => {
                      setSelectedRequestIdLocalState(item.id);
                      setSelectedRequestFilingNumberLocalState(
                        item.filing_number
                      );

                      setModalOpenDeleteRequest(true);
                    }}
                    icon={iconButtonDelete}
                  >
                    {titleButtonDelete}
                  </Button>
                </Space>
              </div>
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
