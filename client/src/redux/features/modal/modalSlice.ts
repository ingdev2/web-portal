import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalIsOpen: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalIsOpen: (state, action) => {
      state.modalIsOpen = action.payload;
    },
  },
});

export const { setModalIsOpen } = modalSlice.actions;

export default modalSlice.reducer;
