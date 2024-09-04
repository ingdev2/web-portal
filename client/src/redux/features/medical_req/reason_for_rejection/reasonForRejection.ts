import { createSlice } from "@reduxjs/toolkit";

const initialState: MedicalReqReasonForRejection = {
  id: 0,
  rejection_title: "",
  reason_message: "",
  errors: [],
};

export const reasonForRejectionSlice = createSlice({
  name: "reasonForRejection",
  initialState,
  reducers: {
    setIdReasonForRejection: (state, action) => {
      state.id = action.payload;
    },
    setRejectionTitleReasonForRejection: (state, action) => {
      state.rejection_title = action.payload;
    },
    setReasonMessageReasonForRejection: (state, action) => {
      state.reason_message = action.payload;
    },
    setErrorsReasonForRejection: (state, action) => {
      state.errors = action.payload;
    },
    setResetReasonForRejection: (state) => {
      state.id = 0;
      state.rejection_title = "";
      state.reason_message = "";
      state.errors = [];
    },
  },
});

export const {
  setIdReasonForRejection,
  setRejectionTitleReasonForRejection,
  setReasonMessageReasonForRejection,
  setErrorsReasonForRejection,
  setResetReasonForRejection,
} = reasonForRejectionSlice.actions;

export default reasonForRejectionSlice.reducer;
