import { createSlice } from "@reduxjs/toolkit";

const initialState: FamiliarLogin = {
  id_type_familiar: 0,
  id_number_familiar: 0,
  email_familiar: "",
  patient_id_number: 0,
  rel_with_patient: 0,
  verification_code: 0,
  idTypeOptions: [],
  relationshipTypesOptions: [],
  errors: [],
};

export const familiarLoginSlice = createSlice({
  name: "familiarLogin",
  initialState,
  reducers: {
    setIdTypeLoginFamiliar: (state, action) => {
      state.id_type_familiar = action.payload;
    },
    setIdNumberLoginFamiliar: (state, action) => {
      state.id_number_familiar = action.payload;
    },
    setEmailLoginFamiliar: (state, action) => {
      state.email_familiar = action.payload;
    },
    setPatientIdNumberLoginFamiliar: (state, action) => {
      state.patient_id_number = action.payload;
    },
    setRelationWithPatientLoginFamiliar: (state, action) => {
      state.rel_with_patient = action.payload;
    },
    setVerificationCodeLoginFamiliar: (state, action) => {
      state.verification_code = action.payload;
    },
    setIdTypeOptionsLoginFamiliar: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setRelationshipTypesOptionsLoginFamiliar: (state, action) => {
      state.relationshipTypesOptions = action.payload;
    },
    setErrorsLoginFamiliar: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginFamiliarState: (state) => {
      state.id_type_familiar = initialState.id_type_familiar;
      state.id_number_familiar = initialState.id_number_familiar;
      state.email_familiar = initialState.email_familiar;
      state.patient_id_number = initialState.patient_id_number;
      state.rel_with_patient = initialState.rel_with_patient;
      state.verification_code = initialState.verification_code;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdTypeOptionsLoginFamiliar,
  setRelationshipTypesOptionsLoginFamiliar,
  setIdTypeLoginFamiliar,
  setIdNumberLoginFamiliar,
  setEmailLoginFamiliar,
  setPatientIdNumberLoginFamiliar,
  setRelationWithPatientLoginFamiliar,
  setVerificationCodeLoginFamiliar,
  setErrorsLoginFamiliar,
  resetLoginFamiliarState,
} = familiarLoginSlice.actions;

export default familiarLoginSlice.reducer;
