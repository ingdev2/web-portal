import { createSlice } from "@reduxjs/toolkit";

interface userState {
  id: string;
  name: string;
  last_name: string;
  company_name?: string;
  birthay_date?: Date;
  id_number: number;
  id_exp_date?: Date;
  email: string;
  cellphone?: number;
  password: string;
  residence_department?: string;
  residence_city?: string;
  residence_address?: string;
  residence_neighborhood?: string;
  is_active: boolean;
  createdAt: Date;
  updateAt: Date;
  deletedAt: Date;
  user_role: number;
  user_gender: number;
  user_id_type: number;
  company_area: number;
}

const initialState: userState = {
  id: "",
  name: "",
  last_name: "",
  company_name: "",
  birthay_date: new Date(),
  id_number: 0,
  id_exp_date: new Date(),
  email: "",
  cellphone: 0,
  password: "",
  residence_department: "",
  residence_city: "",
  residence_address: "",
  residence_neighborhood: "",
  is_active: true,
  createdAt: new Date(),
  updateAt: new Date(),
  deletedAt: new Date(),
  user_role: 0,
  user_gender: 0,
  user_id_type: 0,
  company_area: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUserPerson: (state, action) => {
      const {
        id,
        name,
        last_name,
        birthay_date,
        id_number,
        id_exp_date,
        email,
        cellphone,
        password,
        residence_department,
        residence_city,
        residence_address,
        residence_neighborhood,
        user_gender,
        user_id_type,
      } = action.payload;

      state.id = id;
      state.name = name;
      state.last_name = last_name;
      state.user_gender = user_gender;
      state.user_id_type = user_id_type;
      state.birthay_date = birthay_date;
      state.id_number = id_number;
      state.id_exp_date = id_exp_date;
      state.email = email;
      state.cellphone = cellphone;
      state.password = password;
      state.residence_department = residence_department;
      state.residence_city = residence_city;
      state.residence_address = residence_address;
      state.residence_neighborhood = residence_neighborhood;
    },

    updateUserPersonData: (state, action) => {
      const {
        name,
        last_name,
        birthay_date,
        id_number,
        id_exp_date,
        email,
        cellphone,
        password,
        residence_department,
        residence_city,
        residence_address,
        residence_neighborhood,
      } = action.payload;

      state.name = name;
      state.last_name = last_name;
      state.birthay_date = birthay_date;
      state.id_number = id_number;
      state.id_exp_date = id_exp_date;
      state.email = email;
      state.cellphone = cellphone;
      state.password = password;
      state.residence_department = residence_department;
      state.residence_city = residence_city;
      state.residence_address = residence_address;
      state.residence_neighborhood = residence_neighborhood;
    },

    registerUserEps: (state, action) => {
      const {
        id,
        name,
        last_name,
        id_number,
        company_name,
        company_area,
        email,
        password,
        user_gender,
        user_id_type,
      } = action.payload;

      state.id = id;
      state.name = name;
      state.last_name = last_name;
      state.user_gender = user_gender;
      state.user_id_type = user_id_type;
      state.id_number = id_number;
      state.email = email;
      state.company_name = company_name;
      state.company_area = company_area;
      state.password = password;
    },

    updateUserEpsData: (state, action) => {
      const { name, last_name, id_number, email, company_area, password } =
        action.payload;

      state.name = name;
      state.last_name = last_name;
      state.id_number = id_number;
      state.company_area = company_area;
      state.email = email;
      state.password = password;
    },
  },
});

export const {
  registerUserPerson,
  updateUserPersonData,
  registerUserEps,
  updateUserEpsData,
} = userSlice.actions;

export default userSlice.reducer;
