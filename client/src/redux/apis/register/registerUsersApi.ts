import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerUsersApi = createApi({
  reducerPath: "registerUsersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),
  endpoints: (builder) => ({
    validateThatThePatientExist: builder.mutation<
      [],
      { idType: string; idNumber: Number }
    >({
      query: ({ idType, idNumber }) => ({
        url: `validatePatient`,
        method: "POST",
        body: { idType, idNumber },
      }),
    }),
    validatePatientRegister: builder.mutation<[], { id_number: Number }>({
      query: ({ id_number }) => ({
        url: `validatePatientRegister`,
        method: "POST",
        body: { id_number },
      }),
    }),
    createUserPatient: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: `registerUserPatient`,
        method: "POST",
        body: newUser,
      }),
    }),
    createUserEps: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: `registerUserEps`,
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

export const {
  useValidateThatThePatientExistMutation,
  useValidatePatientRegisterMutation,
  useCreateUserPatientMutation,
  useCreateUserEpsMutation,
} = registerUsersApi;
