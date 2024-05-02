import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminLogin = {
  id_type: 0,
  id_number: 0,
  password: "",
  idTypeOptions: [],
  errors: [],
};

export const adminLoginSlice = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    setIdTypeOptionsLoginAdmin: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setIdTypeLoginAdmin: (state, action) => {
      state.id_type = action.payload;
    },
    setIdNumberLoginAdmin: (state, action) => {
      state.id_number = action.payload;
    },
    setPasswordLoginAdmin: (state, action) => {
      state.password = action.payload;
    },
    setErrorsLoginAdmin: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginAdminState: (state) => {
      state.id_type = initialState.id_type;
      state.id_number = initialState.id_number;
      state.password = initialState.password;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdTypeOptionsLoginAdmin,
  setIdTypeLoginAdmin,
  setIdNumberLoginAdmin,
  setPasswordLoginAdmin,
  setErrorsLoginAdmin,
  resetLoginAdminState,
} = adminLoginSlice.actions;

export default adminLoginSlice.reducer;
