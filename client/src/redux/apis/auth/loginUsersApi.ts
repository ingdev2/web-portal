import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginUsersApi = createApi({
  reducerPath: "loginUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),
  endpoints: (builder) => ({
    loginUsers: builder.mutation<Partial<UserLogin>, Partial<UserLogin>>({
      query: (newUserLogin) => ({
        url: "loginUsers",
        method: "POST",
        body: newUserLogin,
      }),
    }),
    verifyUserCode: builder.mutation<
      Partial<UserLogin>,
      { verification_code: number; id_number: number }
    >({
      query: ({ verification_code, id_number }) => ({
        url: `verifiedLoginUsers/${id_number}`,
        method: "POST",
        body: { verification_code },
        params: { id_number },
      }),
    }),
  }),
});

export const { useLoginUsersMutation } = loginUsersApi;
