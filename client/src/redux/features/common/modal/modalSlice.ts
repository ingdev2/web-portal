import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoading: false,
  componentChange: false,
  adminModalIsOpen: false,
  patientModalIsOpen: false,
  epsModalIsOpen: false,
  familiarModalIsOpen: false,
  passwordResetToken: "",
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setIsPageLoading: (state, action) => {
      state.isPageLoading = action.payload;
    },
    setComponentChange: (state, action) => {
      state.componentChange = action.payload;
    },
    setAdminModalIsOpen: (state, action) => {
      state.adminModalIsOpen = action.payload;
    },
    setPatientModalIsOpen: (state, action) => {
      state.patientModalIsOpen = action.payload;
    },
    setEpsModalIsOpen: (state, action) => {
      state.epsModalIsOpen = action.payload;
    },
    setFamiliarModalIsOpen: (state, action) => {
      state.familiarModalIsOpen = action.payload;
    },
    setPasswordResetToken: (state, action) => {
      state.passwordResetToken = action.payload;
    },
  },
});

export const {
  setIsPageLoading,
  setComponentChange,
  setAdminModalIsOpen,
  setPatientModalIsOpen,
  setEpsModalIsOpen,
  setFamiliarModalIsOpen,
  setPasswordResetToken,
} = modalSlice.actions;

export default modalSlice.reducer;
