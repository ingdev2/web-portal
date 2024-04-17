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
    setIdAdmin: (state, action) => {
      state.id = action.payload;
    },
    setNameAdmin: (state, action) => {
      state.name = action.payload;
    },
    setLastNameAdmin: (state, action) => {
      state.last_name = action.payload;
    },
    setGenderAdmin: (state, action) => {
      state.user_gender = action.payload;
    },
    setIdTypeAdmin: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdNumberAdmin: (state, action) => {
      state.id_number = action.payload;
    },
    setCorporateEmailAdmin: (state, action) => {
      state.corporate_email = action.payload;
    },
    setPasswordAdmin: (state, action) => {
      state.password = action.payload;
    },
    setCompanyAreaAdmin: (state, action) => {
      state.company_area = action.payload;
    },
    setPositionLevelAdmin: (state, action) => {
      state.position_level = action.payload;
    },
    setRoleAdmin: (state, action) => {
      state.admin_role = action.payload;
    },
    setIsActiveAdmin: (state, action) => {
      state.is_active = action.payload;
    },
  },
});

export const {
  setIdAdmin,
  setNameAdmin,
  setLastNameAdmin,
  setGenderAdmin,
  setIdTypeAdmin,
  setIdNumberAdmin,
  setCorporateEmailAdmin,
  setPasswordAdmin,
  setCompanyAreaAdmin,
  setPositionLevelAdmin,
  setRoleAdmin,
  setIsActiveAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
