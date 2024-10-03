import { Dispatch } from "@reduxjs/toolkit";

import {
  setPatientClassStatusMedicalReq,
  setPatientClassStatusAbbrevMedicalReq,
} from "@/redux/features/medical_req/medicalReqSlice";

import { PatientClassificationStatus } from "@/utils/enums/patient_classification_status.enum";

export const handleDeceasedPatient = (
  patientClassStatusData: any[],
  dispatch: Dispatch<any>
) => {
  let patientClassStatusId: number | null = null;
  let patientClassName: string | null = null;

  patientClassName = PatientClassificationStatus.DECEASED;

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
