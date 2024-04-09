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
    setIdTypeOptions: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setIdType: (state, action) => {
      state.id_type = action.payload;
    },
    setIdNumber: (state, action) => {
      state.id_number = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPatientIdNumber: (state, action) => {
      state.patient_id_number = action.payload;
    },
    setRelationWithPatient: (state, action) => {
      state.rel_with_patient = action.payload;
    },
    setVerificationCode: (state, action) => {
      state.verification_code = action.payload;
    },
    setErrors: (state, action) => {
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
  setIdTypeOptions,
  setIdType,
  setIdNumber,
  setEmail,
  setPatientIdNumber,
  setRelationWithPatient,
  setVerificationCode,
  setErrors,
  resetLoginState,
} = familiarLoginSlice.actions;

export default familiarLoginSlice.reducer;
