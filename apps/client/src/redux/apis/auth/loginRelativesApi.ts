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
      {
        id_number: number;
        patient_id_number: number;
        familiar_email: string;
        verification_code: number;
      }
    >({
      query: ({
        id_number,
        patient_id_number,
        familiar_email,
        verification_code,
      }) => ({
        url: `verifiedLoginRelatives/${id_number}`,
        method: "POST",
        params: { id_number },
        body: { patient_id_number, familiar_email, verification_code },
      }),
    }),

    resendFamiliarVerificationCode: builder.mutation<
      Partial<UserLogin>,
      FamiliarResendCode
    >({
      query: (familiarResendCode) => ({
        url: `resendVerificationFamiliarCode`,
        method: "POST",
        body: familiarResendCode,
      }),
    }),
  }),
});

export const {
  useLoginRelativesMutation,
  useVerifyFamiliarCodeMutation,
  useResendFamiliarVerificationCodeMutation,
} = loginRelativesApi;
