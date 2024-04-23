import { createSlice } from "@reduxjs/toolkit";

const initialState: Familiar = {
  id: "",
  name: "",
  last_name: "",
  user_gender: 0,
  user_id_type: 0,
  id_number: 0,
  email: "",
  cellphone: 0,
  whatsapp: 0,
  authentication_method: 0,
  patient_id: "",
  rel_with_patient: 0,
  user_role: 0,
  verification_code: 0,
  is_active: true,
  accept_terms: false,
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
    setIdTypeUserFamiliar: (state, action) => {
      state.user_id_type = action.payload;
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
  },
});

export const {
  setIdUserFamiliar,
  setNameUserFamiliar,
  setLastNameUserFamiliar,
  setGenderUserFamiliar,
  setIdTypeUserFamiliar,
  setIdNumberUserFamiliar,
  setEmailUserFamiliar,
  setCellphoneUserFamiliar,
  setWhatsappUserFamiliar,
  setAuthMethodUserFamiliar,
  setPatientIdFamiliar,
  setRelWithPatientFamiliar,
  setRoleUserFamiliar,
  setIsActiveUserPatient,
  setCopyFamiliarCitizenshipCard,
  setMedicalReqUserFamiliar,
  setErrorsUserFamiliar,
} = familiarSlice.actions;

export default familiarSlice.reducer;
