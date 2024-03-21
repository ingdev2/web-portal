import { createSlice } from "@reduxjs/toolkit";

const initialState: UserLogin = {
  id_type: "",
  id_number: 0,
  password: "",
  idTypeOptions: [],
  errors: [],
};

export const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setIdType: (state, action) => {
      state.id_type = action.payload;
    },
    setIdNumber: (state, action) => {
      state.id_number = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setIdTypeOptions: (state, action) => {
      state.idTypeOptions = action.payload;
    },
    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
});

export const {
  setIdType,
  setIdNumber,
  setPassword,
  setIdTypeOptions,
  setErrors,
} = userLoginSlice.actions;

export default userLoginSlice.reducer;
