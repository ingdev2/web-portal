import { createSlice } from "@reduxjs/toolkit";

const initialState: Admin = {
  id: "",
  name: "",
  last_name: "",
  user_gender: 0,
  user_gender_abbrev: "",
  user_id_type: 0,
  id_type_abbrev: "",
  id_number: 0,
  corporate_email: "",
  password: "",
  company_area: 0,
  company_area_abbrev: "",
  position_level: 0,
  position_level_abbrev: "",
  admin_role: 0,
  is_active: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  errors: [],
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
    setGenderAbbrevAdmin: (state, action) => {
      state.user_gender_abbrev = action.payload;
    },
    setIdTypeAdmin: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdTypeAbbrevAdmin: (state, action) => {
      state.id_type_abbrev = action.payload;
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
    setCompanyAreaAbbrevAdmin: (state, action) => {
      state.company_area_abbrev = action.payload;
    },
    setPositionLevelAdmin: (state, action) => {
      state.position_level = action.payload;
    },
    setPositionLevelAbbrevAdmin: (state, action) => {
      state.position_level_abbrev = action.payload;
    },
    setRoleAdmin: (state, action) => {
      state.admin_role = action.payload;
    },
    setIsActiveAdmin: (state, action) => {
      state.is_active = action.payload;
    },
    setErrorsAdmin: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultValuesAdmin: (state) => {
      state.id = "";
      state.name = "";
      state.last_name = "";
      state.user_gender = 0;
      state.user_gender_abbrev = "";
      state.user_id_type = 0;
      state.id_type_abbrev = "";
      state.id_number = 0;
      state.corporate_email = "";
      state.password = "";
      state.company_area = 0;
      state.company_area_abbrev = "";
      state.position_level = 0;
      state.position_level_abbrev = "";
      state.errors = [];
    },
  },
});

export const {
  setIdAdmin,
  setNameAdmin,
  setLastNameAdmin,
  setGenderAdmin,
  setGenderAbbrevAdmin,
  setIdTypeAdmin,
  setIdTypeAbbrevAdmin,
  setIdNumberAdmin,
  setCorporateEmailAdmin,
  setPasswordAdmin,
  setCompanyAreaAdmin,
  setCompanyAreaAbbrevAdmin,
  setPositionLevelAdmin,
  setPositionLevelAbbrevAdmin,
  setRoleAdmin,
  setIsActiveAdmin,
  setErrorsAdmin,
  setDefaultValuesAdmin,
} = adminSlice.actions;

export default adminSlice.reducer;
