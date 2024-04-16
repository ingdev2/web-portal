import { createSlice } from "@reduxjs/toolkit";

const initialState: Admin = {
  id: "",
  name: "",
  last_name: "",
  user_gender: 0,
  user_id_type: 0,
  id_number: 0,
  corporate_email: "",
  password: "",
  company_area: 0,
  position_level: 0,
  admin_role: 0,
  is_active: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setRegisterAdmin: (state, action) => {
      state.id = action.payload;
      state.name = action.payload;
      state.last_name = action.payload;
      state.user_gender = action.payload;
      state.user_id_type = action.payload;
      state.id_number = action.payload;
      state.corporate_email = action.payload;
      state.password = action.payload;
      state.company_area = action.payload;
      state.position_level = action.payload;
      state.admin_role = action.payload;
      state.is_active = action.payload;
    },
    setGetAdmin: (state, action) => {
      state.id = action.payload;
      state.name = action.payload;
      state.last_name = action.payload;
      state.user_gender = action.payload;
      state.user_id_type = action.payload;
      state.id_number = action.payload;
      state.corporate_email = action.payload;
      state.password = action.payload;
      state.company_area = action.payload;
      state.position_level = action.payload;
      state.admin_role = action.payload;
      state.is_active = action.payload;
    },
    setUpdateAdminData: (state, action) => {
      state.name = action.payload;
      state.last_name = action.payload;
      state.id_number = action.payload;
      state.corporate_email = action.payload;
      state.company_area = action.payload;
      state.position_level = action.payload;
    },
    setGetSuperAdmin: (state, action) => {
      state.id = action.payload;
      state.name = action.payload;
      state.last_name = action.payload;
      state.user_gender = action.payload;
      state.user_id_type = action.payload;
      state.id_number = action.payload;
      state.corporate_email = action.payload;
      state.company_area = action.payload;
      state.admin_role = action.payload;
      state.is_active = action.payload;
    },
  },
});

export const {
  setRegisterAdmin,
  setGetAdmin,
  setUpdateAdminData,
  setGetSuperAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
