import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginAdminApi = createApi({
  reducerPath: "loginAdminApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),

  endpoints: (builder) => ({
    loginAdmins: builder.mutation<Partial<AdminLogin>, Partial<AdminLogin>>({
      query: (newAdminLogin) => ({
        url: "loginAdmins",
        method: "POST",
        body: newAdminLogin,
      }),
    }),

    verifyAdminCode: builder.mutation<
      Partial<AdminLogin>,
      { verification_code: number; id_number: number }
    >({
      query: ({ verification_code, id_number }) => ({
        url: `verifiedLoginAdmins/${id_number}`,
        method: "POST",
        params: { id_number },
        body: { verification_code },
      }),
    }),

    resendAdminVerificationCode: builder.mutation<
      Partial<AdminLogin>,
      { id_type: number; id_number: number }
    >({
      query: ({ id_type, id_number }) => ({
        url: `resendVerificationAdminCode`,
        method: "POST",
        body: { id_type, id_number },
      }),
    }),
  }),
});

export const {
  useLoginAdminsMutation,
  useVerifyAdminCodeMutation,
  useResendAdminVerificationCodeMutation,
} = loginAdminApi;
