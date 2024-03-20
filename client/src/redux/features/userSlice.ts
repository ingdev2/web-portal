import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  id: "",
  name: "",
  last_name: "",
  user_gender: 0,
  user_id_type: 0,
  id_number: 0,
  birthdate: "",
  email: "",
  cellphone: 0,
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
    registerUserPatient: (state) => {
      state.id;
      state.name;
      state.last_name;
      state.user_gender;
      state.birthdate;
      state.user_id_type;
      state.id_number;
      state.email;
      state.cellphone;
      state.password;
      state.residence_department;
      state.residence_city;
      state.residence_address;
      state.residence_neighborhood;
      state.user_role;
      state.verification_code;
    },
    updateUserPatientData: (state) => {
      state.name;
      state.last_name;
      state.birthdate;
      state.email;
      state.cellphone;
      state.residence_department;
      state.residence_city;
      state.residence_address;
      state.residence_neighborhood;
    },
    registerUserEps: (state) => {
      state.id;
      state.name;
      state.last_name;
      state.user_gender;
      state.user_id_type;
      state.id_number;
      state.email;
      state.cellphone;
      state.password;
      state.user_role;
      state.eps_company;
      state.company_area;
      state.verification_code;
    },
    updateUserEpsData: (state) => {
      state.name;
      state.last_name;
      state.email;
      state.company_area;
    },
  },
});

export const {
  registerUserPatient,
  updateUserPatientData,
  registerUserEps,
  updateUserEpsData,
} = userSlice.actions;

export default userSlice.reducer;
