import { createSlice } from "@reduxjs/toolkit";

const initialState: FamiliarLogin = {
  id_type: 0,
  id_number: 0,
  email: "",
  patient_id_number: 0,
  rel_with_patient: 0,
  verification_code: 0,
  idTypeOptions: [],
  errors: [],
};

export const familiarLoginSlice = createSlice({
  name: "familiarLogin",
  initialState,
  reducers: {
    setIdTypeOptionsLoginFamiliar: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setIdTypeLoginFamiliar: (state, action) => {
      state.id_type = action.payload;
    },
    setIdNumberLoginFamiliar: (state, action) => {
      state.id_number = action.payload;
    },
    setEmailLoginFamiliar: (state, action) => {
      state.email = action.payload;
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
    setErrorsLoginFamiliar: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginState: (state) => {
      state.id_type = initialState.id_type;
      state.id_number = initialState.id_number;
      state.verification_code = initialState.verification_code;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdTypeOptionsLoginFamiliar,
  setIdTypeLoginFamiliar,
  setIdNumberLoginFamiliar,
  setEmailLoginFamiliar,
  setPatientIdNumberLoginFamiliar,
  setRelationWithPatientLoginFamiliar,
  setVerificationCodeLoginFamiliar,
  setErrorsLoginFamiliar,
  resetLoginState,
} = familiarLoginSlice.actions;

export default familiarLoginSlice.reducer;
