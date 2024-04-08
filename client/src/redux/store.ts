import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";
import storage from "./storage/storage";

import userLoginReducer from "./features/login/userLoginSlice";
import userReducer from "./features/users/userSlice";
import modalReducer from "./features/modal/modalSlice";

import { usersApi } from "./apis/users/usersApi";
import { idTypesApi } from "./apis/id_types/idTypesApi";
import { loginUsersApi } from "./apis/auth/loginUsersApi";

const persistConfig = {
  key: "Auth",
  version: 1,
  storage,
  whitelist: ["user", "userLogin"],
  blacklist: [],
};

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  user: userReducer,
  modal: modalReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [idTypesApi.reducerPath]: idTypesApi.reducer,
  [loginUsersApi.reducerPath]: loginUsersApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      usersApi.middleware,
      idTypesApi.middleware,
      loginUsersApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
