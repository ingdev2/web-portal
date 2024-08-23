"use client";

import React, { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";

import { Button, Col, Row } from "antd";
import { LuInspect } from "react-icons/lu";

import {
  useChangeStatusToUnderReviewMutation,
  useGetMedicalReqByIdQuery,
} from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqStatusQuery } from "@/redux/apis/medical_req/status_medical_req/statusMedicalReqApi";

import { RequirementStatusEnum } from "@/../../api/src/medical_req/enums/requirement_status.enum";
import SendToAnotherAreaButton from "./action_buttons/SendToAnotherAreaButton";
import DeliverDocumentsButton from "./action_buttons/DeliverDocumentsButton";
import RejectedMedicalReqButton from "./action_buttons/RejectedMedicalReqButton";

const ModalActionButtons: React.FC<{}> = ({}) => {
  const [
    isManagementOptionsVisibleLocalState,
    setIsManagementOptionsVisibleLocalState,
  ] = useState(false);

  const tableRowIdState = useAppSelector((state) => state.modal.tableRowId);

  const {
    data: medicalReqByIdData,
    isLoading: medicalReqByIdLoading,
    isFetching: medicalReqByIdFetching,
    error: medicalReqByIdError,
  } = useGetMedicalReqByIdQuery(tableRowIdState);

  const [
    changeStatusToUnderReview,
    {
      data: changeStatusToUnderReviewData,
      isLoading: changeStatusToUnderReviewLoading,
      isSuccess: changeStatusToUnderReviewFetching,
      isError: changeStatusToUnderReviewError,
    },
  ] = useChangeStatusToUnderReviewMutation({
    fixedCacheKey: "changeStatusToUnderReviewData",
  });

  const {
    data: userMedicalReqStatusData,
    isLoading: userMedicalReqStatusLoading,
    isFetching: userMedicalReqStatusFetching,
    error: userMedicalReqStatusError,
  } = useGetAllMedicalReqStatusQuery(null);

  const namesOfMedicalReqStates = [
    RequirementStatusEnum.DELIVERED.toString(),
    RequirementStatusEnum.REJECTED.toString(),
    RequirementStatusEnum.EXPIRED.toString(),
  ];

  const medicalReqUnderReviewState = [
    RequirementStatusEnum.UNDER_REVIEW.toString(),
  ];

  const idsOfMedicalReqStates = userMedicalReqStatusData
    ?.filter((status) => namesOfMedicalReqStates.includes(status.name))
    .map((status) => status.id);

  const idOfMedicalReqUnderReviewState = userMedicalReqStatusData
    ?.filter((status) => medicalReqUnderReviewState.includes(status.name))
    .map((status) => status.id);

  useEffect(() => {
    if (
      medicalReqByIdData &&
      idOfMedicalReqUnderReviewState &&
      idOfMedicalReqUnderReviewState.includes(
        medicalReqByIdData.requirement_status
      )
    ) {
      setIsManagementOptionsVisibleLocalState(true);
    }
  }, [
    isManagementOptionsVisibleLocalState,
    medicalReqByIdData,
    idOfMedicalReqUnderReviewState,
  ]);

  if (
    medicalReqByIdData &&
    idsOfMedicalReqStates &&
    !idsOfMedicalReqStates.includes(medicalReqByIdData.requirement_status)
  ) {
    return (
      <Col>
        {!isManagementOptionsVisibleLocalState &&
          idOfMedicalReqUnderReviewState &&
          !idOfMedicalReqUnderReviewState.includes(
            medicalReqByIdData.requirement_status
          ) && (
            <Button
              className="manage-the-request-button"
              size="large"
              style={{
                backgroundColor: "#015E90",
                color: "#F7F7F7",
                borderRadius: "31px",
                paddingInline: "31px",
                marginBlock: "13px",
              }}
              onClick={() => {
                if (!isManagementOptionsVisibleLocalState) {
                  setIsManagementOptionsVisibleLocalState(true);

                  changeStatusToUnderReview(tableRowIdState);
                }
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
                <LuInspect size={17} />
                &nbsp; Gestionar solicitud
              </div>
            </Button>
          )}

        {isManagementOptionsVisibleLocalState && (
          <Row
            justify={"center"}
            align={"middle"}
            style={{ marginBlock: "22px" }}
          >
            <SendToAnotherAreaButton />

            <DeliverDocumentsButton />

            <RejectedMedicalReqButton />
          </Row>
        )}
      </Col>
    );
  }
};

export default ModalActionButtons;
