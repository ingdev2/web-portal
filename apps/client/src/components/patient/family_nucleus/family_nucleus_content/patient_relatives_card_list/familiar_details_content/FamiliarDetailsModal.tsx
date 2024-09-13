"use client";

import React, { ReactNode } from "react";

import CustomModalNoContent from "@/components/common/custom_modal_no_content/CustomModalNoContent";
import FamiliarDetailsModalContent from "./FamiliarDetailsModalContent";

const FamiliarDetailsModal: React.FC<{
  modalOpenRequestDetailsModal: boolean;
  selectedFamiliarNameModal: string;
  selectedFamiliarLastNameModal: string;
  selectedFamiliarIdTypeModal: ReactNode;
  selectedFamiliarIdNumberModal: number;
  selectedFamiliarRelationshipWithPatientModal: ReactNode;
  selectedFamiliarEmailModal: string;
  selectedFamiliarCellphoneModal: number;
  selectedFamiliarWhatsappModal: number;
  handleCancelFamiliarDetailsModal: () => void;
}> = ({
  modalOpenRequestDetailsModal,
  selectedFamiliarNameModal,
  selectedFamiliarLastNameModal,
  selectedFamiliarIdTypeModal,
  selectedFamiliarIdNumberModal,
  selectedFamiliarRelationshipWithPatientModal,
  selectedFamiliarEmailModal,
  selectedFamiliarCellphoneModal,
  selectedFamiliarWhatsappModal,
  handleCancelFamiliarDetailsModal,
}) => {
  return (
    <CustomModalNoContent
      key={"custom-details-familiar-modal"}
      widthCustomModalNoContent={"45%"}
      openCustomModalState={modalOpenRequestDetailsModal}
      contentCustomModal={
        <FamiliarDetailsModalContent
          titleDescription={"Detalles de familiar"}
          labelFamiliarName={"Nombre(s):"}
          selectedFamiliarName={selectedFamiliarNameModal}
          labelFamiliarLastName={"Apellido(s):"}
          selectedFamiliarLastName={selectedFamiliarLastNameModal}
          labelFamiliarIdType={"Tipo de identificación:"}
          selectedFamiliarIdType={selectedFamiliarIdTypeModal}
          labelFamiliarIdNumber={"Número de identificación:"}
          selectedFamiliarIdNumber={selectedFamiliarIdNumberModal}
          labelFamiliarRelationshipWithPatient={"Tipo de parentesco:"}
          selectedFamiliarRelationshipWithPatient={
            selectedFamiliarRelationshipWithPatientModal
          }
          labelFamiliarEmail={"Email:"}
          selectedFamiliarEmail={selectedFamiliarEmailModal}
          labelFamiliarCellphone={"Celular:"}
          selectedFamiliarCellphone={selectedFamiliarCellphoneModal}
          labelFamiliarWhatsapp={"Whatsapp"}
          selectedFamiliarWhatsapp={selectedFamiliarWhatsappModal}
        />
      }
      maskClosableCustomModal={true}
      closableCustomModal={true}
      handleCancelCustomModal={handleCancelFamiliarDetailsModal}
    />
  );
};

export default FamiliarDetailsModal;
