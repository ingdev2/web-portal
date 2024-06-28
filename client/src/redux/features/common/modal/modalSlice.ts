import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPageLoading: false,
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
    setPatientModalIsOpen: (state, action) => {
      state.patientModalIsOpen = action.payload;
    },
    setEpsModalIsOpen: (state, action) => {
      state.epsModalIsOpen = action.payload;
    },
  },
});

export const { setIsPageLoading, setPatientModalIsOpen, setEpsModalIsOpen } =
  modalSlice.actions;

export default modalSlice.reducer;
