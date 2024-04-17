import { createSlice } from "@reduxjs/toolkit";

const initialState: UserLogin = {
  id_type: 0,
  id_type_abbrev: "",
  id_number: 0,
  password: "",
  verification_code: 0,
  idTypeOptions: [],
  errors: [],
};

export const epsUserLoginSlice = createSlice({
  name: "epsUserLogin",
  initialState,
  reducers: {
    setIdTypeOptionsLoginEps: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setIdTypeLoginEps: (state, action) => {
      state.id_type = action.payload;
    },
    setIdNumberLoginEps: (state, action) => {
      state.id_number = action.payload;
    },
    setPasswordLoginEps: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCodeLoginEps: (state, action) => {
      state.verification_code = action.payload;
    },
    setErrorsLoginEps: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginStateLoginEps: (state) => {
      state.id_type = initialState.id_type;
      state.id_number = initialState.id_number;
      state.password = initialState.password;
      state.verification_code = initialState.verification_code;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdTypeOptionsLoginEps,
  setIdTypeLoginEps,
  setIdNumberLoginEps,
  setPasswordLoginEps,
  setVerificationCodeLoginEps,
  setErrorsLoginEps,
  resetLoginStateLoginEps,
} = epsUserLoginSlice.actions;

export default epsUserLoginSlice.reducer;
