import { Dispatch } from "@reduxjs/toolkit";

import {
  setPatientClassStatusMedicalReq,
  setPatientClassStatusAbbrevMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";

import { PatientClassificationStatus } from "@/../../api/src/medical_req/enums/patient_classification_status.enum";

export const calculatePatientAge = (
  birthdatePatientOfFamiliarState: string,
  patientClassStatusData: any[],
  dispatch: Dispatch<any>
) => {
  const birthDate = new Date(birthdatePatientOfFamiliarState);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  let patientClassStatusId: number | null = null;
  let patientClassName: string | null = null;

  if (age < 18) {
    patientClassName = PatientClassificationStatus.YOUNGER;
  } else {
    patientClassName = PatientClassificationStatus.ADULT;
  }

  const matchedClass = patientClassStatusData.find(
    (patientClass: any) => patientClass.name === patientClassName
  );

  if (matchedClass) {
    patientClassStatusId = matchedClass.id;
  }

  if (patientClassStatusId) {
    dispatch(setPatientClassStatusMedicalReq(patientClassStatusId || 0));
    dispatch(setPatientClassStatusAbbrevMedicalReq(patientClassName || ""));
  }
};
