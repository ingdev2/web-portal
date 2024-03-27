import { createSlice } from "@reduxjs/toolkit";

const initialState: User = {
  id: "",
  name: "",
  last_name: "",
  user_gender: 0,
  user_id_type: 0,
  id_number: 0,
  birthdate: "",
  email: "",
  cellphone: 0,
  whatsapp: 0,
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
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setRegisterUserPatient: (state, action) => {
      state.id = action.payload;
      state.name = action.payload;
      state.last_name = action.payload;
      state.user_gender = action.payload;
      state.birthdate = action.payload;
      state.user_id_type = action.payload;
      state.id_number = action.payload;
      state.email = action.payload;
      state.cellphone = action.payload;
      state.whatsapp = action.payload;
      state.password = action.payload;
      state.residence_department = action.payload;
      state.residence_city = action.payload;
      state.residence_address = action.payload;
      state.residence_neighborhood = action.payload;
      state.user_role = action.payload;
      state.verification_code = action.payload;
    },
    setGetUserPatient: (state, action) => {
      state.id = action.payload;
      state.name = action.payload;
      state.last_name = action.payload;
      state.user_gender = action.payload;
      state.birthdate = action.payload;
      state.user_id_type = action.payload;
      state.id_number = action.payload;
      state.email = action.payload;
      state.cellphone = action.payload;
      state.whatsapp = action.payload;
      state.password = action.payload;
      state.residence_department = action.payload;
      state.residence_city = action.payload;
      state.residence_address = action.payload;
      state.residence_neighborhood = action.payload;
      state.user_role = action.payload;
      state.verification_code = action.payload;
    },
    setUpdateUserPatientData: (state, action) => {
      state.name = action.payload;
      state.last_name = action.payload;
      state.birthdate = action.payload;
      state.email = action.payload;
      state.cellphone = action.payload;
      state.whatsapp = action.payload;
      state.residence_department = action.payload;
      state.residence_city = action.payload;
      state.residence_address = action.payload;
      state.residence_neighborhood = action.payload;
    },
    setRegisterUserEps: (state, action) => {
      state.id = action.payload;
      state.name = action.payload;
      state.last_name = action.payload;
      state.user_gender = action.payload;
      state.user_id_type = action.payload;
      state.id_number = action.payload;
      state.email = action.payload;
      state.cellphone = action.payload;
      state.password = action.payload;
      state.user_role = action.payload;
      state.eps_company = action.payload;
      state.company_area = action.payload;
      state.verification_code = action.payload;
    },
    setGetUserEps: (state, action) => {
      state.id = action.payload;
      state.name = action.payload;
      state.last_name = action.payload;
      state.user_gender = action.payload;
      state.user_id_type = action.payload;
      state.id_number = action.payload;
      state.email = action.payload;
      state.cellphone = action.payload;
      state.password = action.payload;
      state.user_role = action.payload;
      state.eps_company = action.payload;
      state.company_area = action.payload;
      state.verification_code = action.payload;
    },
    setUpdateUserEpsData: (state, action) => {
      state.name = action.payload;
      state.last_name = action.payload;
      state.email = action.payload;
      state.company_area = action.payload;
    },
  },
});

export const {
  setRegisterUserPatient,
  setGetUserPatient,
  setUpdateUserPatientData,
  setRegisterUserEps,
  setGetUserEps,
  setUpdateUserEpsData,
} = userSlice.actions;

export default userSlice.reducer;
