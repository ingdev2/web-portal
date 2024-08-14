"use client";

import React, { ReactNode } from "react";

import { Col, Descriptions } from "antd";

import { titleStyleCss, subtitleStyleCss } from "@/theme/text_styles";

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
        padding: "2px",
        margin: "0px",
      }}
    >
      <h2
        style={{
          width: "100%",
          ...titleStyleCss,
          margin: "0px",
          paddingBottom: "13px",
        }}
      >
        {titleDescription}
      </h2>

      <Descriptions
        className="description-request-details-admin"
        layout="vertical"
        size="middle"
        style={{ paddingBlock: "7px" }}
        labelStyle={{
          ...titleStyleCss,
        }}
        contentStyle={{
          ...subtitleStyleCss,
        }}
        bordered
        column={14}
      >
        <Descriptions.Item
          label={labelFilingNumber}
          style={{ textAlign: "center" }}
          span={1}
        >
          {selectedRequestFilingNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelRequestType}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedRequestType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelRequestStatus}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedRequestStatus}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelHaveRightPetition}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedHaveRightPetition}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelUserComments}
          style={{ textAlign: "center" }}
          span={7}
        >
          {selectedRequestUserComments}
        </Descriptions.Item>

        {/* FILA 1 */}

        <Descriptions.Item
          label={labelPatientClassStatus}
          style={{ textAlign: "center" }}
          span={1}
        >
          {selectedPatientClassStatus}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelPatientIdType}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedPatientIdType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelPatientIdNumber}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedPatientIdNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelPatientName}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedPatientName}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelRegistrationDates}
          style={{ textAlign: "center" }}
          span={7}
        >
          {selectedRegistrationDates}
        </Descriptions.Item>

        {/* FILA 2 */}

        <Descriptions.Item
          label={labelAplicantType}
          style={{ textAlign: "center" }}
          span={1}
        >
          {selectedAplicantType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAplicantName}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedAplicantName}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAplicantIdType}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedAplicantIdType}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAplicantIdNumber}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedAplicantIdNumber}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelRelationShipWithPatient}
          style={{ textAlign: "center" }}
          span={7}
        >
          {selectedRelationShipWithPatient}
        </Descriptions.Item>

        {/* FILA 3 */}

        <Descriptions.Item
          label={labelAplicantEmail}
          style={{ textAlign: "center" }}
          span={1}
        >
          {selectedAplicantEmail}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelCopyAplicantIdDocument}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedCopyAplicantIdDocument}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelCopyPatientCitizenshipCard}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedCopyPatientCitizenshipCard}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelCopyPatientCivilRegistration}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedCopyPatientCivilRegistration}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelCopyParentsCitizenshipCard}
          style={{ textAlign: "center" }}
          span={7}
        >
          {selectedCopyParentsCitizenshipCard}
        </Descriptions.Item>

        {/* FILA 4 */}

        <Descriptions.Item
          label={labelCopyMarriageCertificate}
          style={{ textAlign: "center" }}
          span={1}
        >
          {selectedCopyMarriageCertificate}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelCopyCohabitationCertificate}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedCopyCohabitationCertificate}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelDateOfAdmission}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedDateOfAdmission}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelAnswerDate}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedAnswerDate}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelResponseTime}
          style={{ textAlign: "center" }}
          span={7}
        >
          {selectedResponseTime}
        </Descriptions.Item>

        {/* FILA 5 */}

        <Descriptions.Item
          label={labelCurrentlyInArea}
          style={{ textAlign: "center" }}
          span={1}
        >
          {selectedCurrentlyInArea}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelResponseDocuments}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedRequestResponseDocuments}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelDocumentExpirationDate}
          style={{ textAlign: "center" }}
          span={2}
        >
          {selectedRequestDocumentExpirationDate}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelRequestResponse}
          style={{ textAlign: "center" }}
          span={9}
        >
          {selectedRequestResponse}
        </Descriptions.Item>

        {/* FILA 6 */}
        <Descriptions.Item
          label={labelAreaRedirectionMessage}
          style={{ textAlign: "center" }}
          span={3}
        >
          {selectedAreaRedirectionMessage}
        </Descriptions.Item>

        <Descriptions.Item
          label={labelReasonsForRejection}
          style={{ textAlign: "center" }}
          span={7}
        >
          {selectedRequestReasonsForRejection}
        </Descriptions.Item>

        {/* FILA 7 */}
      </Descriptions>
    </Col>
  );
};

export default ModalRequestsDetails;
