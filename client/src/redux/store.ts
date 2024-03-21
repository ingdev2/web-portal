import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import userReducer from "./features/userSlice";
import userLoginReducer from "./features/userLoginSlice";
import { usersApi } from "./api/usersApi";
import { idTypesApi } from "./api/idTypesApi";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userLogin: userLoginReducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [idTypesApi.reducerPath]: idTypesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([usersApi.middleware, idTypesApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
