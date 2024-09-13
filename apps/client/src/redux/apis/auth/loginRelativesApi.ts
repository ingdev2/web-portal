import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginRelativesApi = createApi({
  reducerPath: "loginRelativesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),

  endpoints: (builder) => ({
    loginRelatives: builder.mutation<
      Partial<FamiliarLogin>,
      Partial<FamiliarLogin>
    >({
      query: (newFamiliarLogin) => ({
        url: "loginRelatives",
        method: "POST",
        body: newFamiliarLogin,
      }),
    }),

    verifyFamiliarCode: builder.mutation<
      Partial<FamiliarLogin>,
      { verification_code: number; id_number: number }
    >({
      query: ({ verification_code, id_number }) => ({
        url: `verifiedLoginRelatives/${id_number}`,
        method: "POST",
        params: { id_number },
        body: { verification_code },
      }),
    }),

    resendFamiliarVerificationCode: builder.mutation<
      Partial<UserLogin>,
      { id_type: number; id_number: number }
    >({
      query: ({ id_type, id_number }) => ({
        url: `resendVerificationFamiliarCode`,
        method: "POST",
        body: { id_type, id_number },
      }),
    }),
  }),
});

export const {
  useLoginRelativesMutation,
  useVerifyFamiliarCodeMutation,
  useResendFamiliarVerificationCodeMutation,
} = loginRelativesApi;
