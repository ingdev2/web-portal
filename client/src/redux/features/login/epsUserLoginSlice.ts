import { createSlice } from "@reduxjs/toolkit";

const initialState: UserLogin = {
  id_type: 0,
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
    setIdTypeOptionsEps: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setIdTypeEps: (state, action) => {
      state.id_type = action.payload;
    },
    setIdNumberEps: (state, action) => {
      state.id_number = action.payload;
    },
    setPasswordEps: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCodeEps: (state, action) => {
      state.verification_code = action.payload;
    },
    setErrorsEps: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginStateEps: (state) => {
      state.id_type = initialState.id_type;
      state.id_number = initialState.id_number;
      state.password = initialState.password;
      state.verification_code = initialState.verification_code;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdTypeOptionsEps,
  setIdTypeEps,
  setIdNumberEps,
  setPasswordEps,
  setVerificationCodeEps,
  setErrorsEps,
  resetLoginStateEps,
} = epsUserLoginSlice.actions;

export default epsUserLoginSlice.reducer;
