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
                <p style={subtitleStyleCss}>
                  <b>Número de Radicado:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedRequestFilingNumber}</p>
                <p style={subtitleStyleCss}>
                  <b>Tipo de Solicitud:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedRequestType}</p>
                <p style={subtitleStyleCss}>
                  <b>Estado:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedRequestStatus}</p>
                <p style={subtitleStyleCss}>
                  <b>Derecho de Petición:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedHaveRightPetition}</p>
                <p style={subtitleStyleCss}>
                  <b>Comentarios del Usuario:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedRequestUserComments}</p>
              </>
            ),
          },
          {
            title: "Información del Paciente",
            content: (
              <>
                <p style={subtitleStyleCss}>
                  <b>Clase de Paciente:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedPatientClassStatus}</p>
                <p style={subtitleStyleCss}>
                  <b>Tipo de Identificación:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedPatientIdType}</p>
                <p style={subtitleStyleCss}>
                  <b>Número de Identificación:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedPatientIdNumber}</p>
                <p style={subtitleStyleCss}>
                  <b>Nombre:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedPatientName}</p>
                <p style={subtitleStyleCss}>
                  <b>Fechas de Registro:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedRegistrationDates}</p>
              </>
            ),
          },
          {
            title: "Información del Solicitante",
            content: (
              <>
                <p style={subtitleStyleCss}>
                  <b>Tipo de Solicitante:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedAplicantType}</p>
                <p style={subtitleStyleCss}>
                  <b>Nombre:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedAplicantName}</p>
                <p style={subtitleStyleCss}>
                  <b>Tipo de Identificación:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedAplicantIdType}</p>
                <p style={subtitleStyleCss}>
                  <b>Número de Identificación:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedAplicantIdNumber}</p>
                <p style={subtitleStyleCss}>
                  <b>Relación con el Paciente:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedRelationShipWithPatient}
                </p>
                <p style={subtitleStyleCss}>
                  <b>Email:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedAplicantEmail}</p>
              </>
            ),
          },
          {
            title: "Documentos Anexados",
            content: (
              <>
                <p style={subtitleStyleCss}>
                  <b>Copia Documento de Identificación del Solicitante:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedCopyAplicantIdDocument}
                </p>
                <p style={subtitleStyleCss}>
                  <b>Copia Cédula de Ciudadanía del Paciente:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedCopyPatientCitizenshipCard}
                </p>
                <p style={subtitleStyleCss}>
                  <b>Copia Registro Civil del Paciente:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedCopyPatientCivilRegistration}
                </p>
                <p style={subtitleStyleCss}>
                  <b>Copia Cédula de Ciudadanía de los Padres:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedCopyParentsCitizenshipCard}
                </p>
                <p style={subtitleStyleCss}>
                  <b>Copia Certificado de Matrimonio:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedCopyMarriageCertificate}
                </p>
                <p style={subtitleStyleCss}>
                  <b>Copia Certificado de Convivencia:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedCopyCohabitationCertificate}
                </p>
              </>
            ),
          },
          {
            title: "Fechas y Tiempo de Respuesta",
            content: (
              <>
                <p style={subtitleStyleCss}>
                  <b>Fecha de Ingreso:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedDateOfAdmission}</p>
                <p style={subtitleStyleCss}>
                  <b>Fecha de Respuesta:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedAnswerDate}</p>
                <p style={subtitleStyleCss}>
                  <b>Tiempo de Respuesta:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedResponseTime}</p>
                <p style={subtitleStyleCss}>
                  <b>Actualmente en Área:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedCurrentlyInArea}</p>
                <p style={subtitleStyleCss}>
                  <b>Mensaje de Redirección de Área:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedAreaRedirectionMessage}
                </p>
              </>
            ),
          },
          {
            title: "Documentos de Respuesta",
            content: (
              <>
                <p style={subtitleStyleCss}>
                  <b>Documentos de Respuesta:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedRequestResponseDocuments}
                </p>
                <p style={subtitleStyleCss}>
                  <b>Fecha de Expiración de Documentos:</b>
                </p>
                <p style={itemSeccionStyleCss}>
                  {selectedRequestDocumentExpirationDate}
                </p>
                <p style={subtitleStyleCss}>
                  <b>Respuesta de la Solicitud:</b>
                </p>
                <p style={itemSeccionStyleCss}>{selectedRequestResponse}</p>
                <p style={subtitleStyleCss}>
                  <b>Razones para el Rechazo:</b>
                </p>
                <p>{selectedRequestReasonsForRejection}</p>
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
