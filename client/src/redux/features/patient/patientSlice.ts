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
  familiar: [],
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
    setLastNameUserPatient: (state, action) => {
      state.last_name = action.payload;
    },
    setGenderUserPatient: (state, action) => {
      state.user_gender = action.payload;
    },
    setGenderAbbrevUserPatient: (state, action) => {
      state.user_gender_abbrev = action.payload;
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
      const newBirthdate = action.payload;

      state.birthdate = newBirthdate.substring(0, 11);
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
      state.authentication_method = action.payload;
    },
    setPasswordUserPatient: (state, action) => {
      state.password = action.payload;
    },
    setResidenceAddressUserPatient: (state, action) => {
      state.residence_address = action.payload;
    },
    setRelativesUserPatient: (state, action) => {
      state.familiar = action.payload;
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
      state.errors = action.payload;
    },
    setDefaultValuesUserPatient: (state) => {
      state.id = "";
      state.name = "";
      state.last_name = "";
      state.user_gender = 0;
      state.user_gender_abbrev = "";
      state.user_id_type = 0;
      state.id_type_abbrev = "";
      state.id_number = 0;
      state.birthdate = "";
      state.affiliation_eps = "";
      state.email = "";
      state.cellphone = 0;
      state.whatsapp = 0;
      state.familiar = [];
      state.authentication_method = 0;
      state.password = "";
      state.residence_address = "";
      state.errors = [];
    },
  },
});

export const {
  setIdUserPatient,
  setNameUserPatient,
  setLastNameUserPatient,
  setGenderUserPatient,
  setGenderAbbrevUserPatient,
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
  setRelativesUserPatient,
  setIsActiveUserPatient,
  setRoleUserPatient,
  setMedicalReqUserPatient,
  setErrorsUserPatient,
  setDefaultValuesUserPatient,
} = patientSlice.actions;

export default patientSlice.reducer;
