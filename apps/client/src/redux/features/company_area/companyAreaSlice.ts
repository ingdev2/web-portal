import { createSlice } from "@reduxjs/toolkit";

const initialState: CompanyArea = {
  id: 0,
  name: "",
  errors: [],
};

export const companyAreaSlice = createSlice({
  name: "companyArea",
  initialState,
  reducers: {
    setIdCompanyArea: (state, action) => {
      state.id = action.payload;
    },
    setNameCompanyArea: (state, action) => {
      state.name = action.payload;
    },
    setErrorsCompanyArea: (state, action) => {
      state.errors = action.payload;
    },
    setResetCompanyArea: (state) => {
      state.id = 0;
      state.name = "";
      state.errors = [];
    },
  },
});

export const {
  setIdCompanyArea,
  setNameCompanyArea,
  setErrorsCompanyArea,
  setResetCompanyArea,
} = companyAreaSlice.actions;

export default companyAreaSlice.reducer;
