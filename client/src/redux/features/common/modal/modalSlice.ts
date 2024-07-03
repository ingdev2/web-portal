import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoading: false,
  componentChange: false,
  patientModalIsOpen: false,
  epsModalIsOpen: false,
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
    setPatientModalIsOpen: (state, action) => {
      state.patientModalIsOpen = action.payload;
    },
    setEpsModalIsOpen: (state, action) => {
      state.epsModalIsOpen = action.payload;
    },
  },
});

export const {
  setIsPageLoading,
  setComponentChange,
  setPatientModalIsOpen,
  setEpsModalIsOpen,
} = modalSlice.actions;

export default modalSlice.reducer;
