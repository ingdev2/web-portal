import { createSlice } from "@reduxjs/toolkit";

const initialState: MedicalReqType = {
  id: 0,
  name: "",
  is_active: true,
  errors: [],
};

export const typeOfMedicalRequestSlice = createSlice({
  name: "typeOfMedicalRequest",
  initialState,
  reducers: {
    setIdTypeOfMedicalRequest: (state, action) => {
      state.id = action.payload;
    },
    setNameTypeOfMedicalRequest: (state, action) => {
      state.name = action.payload;
    },
    setIsActiveTypeOfMedicalRequest: (state, action) => {
      state.is_active = action.payload;
    },
    setErrorsTypeOfMedicalRequest: (state, action) => {
      state.errors = action.payload;
    },
    setResetTypeOfMedicalRequest: (state) => {
      state.id = 0;
      state.name = "";
      state.errors = [];
    },
  },
});

export const {
  setIdTypeOfMedicalRequest,
  setNameTypeOfMedicalRequest,
  setIsActiveTypeOfMedicalRequest,
  setErrorsTypeOfMedicalRequest,
  setResetTypeOfMedicalRequest,
} = typeOfMedicalRequestSlice.actions;

export default typeOfMedicalRequestSlice.reducer;
