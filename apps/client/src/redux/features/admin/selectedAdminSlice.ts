import { createSlice } from "@reduxjs/toolkit";

const initialState: Admin = {
  id: 0,
  name: "",
  last_name: "",
  admin_gender: 0,
  admin_gender_abbrev: "",
  admin_id_type: 0,
  admin_id_type_abbrev: "",
  id_number: 0,
  corporate_email: "",
  password: "",
  company_area: 0,
  company_area_abbrev: "",
  position_level: 0,
  position_level_abbrev: "",
  authentication_method: 0,
  admin_role: 0,
  is_active: true,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  errors: [],
};

export const selectedAdminSlice = createSlice({
  name: "selectedAdmin",
  initialState,
  reducers: {
    setIdSelectedAdmin: (state, action) => {
      state.id = action.payload;
    },
    setNameSelectedAdmin: (state, action) => {
      state.name = action.payload;
    },
    setLastNameSelectedAdmin: (state, action) => {
      state.last_name = action.payload;
    },
    setGenderSelectedAdmin: (state, action) => {
      state.admin_gender = action.payload;
    },
    setGenderAbbrevSelectedAdmin: (state, action) => {
      state.admin_gender_abbrev = action.payload;
    },
    setIdTypeSelectedAdmin: (state, action) => {
      state.admin_id_type = action.payload;
    },
    setIdTypeAbbrevSelectedAdmin: (state, action) => {
      state.admin_id_type_abbrev = action.payload;
    },
    setIdNumberSelectedAdmin: (state, action) => {
      state.id_number = action.payload;
    },
    setCorporateEmailSelectedAdmin: (state, action) => {
      state.corporate_email = action.payload;
    },
    setPasswordSelectedAdmin: (state, action) => {
      state.password = action.payload;
    },
    setCompanyAreaSelectedAdmin: (state, action) => {
      state.company_area = action.payload;
    },
    setCompanyAreaAbbrevSelectedAdmin: (state, action) => {
      state.company_area_abbrev = action.payload;
    },
    setPositionLevelSelectedAdmin: (state, action) => {
      state.position_level = action.payload;
    },
    setPositionLevelAbbrevSelectedAdmin: (state, action) => {
      state.position_level_abbrev = action.payload;
    },
    setAuthMethodSelectedAdmin: (state, action) => {
      state.authentication_method = action.payload;
    },
    setRoleSelectedAdmin: (state, action) => {
      state.admin_role = action.payload;
    },
    setIsActiveSelectedAdmin: (state, action) => {
      state.is_active = action.payload;
    },
    setErrorsSelectedAdmin: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultValuesSelectedAdmin: (state) => {
      state.id = 0;
      state.name = "";
      state.last_name = "";
      state.admin_gender = 0;
      state.admin_gender_abbrev = "";
      state.admin_id_type = 0;
      state.admin_id_type_abbrev = "";
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
  setIdSelectedAdmin,
  setNameSelectedAdmin,
  setLastNameSelectedAdmin,
  setGenderSelectedAdmin,
  setGenderAbbrevSelectedAdmin,
  setIdTypeSelectedAdmin,
  setIdTypeAbbrevSelectedAdmin,
  setIdNumberSelectedAdmin,
  setCorporateEmailSelectedAdmin,
  setPasswordSelectedAdmin,
  setCompanyAreaSelectedAdmin,
  setCompanyAreaAbbrevSelectedAdmin,
  setPositionLevelSelectedAdmin,
  setPositionLevelAbbrevSelectedAdmin,
  setAuthMethodSelectedAdmin,
  setRoleSelectedAdmin,
  setIsActiveSelectedAdmin,
  setErrorsSelectedAdmin,
  setDefaultValuesSelectedAdmin,
} = selectedAdminSlice.actions;

export default selectedAdminSlice.reducer;
