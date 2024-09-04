import { createSlice } from "@reduxjs/toolkit";

const initialState: UserLogin = {
  id: "",
  id_type: 0,
  id_type_abbrev: "",
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
    setIdLoginPatient: (state, action) => {
      state.id = action.payload;
    },
    setIdTypeOptionsLoginPatient: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setIdTypeLoginPatient: (state, action) => {
      state.id_type = action.payload;
    },
    setIdTypeAbbrevLoginPatient: (state, action) => {
      state.id_type_abbrev = action.payload;
    },
    setIdNumberLoginPatient: (state, action) => {
      state.id_number = action.payload;
    },
    setPasswordLoginPatient: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCodeLoginPatient: (state, action) => {
      state.verification_code = action.payload;
    },
    setErrorsLoginPatient: (state, action) => {
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
  setIdLoginPatient,
  setIdTypeOptionsLoginPatient,
  setIdTypeLoginPatient,
  setIdTypeAbbrevLoginPatient,
  setIdNumberLoginPatient,
  setPasswordLoginPatient,
  setVerificationCodeLoginPatient,
  setErrorsLoginPatient,
  resetLoginStatePatient,
} = patientUserLoginSlice.actions;

export default patientUserLoginSlice.reducer;
