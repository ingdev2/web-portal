import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import storage from "./storage/storage";

import adminReducer from "./features/admin/adminSlice";
import patientReducer from "./features/patient/patientSlice";
import epsReducer from "./features/eps/epsSlice";
import familiarReducer from "./features/familiar/familiarSlice";
import adminLoginReducer from "./features/login/adminLoginSlice";
import patientUserLoginReducer from "./features/login/patientUserLoginSlice";
import epsUserLoginReducer from "./features/login/epsUserLoginSlice";
import familiarLoginReducer from "./features/login/familiarLoginSlice";
import modalReducer from "./features/common/modal/modalSlice";

import { adminsApi } from "./apis/admins/adminsApi";
import { usersApi } from "./apis/users/usersApi";
import { relativesApi } from "./apis/relatives/relativesApi";
import { registerAdminApi } from "./apis/register/registerAdminApi";
import { registerUsersApi } from "./apis/register/registerUsersApi";
import { registerRelativesApi } from "./apis/register/registerRelativesApi";
import { loginAdminApi } from "./apis/auth/loginAdminApi";
import { loginUsersApi } from "./apis/auth/loginUsersApi";
import { loginRelativesApi } from "./apis/auth/loginRelativesApi";
import { idTypesApi } from "./apis/id_types/idTypesApi";
import { gendersApi } from "./apis/genders/gendersApi";
import { authMethodApi } from "./apis/auth_method/authMethodApi";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: [
    "patient",
    "adminLogin",
    "patientUserLogin",
    "epsUserLogin",
    "familiarLogin",
  ],
  blacklist: [],
};

const rootReducer = combineReducers({
  adminLogin: adminLoginReducer,
  patientUserLogin: patientUserLoginReducer,
  epsUserLogin: epsUserLoginReducer,
  familiarLogin: familiarLoginReducer,
  admin: adminReducer,
  patient: patientReducer,
  eps: epsReducer,
  familiar: familiarReducer,
  modal: modalReducer,
  [adminsApi.reducerPath]: adminsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [relativesApi.reducerPath]: relativesApi.reducer,
  [registerAdminApi.reducerPath]: registerAdminApi.reducer,
  [registerUsersApi.reducerPath]: registerUsersApi.reducer,
  [registerRelativesApi.reducerPath]: registerRelativesApi.reducer,
  [loginAdminApi.reducerPath]: loginAdminApi.reducer,
  [loginUsersApi.reducerPath]: loginUsersApi.reducer,
  [loginRelativesApi.reducerPath]: loginRelativesApi.reducer,
  [idTypesApi.reducerPath]: idTypesApi.reducer,
  [gendersApi.reducerPath]: gendersApi.reducer,
  [authMethodApi.reducerPath]: authMethodApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([
      adminsApi.middleware,
      usersApi.middleware,
      relativesApi.middleware,
      registerAdminApi.middleware,
      registerUsersApi.middleware,
      registerRelativesApi.middleware,
      loginAdminApi.middleware,
      loginUsersApi.middleware,
      loginRelativesApi.middleware,
      idTypesApi.middleware,
      gendersApi.middleware,
      authMethodApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
