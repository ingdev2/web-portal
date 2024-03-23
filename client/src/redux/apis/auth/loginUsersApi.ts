import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginUsersApi = createApi({
  reducerPath: "loginUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),
  endpoints: (builder) => ({
    loginUsers: builder.mutation<UserLogin[], null>({
      query: () => "loginUsers",
    }),
  }),
});

export const { useLoginUsersMutation } = loginUsersApi;
