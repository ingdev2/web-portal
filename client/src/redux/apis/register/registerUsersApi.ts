import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const registerUsersApi = createApi({
  reducerPath: "registerUsersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    validateThatThePatientExist: builder.mutation<
      [],
      { idType: string; idNumber: number }
    >({
      query: ({ idType, idNumber }) => ({
        url: `validatePatient`,
        method: "POST",
        body: { idType, idNumber },
      }),
    }),

    validatePatientRegister: builder.mutation<
      [],
      { id_type: number; id_number: number }
    >({
      query: ({ id_type, id_number }) => ({
        url: `validatePatientRegister`,
        method: "POST",
        body: { id_type, id_number },
      }),
    }),

    createUserPatient: builder.mutation<User, Partial<User>>({
      query: (newPatient) => ({
        url: `registerUserPatient`,
        method: "POST",
        body: newPatient,
      }),
    }),

    createUserEps: builder.mutation<User, Partial<User>>({
      query: (newEps) => ({
        url: `registerUserEps`,
        method: "POST",
        body: newEps,
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
