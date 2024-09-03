import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  last_name: "",
  user_gender: 0,
  user_gender_abbrev: "",
  user_id_type: 0,
  id_type_abbrev: "",
  id_number: 0,
  birthdate: "",
  affiliation_eps: "",
  email: "",
  cellphone: 0,
  whatsapp: 0,
  authentication_method: 0,
  password: "",
  residence_department: "",
  residence_city: "",
  residence_address: "",
  residence_neighborhood: "",
  is_active: true,
  accept_terms: false,
  eps_company: 0,
  eps_company_abbrev: "",
  company_area: 0,
  user_role: 0,
  verification_code: 0,
  familiar: [],
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  medical_req: [],
  errors: [],
};

export const epsSlice = createSlice({
  name: "eps",
  initialState,
  reducers: {
    setIdUserEps: (state, action) => {
      state.id = action.payload;
    },
    setNameUserEps: (state, action) => {
      state.name = action.payload;
    },
    setLastNameUserEps: (state, action) => {
      state.last_name = action.payload;
    },
    setGenderUserEps: (state, action) => {
      state.user_gender = action.payload;
    },
    setGenderAbbrevUserEps: (state, action) => {
      state.user_gender_abbrev = action.payload;
    },
    setIdTypeUserEps: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdTypeAbbrevUserEps: (state, action) => {
      state.id_type_abbrev = action.payload;
    },
    setIdNumberUserEps: (state, action) => {
      state.id_number = action.payload;
    },
    setEmailUserEps: (state, action) => {
      state.email = action.payload;
    },
    setCellphoneUserEps: (state, action) => {
      state.cellphone = action.payload;
    },
    setAuthMethodUserEps: (state, action) => {
      state.authentication_method = action.payload;
    },
    setPasswordUserEps: (state, action) => {
      state.password = action.payload;
    },
    setIsActiveUserEps: (state, action) => {
      state.is_active = action.payload;
    },
    setRoleUserEps: (state, action) => {
      state.user_role = action.payload;
    },
    setCompanyAreaUserEps: (state, action) => {
      state.company_area = action.payload;
    },
    setEpsCompanyUserEps: (state, action) => {
      state.eps_company = action.payload;
    },
    setEpsCompanyAbbrevUserEps: (state, action) => {
      state.eps_company_abbrev = action.payload;
    },
    setMedicalReqUserEps: (state, action) => {
      state.medical_req = action.payload;
    },
    setErrorsUserEps: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultValuesUserEps: (state) => {
      state.id = "";
      state.name = "";
      state.last_name = "";
      state.user_gender = 0;
      state.user_gender_abbrev = "";
      state.user_id_type = 0;
      state.id_type_abbrev = "";
      state.id_number = 0;
      state.email = "";
      state.cellphone = 0;
      state.authentication_method = 0;
      state.password = "";
      state.residence_address = "";
      state.company_area = 0;
      state.eps_company = 0;
      state.eps_company_abbrev = "";
      state.errors = [];
    },
  },
});

export const {
  setIdUserEps,
  setNameUserEps,
  setLastNameUserEps,
  setGenderUserEps,
  setGenderAbbrevUserEps,
  setIdTypeUserEps,
  setIdTypeAbbrevUserEps,
  setIdNumberUserEps,
  setEmailUserEps,
  setCellphoneUserEps,
  setAuthMethodUserEps,
  setPasswordUserEps,
  setIsActiveUserEps,
  setRoleUserEps,
  setCompanyAreaUserEps,
  setEpsCompanyUserEps,
  setEpsCompanyAbbrevUserEps,
  setMedicalReqUserEps,
  setErrorsUserEps,
  setDefaultValuesUserEps,
} = epsSlice.actions;

export default epsSlice.reducer;
