import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalIsOpen: false,
  cancelModal: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModalIsOpen: (state, action) => {
      state.modalIsOpen = action.payload;
    },
    setCancelModal: (state, action) => {
      state.cancelModal = action.payload;
    },
  },
});

export const { setModalIsOpen, setCancelModal } = modalSlice.actions;

export default modalSlice.reducer;
