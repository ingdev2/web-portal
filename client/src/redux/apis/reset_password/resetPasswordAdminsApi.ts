import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resetPasswordAdminsApi = createApi({
  reducerPath: "resetPasswordAdminsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL_PRO}/admins`,
  }),

  endpoints: (builder) => ({
    resetPasswordAdmins: builder.mutation<any, ResetPassword>({
      query: ({ token, newPassword }) => ({
        url: "resetPassword",
        method: "PATCH",
        params: { token },
        body: { newPassword },
      }),
    }),
  }),
});

export const { useResetPasswordAdminsMutation } = resetPasswordAdminsApi;
