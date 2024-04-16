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
    setIdTypeOptions: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setIdType: (state, action) => {
      state.id_type = action.payload;
    },
    setIdNumber: (state, action) => {
      state.id_number = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
    resetLoginState: (state) => {
      state.id_type = initialState.id_type;
      state.id_number = initialState.id_number;
      state.password = initialState.password;
      state.errors = initialState.errors;
    },
  },
});

export const {
  setIdTypeOptions,
  setIdType,
  setIdNumber,
  setPassword,
  setErrors,
  resetLoginState,
} = adminLoginSlice.actions;

export default adminLoginSlice.reducer;
