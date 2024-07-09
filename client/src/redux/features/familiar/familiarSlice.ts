import { createSlice } from "@reduxjs/toolkit";

const initialState: Familiar = {
  id: "",
  name: "",
  last_name: "",
  user_gender: 0,
  user_gender_abbrev: "",
  user_id_type: 0,
  id_type_abbrev: "",
  id_number: 0,
  email: "",
  cellphone: 0,
  whatsapp: 0,
  authentication_method: 0,
  patient_id: "",
  patient_id_number: 0,
  patient_name: "",
  patient_id_type_abbrev: "",
  rel_with_patient: 0,
  user_role: 0,
  verification_code: 0,
  is_active: true,
  accept_terms: false,
  idTypesFamiliar: [],
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  copy_familiar_citizenship_card: [],
  medical_req: [],
  errors: [],
};

export const familiarSlice = createSlice({
  name: "familiar",
  initialState,
  reducers: {
    setIdUserFamiliar: (state, action) => {
      state.id = action.payload;
    },
    setNameUserFamiliar: (state, action) => {
      state.name = action.payload;
    },
    setLastNameUserFamiliar: (state, action) => {
      state.last_name = action.payload;
    },
    setGenderUserFamiliar: (state, action) => {
      state.user_gender = action.payload;
    },
    setGenderAbbrevUserFamiliar: (state, action) => {
      state.user_gender_abbrev = action.payload;
    },
    setIdTypesUserFamiliar: (state, action) => {
      state.idTypesFamiliar = action.payload;
    },
    setIdTypeUserFamiliar: (state, action) => {
      state.user_id_type = action.payload;
    },
    setIdTypeAbbrevUserFamiliar: (state, action) => {
      state.id_type_abbrev = action.payload;
    },
    setIdNumberUserFamiliar: (state, action) => {
      state.id_number = action.payload;
    },
    setEmailUserFamiliar: (state, action) => {
      state.email = action.payload;
    },
    setCellphoneUserFamiliar: (state, action) => {
      state.cellphone = action.payload;
    },
    setWhatsappUserFamiliar: (state, action) => {
      state.whatsapp = action.payload;
    },
    setAuthMethodUserFamiliar: (state, action) => {
      state.authentication_method = action.payload;
    },
    setPatientIdFamiliar: (state, action) => {
      state.patient_id = action.payload;
    },
    setPatientIdNumberFamiliar: (state, action) => {
      state.patient_id_number = action.payload;
    },
    setPatientNameFamiliar: (state, action) => {
      state.patient_name = action.payload;
    },
    setPatientIdTypeAbbrevFamiliar: (state, action) => {
      state.patient_id_type_abbrev = action.payload;
    },
    setRelWithPatientFamiliar: (state, action) => {
      state.rel_with_patient = action.payload;
    },
    setRoleUserFamiliar: (state, action) => {
      state.user_role = action.payload;
    },
    setIsActiveUserPatient: (state, action) => {
      state.is_active = action.payload;
    },
    setCopyFamiliarCitizenshipCard: (state, action) => {
      state.copy_familiar_citizenship_card = action.payload;
    },
    setMedicalReqUserFamiliar: (state, action) => {
      state.medical_req = action.payload;
    },
    setErrorsUserFamiliar: (state, action) => {
      state.errors = action.payload;
    },
    setDefaultValuesUserFamiliar: (state) => {
      state.id = "";
      state.name = "";
      state.last_name = "";
      state.user_gender = 0;
      state.user_gender_abbrev;
      state.user_id_type = 0;
      state.id_type_abbrev;
      state.id_number = 0;
      state.email = "";
      state.cellphone = 0;
      state.whatsapp = 0;
      state.authentication_method = 0;
      state.patient_id = "";
      state.patient_id_number = 0;
      state.patient_name = "";
      state.rel_with_patient = 0;
      state.idTypesFamiliar = [];
      state.copy_familiar_citizenship_card = [];
      state.medical_req = [];
      state.errors = [];
    },
  },
});

export const {
  setIdUserFamiliar,
  setNameUserFamiliar,
  setLastNameUserFamiliar,
  setGenderUserFamiliar,
  setGenderAbbrevUserFamiliar,
  setIdTypeUserFamiliar,
  setIdTypeAbbrevUserFamiliar,
  setIdTypesUserFamiliar,
  setIdNumberUserFamiliar,
  setEmailUserFamiliar,
  setCellphoneUserFamiliar,
  setWhatsappUserFamiliar,
  setAuthMethodUserFamiliar,
  setPatientIdFamiliar,
  setPatientIdNumberFamiliar,
  setPatientNameFamiliar,
  setPatientIdTypeAbbrevFamiliar,
  setRelWithPatientFamiliar,
  setRoleUserFamiliar,
  setIsActiveUserPatient,
  setCopyFamiliarCitizenshipCard,
  setMedicalReqUserFamiliar,
  setErrorsUserFamiliar,
  setDefaultValuesUserFamiliar,
} = familiarSlice.actions;

export default familiarSlice.reducer;
