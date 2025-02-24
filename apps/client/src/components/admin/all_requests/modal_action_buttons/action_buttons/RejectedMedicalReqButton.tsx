"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Form, Select } from "antd";
import { GrSend } from "react-icons/gr";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import TextArea from "antd/es/input/TextArea";
import { FcInfo } from "react-icons/fc";
import { titleStyleCss } from "@/theme/text_styles";

import { setErrorsAdmin } from "@/redux/features/admin/adminSlice";
import {
  setMotiveForRejectionMedicalReq,
  setResponseCommentsMedicalReq,
  setWasRejectedMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";

import { useChangeStatusToRejectedMutation } from "@/redux/apis/medical_req/medicalReqApi";
import { useGetAllMedicalReqReasonsForRejectionQuery } from "@/redux/apis/medical_req/reasons_for_rejection/reasonsForRejectionApi";

const RejectedMedicalReqButton: React.FC<{}> = ({}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);

  const [
    reasonForRejectionNumberAdminLocalState,
    setReasonForRejectionNumberAdminLocalState,
  ] = useState<number[]>([]);
  const [
    reasonsForRejectionListLocalState,
    setReasonsForRejectionListLocalState,
  ]: any = useState([]);
  const [responseCommentsLocalState, setResponseCommentsLocalState] =
    useState("");

  const [isSubmittingRejectedMedicalReq, setIsSubmittingRejectedMedicalReq] =
    useState(false);
  const [successMessageAdmin, setSuccessMessageAdmin] = useState("");
  const [showSuccessMessageAdmin, setShowSuccessMessageAdmin] = useState(false);
  const [showErrorMessageAdmin, setShowErrorMessageAdmin] = useState(false);

  const [showCustomConfirmModal, setShowCustomConfirmModal] = useState(false);

  const tableRowIdState = useAppSelector((state) => state.modal.tableRowId);
  const tableRowFilingNumberState = useAppSelector(
    (state) => state.modal.tableRowFilingNumber
  );

  const adminErrorsState = useAppSelector((state) => state.admin.errors);

  const [
    rejectedMedicalReq,
    {
      data: rejectedMedicalReqData,
      isLoading: rejectedMedicalReqLoading,
      isSuccess: rejectedMedicalReqFetching,
      isError: rejectedMedicalReqError,
    },
  ] = useChangeStatusToRejectedMutation({
    fixedCacheKey: "rejectedMedicalReqData",
  });

  const {
    data: reasonsForRejectionData,
    isLoading: reasonsForRejectionLoading,
    isFetching: reasonsForRejectionFetching,
    error: reasonsForRejectionError,
  } = useGetAllMedicalReqReasonsForRejectionQuery(null);

  const reasonsForRejectionSelectoptions =
    reasonsForRejectionListLocalState.map(
      (reason: MedicalReqReasonForRejection) => ({
        label: reason.rejection_title,
        value: reason.id,
      })
    );

  useEffect(() => {
    if (
      reasonsForRejectionData &&
      !reasonsForRejectionLoading &&
      !reasonsForRejectionFetching
    ) {
      setReasonsForRejectionListLocalState(reasonsForRejectionData);
    }
    if (reasonsForRejectionError) {
      dispatch(setErrorsAdmin("¡No se pudo obtener las razones de rechazo!"));
      setShowErrorMessageAdmin(true);
      setReasonsForRejectionListLocalState(reasonsForRejectionData);
    }
  }, [reasonsForRejectionData, reasonsForRejectionError]);

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingRejectedMedicalReq(true);

      const response: any = await rejectedMedicalReq({
        filingNumber: tableRowFilingNumberState,
        updateStatus: {
          response_comments: responseCommentsLocalState,
          motive_for_rejection: reasonForRejectionNumberAdminLocalState,
        },
      });

      let rejectedMedicalReqSuccess = response.data;

      let rejectedMedicalReqError = response.error;

      if (rejectedMedicalReqError?.status !== 202) {
        const errorMessage = rejectedMedicalReqError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsAdmin(errorMessage[0]));

          setShowErrorMessageAdmin(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsAdmin(errorMessage));

          setShowErrorMessageAdmin(true);
        }
      }

      if (
        rejectedMedicalReqSuccess?.status === 202 &&
        !rejectedMedicalReqError
      ) {
        const successMessage = rejectedMedicalReqSuccess?.message;

        setSuccessMessageAdmin(successMessage);
        setShowSuccessMessageAdmin(true);

        setShowCustomConfirmModal(false);

        setIsModalVisibleLocalState(false);

        dispatch(setResponseCommentsMedicalReq(responseCommentsLocalState));
        dispatch(
          setMotiveForRejectionMedicalReq(
            reasonForRejectionNumberAdminLocalState
          )
        );
        dispatch(setWasRejectedMedicalReq(true));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingRejectedMedicalReq(false);
    }
  };

  const handleCorrectData = () => {
    try {
      dispatch(setResponseCommentsMedicalReq(""));
      dispatch(setMotiveForRejectionMedicalReq([]));

      setShowCustomConfirmModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingRejectedMedicalReq(false);
    }
  };

  const handleReasonsSelectionChange = (selectedReasons: number[]) => {
    setReasonForRejectionNumberAdminLocalState(selectedReasons);
  };

  const handleButtonClick = () => {
    dispatch(setErrorsAdmin([]));
    setShowErrorMessageAdmin(false);
  };

  return (
    <>
      {showErrorMessageAdmin && (
        <CustomMessage
          typeMessage="error"
          message={adminErrorsState?.toString() || "¡Error en la petición!"}
        />
      )}

      {showSuccessMessageAdmin && (
        <CustomMessage
          typeMessage="success"
          message={
            successMessageAdmin?.toString() ||
            `¡Solicitud rechazada correctamente!`
          }
        />
      )}

      {showCustomConfirmModal && (
        <CustomModalTwoOptions
          key={"custom-confirm-modal-rejected-medical-req"}
          iconCustomModal={<FcInfo size={77} />}
          openCustomModalState={showCustomConfirmModal}
          titleCustomModal="¿Deseas rechazar esta solicitud?"
          subtitleCustomModal="Esta solicitud se rechazará y el usuario podrá ver los motivos por los cuales fue denegada."
          handleCancelCustomModal={() => {
            setShowCustomConfirmModal(false);
          }}
          handleConfirmCustomModal={handleConfirmDataModal}
          handleClickCustomModal={handleButtonClick}
          isSubmittingConfirm={isSubmittingRejectedMedicalReq}
        ></CustomModalTwoOptions>
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-rejected-medical-req"}
          widthCustomModalNoContent={"45%"}
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            setIsModalVisibleLocalState(false);
          }}
          contentCustomModal={
            <Form
              id="rejected-medical-req-form"
              name="rejected-medical-req-form"
              className="rejected-medical-req-form"
              onFinish={handleCorrectData}
              initialValues={{ remember: false }}
              autoComplete="false"
              layout="vertical"
              style={{
                width: "100%",
              }}
            >
              <h2
                className="title-rejected-medical-req-form"
                style={{
                  ...titleStyleCss,
                  textAlign: "center",
                  marginBottom: "22px",
                }}
              >
                Rechazar solicitud
              </h2>

              <Form.Item
                name="motives-for-rejection-rejected-medical-req"
                label="Motivos por los cuales se rechaza la solicitud:"
                tooltip="Aquí debes seleccionar las razones por las cuales se rechazó la solicitud."
                style={{ marginBottom: "13px" }}
                initialValue={[]}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor, selecciona mínimo un motivo de rechazo!",
                  },
                ]}
              >
                {reasonsForRejectionLoading ? (
                  <CustomSpin />
                ) : (
                  <Select
                    mode="multiple"
                    placeholder={"Seleccionar razones de rechazo:"}
                    options={reasonsForRejectionSelectoptions}
                    onChange={handleReasonsSelectionChange}
                    style={{
                      width: "100%",
                      paddingInline: "7px",
                      paddingBlock: "7px",
                    }}
                    showSearch
                    filterOption={(input, option) =>
                      (option?.label as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    allowClear
                  />
                )}
              </Form.Item>

              <Form.Item
                name="response-comments-rejected-medical-req"
                label="Observaciones y/o detalles"
                tooltip="Aquí debes ingresar comentarios o algún mensaje que desees enviarle al usuario."
                style={{ marginBottom: "31px" }}
                rules={[
                  {
                    required: true,
                    message:
                      "¡Por favor, ingrese mensaje de respuesta a esta solicitud!",
                  },
                ]}
              >
                <TextArea
                  autoSize={{ minRows: 2, maxRows: 10 }}
                  maxLength={301}
                  value={responseCommentsLocalState}
                  placeholder="Mensaje de respuesta para enviar al usuario."
                  onChange={(e) =>
                    setResponseCommentsLocalState(e.target.value)
                  }
                />
              </Form.Item>

              <Form.Item style={{ textAlign: "center", marginBottom: "7px" }}>
                {isSubmittingRejectedMedicalReq ? (
                  <CustomSpin />
                ) : (
                  <Button
                    className="confirm-rejected-medical-req-form-button"
                    size="large"
                    style={{
                      paddingInline: 62,
                      borderRadius: 31,
                      backgroundColor: "#015E90",
                      color: "#f2f2f2",
                    }}
                    htmlType="submit"
                    onClick={handleButtonClick}
                  >
                    Enviar Rechazo de solicitud
                  </Button>
                )}
              </Form.Item>
            </Form>
          }
        />
      )}

      <Button
        className="rejected-medical-req-button"
        size="large"
        style={{
          backgroundColor: "#8C1111",
          color: "#F7F7F7",
          borderRadius: "31px",
          paddingInline: "31px",
          marginInline: "22px",
        }}
        onClick={() => {
          setIsModalVisibleLocalState(true);
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
          <GrSend size={17} />
          &nbsp; Rechazar solicitud
        </div>
      </Button>
    </>
  );
};

export default RejectedMedicalReqButton;
