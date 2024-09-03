import { createSlice } from "@reduxjs/toolkit";

const initialState: EpsCompany = {
  id: 0,
  nit: "",
  name: "",
  main_email: "",
  is_active: true,
  errors: [],
};

export const epsCompanySlice = createSlice({
  name: "epsCompany",
  initialState,
  reducers: {
    setIdEpsCompany: (state, action) => {
      state.id = action.payload;
    },
    setNitEpsCompany: (state, action) => {
      state.nit = action.payload;
    },
    setNameEpsCompany: (state, action) => {
      state.name = action.payload;
    },
    setMainEmailEpsCompany: (state, action) => {
      state.main_email = action.payload;
    },
    setIsActiveEpsCompany: (state, action) => {
      state.is_active = action.payload;
    },
    setErrorsEpsCompany: (state, action) => {
      state.errors = action.payload;
    },
    setResetEpsCompany: (state) => {
      state.id = 0;
      state.nit = "";
      state.name = "";
      state.main_email = "";
      state.errors = [];
    },
  },
});

export const {
  setIdEpsCompany,
  setNitEpsCompany,
  setNameEpsCompany,
  setMainEmailEpsCompany,
  setIsActiveEpsCompany,
  setErrorsEpsCompany,
  setResetEpsCompany,
} = epsCompanySlice.actions;

export default epsCompanySlice.reducer;
