"use client";

import React, { ReactNode } from "react";

import { Button } from "antd";
import { TbEye } from "react-icons/tb";

import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import RequestDetailsModalContent from "./RequestDetailsModalContent";

const RequestDetailsModal: React.FC<{
  modalOpenRequestDetailsModal: boolean;
  selectedRequestFilingNumberModal: string;
  selectedRequestTypeModal: ReactNode;
  selectedRequestStatusModal: ReactNode;
  selectedRequestResponseDocumentsModal: ReactNode;
  selectedRequestDocumentExpirationDateModal: ReactNode;
  selectedRequestReasonsForRejectionModal: string[];
  selectedRequestUserCommentsModal: string;
  selectedRequestResponseCommentsModal: string;
  handleCancelRequestDetailsModal: () => void;
}> = ({
  modalOpenRequestDetailsModal,
  selectedRequestFilingNumberModal,
  selectedRequestTypeModal,
  selectedRequestStatusModal,
  selectedRequestResponseDocumentsModal,
  selectedRequestDocumentExpirationDateModal,
  selectedRequestReasonsForRejectionModal,
  selectedRequestUserCommentsModal,
  selectedRequestResponseCommentsModal,
  handleCancelRequestDetailsModal,
}) => {
  return (
    <CustomModalNoContent
      key={"custom-details-medical-req-modal"}
      widthCustomModalNoContent={"45%"}
      openCustomModalState={modalOpenRequestDetailsModal}
      contentCustomModal={
        <RequestDetailsModalContent
          titleDescription={"Detalles de solicitud"}
          labelFilingNumber={"N° de Radicado:"}
          selectedRequestFilingNumber={selectedRequestFilingNumberModal}
          labelRequestType={"Tipo:"}
          selectedRequestType={selectedRequestTypeModal}
          labelRequestStatus={"Estado:"}
          selectedRequestStatus={selectedRequestStatusModal}
          labelResponseDocuments={"Documentos de respuesta a solicitud:"}
          selectedRequestResponseDocuments={
            selectedRequestResponseDocumentsModal ? (
              <Button
                className="documents-response-link-button"
                size="middle"
                style={{
                  backgroundColor: "#015E90",
                  color: "#F7F7F7",
                }}
                href={selectedRequestResponseDocumentsModal?.toString()}
                target="_blank"
              >
                <div
                  style={{
                    minWidth: "137px",
                    display: "flex",
                    flexFlow: "row wrap",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <TbEye size={17} />
                  &nbsp;Ver documentos
                </div>
              </Button>
            ) : (
              <b style={{ color: "#960202" }}>No hay documentos anexados</b>
            )
          }
          labelDocumentExpirationDate="Fecha de expiración de documentos"
          selectedRequestDocumentExpirationDate={
            selectedRequestDocumentExpirationDateModal || (
              <b style={{ color: "#960202" }}>No aplica</b>
            )
          }
          labelReasonsForRejection="Motivos de rechazo a solicitud"
          selectedRequestReasonsForRejection={
            selectedRequestReasonsForRejectionModal.length > 0 ? (
              <ul>
                {selectedRequestReasonsForRejectionModal.map(
                  (reason, index) => (
                    <li key={index}>{reason}</li>
                  )
                )}
              </ul>
            ) : (
              <b style={{ color: "#960202" }}>No aplica</b>
            )
          }
          labelUserComments={"Detalles del usuario para solicitud"}
          selectedRequestUserComments={selectedRequestUserCommentsModal}
          labelRequestResponse={"Mensaje de respuesta a solicitud"}
          selectedRequestResponse={
            selectedRequestResponseCommentsModal || (
              <b style={{ color: "#960202" }}>En espera de respuesta</b>
            )
          }
        />
      }
      maskClosableCustomModal={true}
      closableCustomModal={true}
      handleCancelCustomModal={handleCancelRequestDetailsModal}
    />
  );
};

export default RequestDetailsModal;
