import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  patientModalIsOpen: false,
  epsModalIsOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setPatientModalIsOpen: (state, action) => {
      state.patientModalIsOpen = action.payload;
    },
    setEpsModalIsOpen: (state, action) => {
      state.epsModalIsOpen = action.payload;
    },
  },
});

export const { setPatientModalIsOpen, setEpsModalIsOpen } = modalSlice.actions;

export default modalSlice.reducer;
