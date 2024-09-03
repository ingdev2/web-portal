import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resetPasswordUsersApi = createApi({
  reducerPath: "resetPasswordUsersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL_PRO}/users`,
  }),

  endpoints: (builder) => ({
    resetPasswordUsers: builder.mutation<any, ResetPassword>({
      query: ({ token, newPassword }) => ({
        url: "resetPassword",
        method: "PATCH",
        params: { token },
        body: { newPassword },
      }),
    }),
  }),
});

export const { useResetPasswordUsersMutation } = resetPasswordUsersApi;
