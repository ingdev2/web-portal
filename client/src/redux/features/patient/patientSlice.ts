import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  last_name: "",
  user_gender: 0,
  user_id_type: 0,
  id_type_abbrev: "",
  id_number: 0,
  birthdate: "",
  affiliation_eps: "",
  email: "",
  cellphone: 0,
  whatsapp: 0,
  auth_method: 0,
  password: "",
  residence_department: "",
  residence_city: "",
  residence_address: "",
  residence_neighborhood: "",
  is_active: true,
  accept_terms: false,
  eps_company: 0,
  company_area: 0,
  user_role: 0,
  verification_code: 0,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  medical_req: [],
  errors: [],
};

export const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setIdUserPatient: (state, action) => {
      state.id = action.payload;
    },
    setNameUserPatient: (state, action) => {
      state.name = action.payload;
    },
    setGenderUserPatient: (state, action) => {
      state.user_gender = action.payload;
    },
    setIdTypeUserPatient: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdTypeAbbrevUserPatient: (state, action) => {
      state.id_type_abbrev = action.payload;
    },
    setIdNumberUserPatient: (state, action) => {
      state.id_number = action.payload;
    },
    setBirthdateUserPatient: (state, action) => {
      state.birthdate = action.payload;
    },
    setAffiliationEpsUserPatient: (state, action) => {
      state.affiliation_eps = action.payload;
    },
    setEmailUserPatient: (state, action) => {
      state.email = action.payload;
    },
    setCellphoneUserPatient: (state, action) => {
      state.cellphone = action.payload;
    },
    setWhatsappUserPatient: (state, action) => {
      state.whatsapp = action.payload;
    },
    setAuthMethodUserPatient: (state, action) => {
      state.auth_method = action.payload;
    },
    setPasswordUserPatient: (state, action) => {
      state.password = action.payload;
    },
    setResidenceAddressUserPatient: (state, action) => {
      state.residence_address = action.payload;
    },
    setIsActiveUserPatient: (state, action) => {
      state.is_active = action.payload;
    },
    setRoleUserPatient: (state, action) => {
      state.user_role = action.payload;
    },
    setMedicalReqUserPatient: (state, action) => {
      state.medical_req = action.payload;
    },
    setErrorsUserPatient: (state, action) => {
      state.medical_req = action.payload;
    },
  },
});

export const {
  setIdUserPatient,
  setNameUserPatient,
  setGenderUserPatient,
  setIdTypeUserPatient,
  setIdTypeAbbrevUserPatient,
  setIdNumberUserPatient,
  setBirthdateUserPatient,
  setAffiliationEpsUserPatient,
  setEmailUserPatient,
  setCellphoneUserPatient,
  setWhatsappUserPatient,
  setAuthMethodUserPatient,
  setPasswordUserPatient,
  setResidenceAddressUserPatient,
  setIsActiveUserPatient,
  setRoleUserPatient,
  setMedicalReqUserPatient,
  setErrorsUserPatient,
} = patientSlice.actions;

export default patientSlice.reducer;
