"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

import { Button, Form } from "antd";
import { FaCheck } from "react-icons/fa";
import CustomSpin from "@/components/common/custom_spin/CustomSpin";
import CustomMessage from "@/components/common/custom_messages/CustomMessage";
import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import CustomModalTwoOptions from "@/components/common/custom_modal_two_options/CustomModalTwoOptions";
import CustomUpload from "@/components/common/custom_upload/CustomUpload";
import TextArea from "antd/es/input/TextArea";
import { FcInfo } from "react-icons/fc";
import { titleStyleCss } from "@/theme/text_styles";

import { setErrorsAdmin } from "@/redux/features/admin/adminSlice";
import {
  setResponseCommentsMedicalReq,
  setFileDocumentsDeliveredMedicalReq,
  removeFileDocumentsDeliveredMedicalReq,
  setDefaultValuesMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";

import { useChangeStatusToDeliveredMutation } from "@/redux/apis/medical_req/medicalReqApi";

import { processAndUploadFiles } from "@/helpers/process_and_upload_files/process_and_upload_files";
import { validateRequiredFiles } from "@/helpers/validate_required_values/validate_required_files";

const DeliverDocumentsButton: React.FC<{}> = ({}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { uploadFiles } = processAndUploadFiles();

  const [isModalVisibleLocalState, setIsModalVisibleLocalState] =
    useState(false);

  const [responseCommentsLocalState, setResponseCommentsLocalState] =
    useState("");

  const [isSubmittingDeliverDocuments, setIsSubmittingDeliverDocuments] =
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

  const copyDocumentsDeliveredFilesState = useAppSelector(
    (state) => state.medicalReq.files_documents_delivered
  );

  const [
    changeStatusToDelivered,
    {
      data: changeStatusToDeliveredData,
      isLoading: changeStatusToDeliveredLoading,
      isSuccess: changeStatusToDeliveredFetching,
      isError: changeStatusToDeliveredError,
    },
  ] = useChangeStatusToDeliveredMutation({
    fixedCacheKey: "changeStatusToDeliveredData",
  });

  const handleConfirmDataModal = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setIsSubmittingDeliverDocuments(true);

      const statesToUpload = [
        {
          state: copyDocumentsDeliveredFilesState,
          paramName: "documents_delivered",
        },
      ];

      const responses: Record<string, string[]> = {};

      let errors: string[] = [];

      if (statesToUpload.some(({ state }) => state && state.length > 0)) {
        for (const { state, paramName } of statesToUpload) {
          if (state && state.length > 0) {
            const { success, error } = await uploadFiles(state);
            if (error) {
              errors.push(error);
            } else {
              responses[paramName] = success;
            }
          }
        }
      }

      if (errors.length > 0) {
        dispatch(setErrorsAdmin(errors[0]));
        setShowErrorMessageAdmin(true);

        return;
      }

      const response: any = await changeStatusToDelivered({
        filingNumber: tableRowFilingNumberState,
        updateStatus: {
          response_comments: responseCommentsLocalState,
          ...responses,
        },
      });

      var deliverDocumentsSuccess = response.data;

      var deliverDocumentsError = response.error;

      if (deliverDocumentsError?.status !== 202) {
        const errorMessage = deliverDocumentsError?.data.message;

        if (Array.isArray(errorMessage)) {
          dispatch(setErrorsAdmin(errorMessage[0]));

          setShowErrorMessageAdmin(true);
        } else if (typeof errorMessage === "string") {
          dispatch(setErrorsAdmin(errorMessage));

          setShowErrorMessageAdmin(true);
        }
      }

      if (deliverDocumentsSuccess?.status === 202 && !deliverDocumentsError) {
        const successMessage = deliverDocumentsSuccess?.message;

        setSuccessMessageAdmin(successMessage);
        setShowSuccessMessageAdmin(true);

        setShowCustomConfirmModal(false);

        setIsModalVisibleLocalState(false);

        dispatch(setResponseCommentsMedicalReq(responseCommentsLocalState));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingDeliverDocuments(false);
    }
  };

  const handleCorrectData = () => {
    try {
      dispatch(setResponseCommentsMedicalReq(""));

      setShowCustomConfirmModal(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmittingDeliverDocuments(false);
    }
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
            `¡Documentos enviados correctamente!`
          }
        />
      )}

      {showCustomConfirmModal && (
        <CustomModalTwoOptions
          key={"custom-confirm-modal-deliver-documents"}
          iconCustomModal={<FcInfo size={77} />}
          openCustomModalState={showCustomConfirmModal}
          titleCustomModal="¿Deseas dar respuesta a la solicitud y enviar los documentos?"
          subtitleCustomModal="Se enviarán los documentos solicitados por el usuario en esta solicitud, puede confirmar los detalles de la solicitud en la pantalla anterior."
          handleCancelCustomModal={() => {
            setShowCustomConfirmModal(false);
          }}
          handleConfirmCustomModal={handleConfirmDataModal}
          handleClickCustomModal={handleButtonClick}
          isSubmittingConfirm={isSubmittingDeliverDocuments}
        ></CustomModalTwoOptions>
      )}

      {isModalVisibleLocalState && (
        <CustomModalNoContent
          key={"custom-modal-deliver-documents"}
          widthCustomModalNoContent={"45%"}
          openCustomModalState={isModalVisibleLocalState}
          closableCustomModal={true}
          maskClosableCustomModal={false}
          handleCancelCustomModal={() => {
            dispatch(setDefaultValuesMedicalReq());

            setIsModalVisibleLocalState(false);
          }}
          contentCustomModal={
            <Form
              id="deliver-documents-form"
              name="deliver-documents-form"
              className="deliver-documents-form"
              onFinish={handleCorrectData}
              initialValues={{ remember: false }}
              autoComplete="false"
              layout="vertical"
              style={{
                width: "100%",
              }}
            >
              <h2
                className="title-deliver-documents-form"
                style={{
                  ...titleStyleCss,
                  textAlign: "center",
                  marginBottom: "22px",
                }}
              >
                Responder solicitud y enviar documentos
              </h2>

              <Form.Item
                name="upload-files-documents-delivered"
                label="Documento(s) de respuesta a solicitud"
                style={{ marginBottom: "13px" }}
                tooltip="Aquí debe anexar los documentos que el usuario requiere en la solicitud."
                rules={[
                  {
                    validator: validateRequiredFiles(
                      copyDocumentsDeliveredFilesState,
                      "¡Por favor adjunte documento(s) de respuesta a solicitud!"
                    ),
                  },
                ]}
              >
                <CustomUpload
                  titleCustomUpload="Cargar Documento(s)"
                  fileStatusSetterCustomUpload={
                    setFileDocumentsDeliveredMedicalReq
                  }
                  removeFileStatusSetterCustomUpload={
                    removeFileDocumentsDeliveredMedicalReq
                  }
                  maximumNumberOfFiles={Number(
                    process.env.NEXT_PUBLIC_MAXIMUM_NUMBER_OF_FILES_USERS
                  )}
                  maximumSizeFilesInMegaBytes={Number(
                    process.env.NEXT_PUBLIC_MAXIMUM_FILE_SIZE_IN_MEGABYTES_USERS
                  )}
                />
              </Form.Item>

              <Form.Item
                name="response-comments"
                label="Mensaje de respuesta o comentarios"
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
                {isSubmittingDeliverDocuments ? (
                  <CustomSpin />
                ) : (
                  <Button
                    className="confirm-deliver-documents-button"
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
                    Enviar documentos anexados
                  </Button>
                )}
              </Form.Item>
            </Form>
          }
        />
      )}

      <Button
        className="deliver-documents-button"
        size="large"
        style={{
          backgroundColor: "#1D8348",
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
          <FaCheck size={17} />
          &nbsp; Entregar documentos
        </div>
      </Button>
    </>
  );
};

export default DeliverDocumentsButton;
