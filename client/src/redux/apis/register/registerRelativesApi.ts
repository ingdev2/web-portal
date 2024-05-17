import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerRelativesApi = createApi({
  reducerPath: "registerRelativesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),

  endpoints: (builder) => ({
    createFamiliar: builder.mutation<
      Familiar,
      { idPatient: string; newFamiliar: Partial<Familiar> }
    >({
      query: ({ idPatient, newFamiliar }) => ({
        url: `${idPatient}/registerFamiliar`,
        method: "POST",
        body: newFamiliar,
      }),
    }),
  }),
});

export const { useCreateFamiliarMutation } = registerRelativesApi;
