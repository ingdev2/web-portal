import { createSlice } from "@reduxjs/toolkit";
import { ItemKeys } from "@/components/common/custom_dashboard_layout/enums/item_names_and_keys.enums";

const initialState = {
  isPageLoading: false,
  componentChange: false,
  adminModalIsOpen: false,
  patientModalIsOpen: false,
  epsModalIsOpen: false,
  familiarModalIsOpen: false,
  passwordResetToken: "",
  selectedKey: ItemKeys.SUB_ALL_REQUESTS_REQ_KEY,
  selectedOpenKeys: [""],
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
    setSelectedKey: (state, action) => {
      state.selectedKey = action.payload;
    },
    setSelectedOpenKeys: (state, action) => {
      state.selectedOpenKeys = action.payload;
    },
    setResetModalAdmin: (state) => {
      state.selectedKey = ItemKeys.SUB_ALL_REQUESTS_REQ_KEY;
      state.selectedOpenKeys = [""];
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
  setSelectedKey,
  setSelectedOpenKeys,
  setResetModalAdmin,
} = modalSlice.actions;

export default modalSlice.reducer;
