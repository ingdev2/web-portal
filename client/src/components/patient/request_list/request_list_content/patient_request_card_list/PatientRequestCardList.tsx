"use-client";

import React, { ReactNode, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import { Avatar, Button, Card, List, Space } from "antd";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import { FcInfo } from "react-icons/fc";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

import { setErrorsMedicalReq } from "@/redux/features/medical_req/medicalReqSlice";

import { useDeletedMedicalReqMutation } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqTypesQuery } from "@/redux/apis/medical_req/types_medical_req/typesMedicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";

import { typesMap } from "./helpers/types_map";
import { getTagComponentType } from "./helpers/CustomTagsTypes";
import { statusMap } from "./helpers/status_map";
import { getTagComponentStatus } from "./helpers/CustomTagsStatus";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";

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

  const [modalOpenRequestDetails, setModalOpenRequestDetails] = useState(false);
  const [modalOpenDeleteRequest, setModalOpenDeleteRequest] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState("");

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

  const typeMapList = typesMap(userMedicalReqTypeData || []);
  const statusMapList = statusMap(userMedicalReqStatusData || []);

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingDeletedMedicalReq(true);

      const response: any = await deletedMedicalReqPatient(selectedRequestId);

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
          contentCustomModal={"DETALLES DE SOLICITUD"}
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
          iconCustomModal={<FcInfo size={77} />}
          titleCustomModal="¿Deseas eliminar esta solicitud?"
          subtitleCustomModal="Se va a eliminar el requerimiento con numero de radicado:"
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
                title={`${titleCardList} ${item.filing_number}`}
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
                    size="middle"
                    style={{
                      backgroundColor: backgroundColorButtonDetails,
                      color: "#F7F7F7",
                    }}
                    onClick={() => {
                      setModalOpenRequestDetails(true);
                    }}
                    icon={iconButtonDetails}
                  >
                    {titleButtonDetails}
                  </Button>

                  <Button
                    size="middle"
                    style={{
                      backgroundColor: backgroundColorButtonDelete,
                      color: "#F7F7F7",
                    }}
                    onClick={() => {
                      setSelectedRequestId(item.id);
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
          align: "center",
          pageSize: 4,
        }}
      />
    </>
  );
};

export default PatientRequestCardList;
