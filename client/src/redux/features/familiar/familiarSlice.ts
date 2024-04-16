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
  patient_id: "",
  rel_with_patient: 0,
  user_role: 0,
  is_active: true,
  accept_terms: false,
  createdAt: "",
  updateAt: "",
  deletedAt: "",
  verification_code: 0,
  copy_familiar_citizenship_card: [],
  medical_req: [],
};

export const familiarSlice = createSlice({
  name: "familiar",
  initialState,
  reducers: {
    setRegisterFamiliarPatient: (state, action) => {
      state.id = action.payload;
      state.name = action.payload;
      state.last_name = action.payload;
      state.user_gender = action.payload;
      state.user_id_type = action.payload;
      state.id_number = action.payload;
      state.email = action.payload;
      state.cellphone = action.payload;
      state.whatsapp = action.payload;
      state.patient_id = action.payload;
      state.rel_with_patient = action.payload;
      state.user_role = action.payload;
      state.is_active = action.payload;
      state.verification_code = action.payload;
      state.copy_familiar_citizenship_card = action.payload;
      state.medical_req = action.payload;
    },
    setGetFamiliarPatient: (state, action) => {
      state.id = action.payload;
      state.name = action.payload;
      state.last_name = action.payload;
      state.user_gender = action.payload;
      state.user_id_type = action.payload;
      state.id_number = action.payload;
      state.email = action.payload;
      state.cellphone = action.payload;
      state.whatsapp = action.payload;
      state.patient_id = action.payload;
      state.rel_with_patient = action.payload;
      state.user_role = action.payload;
      state.is_active = action.payload;
      state.verification_code = action.payload;
      state.copy_familiar_citizenship_card = action.payload;
      state.medical_req = action.payload;
    },
    setUpdateFamiliarPatientData: (state, action) => {
      state.name = action.payload;
      state.last_name = action.payload;
      state.email = action.payload;
      state.cellphone = action.payload;
      state.whatsapp = action.payload;
    },
  },
});

export const {
  setRegisterFamiliarPatient,
  setGetFamiliarPatient,
  setUpdateFamiliarPatientData,
} = familiarSlice.actions;

export default familiarSlice.reducer;
