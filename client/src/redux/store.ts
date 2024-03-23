import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { persistReducer } from "redux-persist";

import userReducer from "./features/userSlice";
import userLoginReducer from "./features/userLoginSlice";
import { usersApi } from "./apis/users/usersApi";
import { idTypesApi } from "./apis/id_types/idTypesApi";
import storage from "./storage/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user", "userLogin"],
  blacklist: [],
};

const rootReducer = combineReducers({
  user: userReducer,
  userLogin: userLoginReducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [idTypesApi.reducerPath]: idTypesApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat([
      usersApi.middleware,
      idTypesApi.middleware,
    ]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
