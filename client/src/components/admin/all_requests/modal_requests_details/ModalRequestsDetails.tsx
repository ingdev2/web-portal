"use client";

import React, { ReactNode } from "react";

import { Card, Col, Row } from "antd";

import {
  titleStyleCss,
  subtitleStyleCss,
  itemSeccionStyleCss,
} from "@/theme/text_styles";

const ModalRequestsDetails: React.FC<{
  titleDescription: string;
  labelFilingNumber: string;
  selectedRequestFilingNumber: string;
  labelRequestType: string;
  selectedRequestType: ReactNode;
  labelRequestStatus: string;
  selectedRequestStatus: ReactNode;
  labelResponseDocuments: string;
  selectedRequestResponseDocuments: ReactNode;
  labelDocumentExpirationDate: string;
  selectedRequestDocumentExpirationDate: ReactNode;
  labelHaveRightPetition: string;
  selectedHaveRightPetition: ReactNode;
  labelUserComments: string;
  selectedRequestUserComments: string | undefined;
  labelPatientName: string;
  selectedPatientName: string | undefined;
  labelPatientIdType: string;
  selectedPatientIdType: ReactNode;
  labelPatientIdNumber: string;
  selectedPatientIdNumber: number | undefined;
  labelPatientClassStatus: string;
  selectedPatientClassStatus: ReactNode;
  labelRegistrationDates: string;
  selectedRegistrationDates: string | undefined;
  labelRelationShipWithPatient: string;
  selectedRelationShipWithPatient: ReactNode;
  labelAplicantType: string;
  selectedAplicantType: ReactNode;
  labelAplicantName: string;
  selectedAplicantName: string | undefined;
  labelAplicantIdType: string;
  selectedAplicantIdType: ReactNode;
  labelAplicantIdNumber: string;
  selectedAplicantIdNumber: number | undefined;
  labelAplicantEmail: string;
  selectedAplicantEmail: string | undefined;
  labelCopyAplicantIdDocument: string;
  selectedCopyAplicantIdDocument: ReactNode;
  labelCopyPatientCitizenshipCard: string;
  selectedCopyPatientCitizenshipCard: ReactNode;
  labelCopyPatientCivilRegistration: string;
  selectedCopyPatientCivilRegistration: ReactNode;
  labelCopyParentsCitizenshipCard: string;
  selectedCopyParentsCitizenshipCard: ReactNode;
  labelCopyMarriageCertificate: string;
  selectedCopyMarriageCertificate: ReactNode;
  labelCopyCohabitationCertificate: string;
  selectedCopyCohabitationCertificate: ReactNode;
  labelDateOfAdmission: string;
  selectedDateOfAdmission: ReactNode;
  labelAnswerDate: string;
  selectedAnswerDate: ReactNode;
  labelResponseTime: string;
  selectedResponseTime: ReactNode;
  labelCurrentlyInArea: string;
  selectedCurrentlyInArea: ReactNode;
  labelRequestResponse: string;
  selectedRequestResponse: ReactNode;
  labelReasonsForRejection: string;
  selectedRequestReasonsForRejection: ReactNode;
  labelAreaRedirectionMessage: string;
  selectedAreaRedirectionMessage: ReactNode;
}> = ({
  titleDescription,
  labelFilingNumber,
  selectedRequestFilingNumber,
  labelRequestType,
  selectedRequestType,
  labelRequestStatus,
  selectedRequestStatus,
  labelDateOfAdmission,
  selectedDateOfAdmission,
  labelResponseDocuments,
  selectedRequestResponseDocuments,
  labelDocumentExpirationDate,
  selectedRequestDocumentExpirationDate,
  labelHaveRightPetition,
  selectedHaveRightPetition,
  labelUserComments,
  selectedRequestUserComments,
  labelPatientName,
  selectedPatientName,
  labelPatientIdType,
  selectedPatientIdType,
  labelPatientIdNumber,
  selectedPatientIdNumber,
  labelPatientClassStatus,
  selectedPatientClassStatus,
  labelRegistrationDates,
  selectedRegistrationDates,
  labelRelationShipWithPatient,
  selectedRelationShipWithPatient,
  labelAplicantType,
  selectedAplicantType,
  labelAplicantName,
  selectedAplicantName,
  labelAplicantIdType,
  selectedAplicantIdType,
  labelAplicantIdNumber,
  selectedAplicantIdNumber,
  labelAplicantEmail,
  selectedAplicantEmail,
  labelCopyAplicantIdDocument,
  selectedCopyAplicantIdDocument,
  labelCopyPatientCitizenshipCard,
  selectedCopyPatientCitizenshipCard,
  labelCopyPatientCivilRegistration,
  selectedCopyPatientCivilRegistration,
  labelCopyParentsCitizenshipCard,
  selectedCopyParentsCitizenshipCard,
  labelCopyMarriageCertificate,
  selectedCopyMarriageCertificate,
  labelCopyCohabitationCertificate,
  selectedCopyCohabitationCertificate,
  labelAnswerDate,
  selectedAnswerDate,
  labelResponseTime,
  selectedResponseTime,
  labelCurrentlyInArea,
  selectedCurrentlyInArea,
  labelRequestResponse,
  selectedRequestResponse,
  labelReasonsForRejection,
  selectedRequestReasonsForRejection,
  labelAreaRedirectionMessage,
  selectedAreaRedirectionMessage,
}) => {
  return (
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
        alignItems: "center",
        padding: "2px",
        margin: "0px",
      }}
    >
      <h2
        style={{
          width: "100%",
          ...titleStyleCss,
          fontSize: "22px",
          margin: "0px",
          paddingBottom: "22px",
        }}
      >
        {titleDescription}
      </h2>

      <Row gutter={[24, 24]} style={{ width: "100%" }}>
        {[
          {
            title: "Información de la Solicitud",
            content: (
              <>
                <div style={subtitleStyleCss}>
                  <b>Número de Radicado:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedRequestFilingNumber}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Tipo de Solicitud:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedRequestType}</div>
                <div style={subtitleStyleCss}>
                  <b>Estado:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedRequestStatus}</div>
                <div style={subtitleStyleCss}>
                  <b>Derecho de Petición:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedHaveRightPetition}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Comentarios del Usuario:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedRequestUserComments}
                </div>
              </>
            ),
          },
          {
            title: "Información del Paciente",
            content: (
              <>
                <div style={subtitleStyleCss}>
                  <b>Clase de Paciente:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedPatientClassStatus}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Tipo de Identificación:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedPatientIdType}</div>
                <div style={subtitleStyleCss}>
                  <b>Número de Identificación:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedPatientIdNumber}</div>
                <div style={subtitleStyleCss}>
                  <b>Nombre:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedPatientName}</div>
                <div style={subtitleStyleCss}>
                  <b>Fechas de Registro:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedRegistrationDates}
                </div>
              </>
            ),
          },
          {
            title: "Información del Solicitante",
            content: (
              <>
                <div style={subtitleStyleCss}>
                  <b>Tipo de Solicitante:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedAplicantType}</div>
                <div style={subtitleStyleCss}>
                  <b>Nombre:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedAplicantName}</div>
                <div style={subtitleStyleCss}>
                  <b>Tipo de Identificación:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedAplicantIdType}</div>
                <div style={subtitleStyleCss}>
                  <b>Número de Identificación:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedAplicantIdNumber}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Relación con el Paciente:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedRelationShipWithPatient}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Email:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedAplicantEmail}</div>
              </>
            ),
          },
          {
            title: "Documentos Anexados",
            content: (
              <>
                <div style={subtitleStyleCss}>
                  <b>Copia Documento de Identificación del Solicitante:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedCopyAplicantIdDocument}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Copia Cédula de Ciudadanía del Paciente:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedCopyPatientCitizenshipCard}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Copia Registro Civil del Paciente:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedCopyPatientCivilRegistration}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Copia Cédula de Ciudadanía de los Padres:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedCopyParentsCitizenshipCard}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Copia Certificado de Matrimonio:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedCopyMarriageCertificate}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Copia Certificado de Convivencia:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedCopyCohabitationCertificate}
                </div>
              </>
            ),
          },
          {
            title: "Fechas y Tiempo de Respuesta",
            content: (
              <>
                <div style={subtitleStyleCss}>
                  <b>Fecha de Ingreso:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedDateOfAdmission}</div>
                <div style={subtitleStyleCss}>
                  <b>Fecha de Respuesta:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedAnswerDate}</div>
                <div style={subtitleStyleCss}>
                  <b>Tiempo de Respuesta:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedResponseTime}</div>
                <div style={subtitleStyleCss}>
                  <b>Actualmente en Área:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedCurrentlyInArea}</div>
                <div style={subtitleStyleCss}>
                  <b>Mensaje de Redirección de Área:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedAreaRedirectionMessage}
                </div>
              </>
            ),
          },
          {
            title: "Documentos de Respuesta",
            content: (
              <>
                <div style={subtitleStyleCss}>
                  <b>Documentos de Respuesta:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedRequestResponseDocuments}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Fecha de Expiración de Documentos:</b>
                </div>
                <div style={itemSeccionStyleCss}>
                  {selectedRequestDocumentExpirationDate}
                </div>
                <div style={subtitleStyleCss}>
                  <b>Respuesta de la Solicitud:</b>
                </div>
                <div style={itemSeccionStyleCss}>{selectedRequestResponse}</div>
                <div style={subtitleStyleCss}>
                  <b>Razones para el Rechazo:</b>
                </div>
                <div>{selectedRequestReasonsForRejection}</div>
              </>
            ),
          },
        ].map((card, index) => (
          <Col span={12} key={index}>
            <Card
              title={
                <div
                  style={{
                    ...titleStyleCss,
                    fontSize: "17px",
                    margin: "0px",
                    padding: "0px",
                  }}
                >
                  {card.title}
                </div>
              }
              style={{
                background: "#A7BAB713",
                minHeight: "100%",
                border: "0.7px solid #013B5A22",
                borderRadius: "7px",
                margin: "0px",
                padding: "0px",
              }}
            >
              {card.content}
            </Card>
          </Col>
        ))}
      </Row>
    </Col>
  );
};

export default ModalRequestsDetails;
