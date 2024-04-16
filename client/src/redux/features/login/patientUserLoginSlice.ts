import { createSlice } from "@reduxjs/toolkit";

const initialState: UserLogin = {
  id_type: 0,
  id_number: 0,
  password: "",
  verification_code: 0,
  idTypeOptions: [],
  errors: [],
};

export const patientUserLoginSlice = createSlice({
  name: "patientUserLogin",
  initialState,
  reducers: {
    setIdTypeOptionsPatient: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setIdTypePatient: (state, action) => {
      state.id_type = action.payload;
    },
    setIdNumberPatient: (state, action) => {
      state.id_number = action.payload;
    },
    setPasswordPatient: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCodePatient: (state, action) => {
      state.verification_code = action.payload;
    },
    setErrorsPatient: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginStatePatient: (state) => {
      state.id_type = initialState.id_type;
      state.id_number = initialState.id_number;
      state.password = initialState.password;
      state.verification_code = initialState.verification_code;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdTypeOptionsPatient,
  setIdTypePatient,
  setIdNumberPatient,
  setPasswordPatient,
  setVerificationCodePatient,
  setErrorsPatient,
  resetLoginStatePatient,
} = patientUserLoginSlice.actions;

export default patientUserLoginSlice.reducer;
