import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerAdminApi = createApi({
  reducerPath: "registerAdminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),
  endpoints: (builder) => ({
    createAdmin: builder.mutation<Admin, Partial<Admin>>({
      query: (newAdmin) => ({
        url: `registerAdmin`,
        method: "POST",
        body: newAdmin,
      }),
    }),
  }),
});

export const { useCreateAdminMutation } = registerAdminApi;
