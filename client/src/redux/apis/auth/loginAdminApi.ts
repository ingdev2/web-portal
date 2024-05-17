import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAdminApi = createApi({
  reducerPath: "loginAdminApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),

  endpoints: (builder) => ({
    loginAdmins: builder.mutation<Partial<UserLogin>, Partial<UserLogin>>({
      query: (newAdminLogin) => ({
        url: "loginAdmins",
        method: "POST",
        body: newAdminLogin,
      }),
    }),
  }),
});

export const { useLoginAdminsMutation } = loginAdminApi;
