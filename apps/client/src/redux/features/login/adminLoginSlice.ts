import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminLogin = {
  id: "",
  id_type: 0,
  id_type_abbrev: "",
  id_number: 0,
  password: "",
  verification_code: 0,
  idTypeOptions: [],
  errors: [],
};

export const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    setIdLoginAdmin: (state, action) => {
      state.id = action.payload;
    },
    setIdTypeLoginAdmin: (state, action) => {
      state.id_type = action.payload;
    },
    setIdTypeAbbrevLoginAdmin: (state, action) => {
      state.id_type_abbrev = action.payload;
    },
    setIdNumberLoginAdmin: (state, action) => {
      state.id_number = action.payload;
    },
    setPasswordLoginAdmin: (state, action) => {
      state.password = action.payload;
    },
    setVerificationCodeLoginAdmin: (state, action) => {
      state.verification_code = action.payload;
    },
    setIdTypeOptionsLoginAdmin: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setErrorsLoginAdmin: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginAdminState: (state) => {
      state.id = initialState.id;
      state.id_type = initialState.id_type;
      state.id_type_abbrev = initialState.id_type_abbrev;
      state.id_number = initialState.id_number;
      state.password = initialState.password;
      state.verification_code = initialState.verification_code;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdLoginAdmin,
  setIdTypeLoginAdmin,
  setIdTypeAbbrevLoginAdmin,
  setIdNumberLoginAdmin,
  setPasswordLoginAdmin,
  setVerificationCodeLoginAdmin,
  setIdTypeOptionsLoginAdmin,
  setErrorsLoginAdmin,
  resetLoginAdminState,
} = adminLoginSlice.actions;

export default adminLoginSlice.reducer;
