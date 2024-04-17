import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const registerRelativesApi = createApi({
  reducerPath: "registerRelativesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth`,
  }),
  endpoints: (builder) => ({
    createFamiliar: builder.mutation<
      Familiar,
      { newFamiliar: Partial<Familiar>; idPatient: string }
    >({
      query: ({ newFamiliar, idPatient }) => ({
        url: `${idPatient}/registerFamiliar`,
        method: "POST",
        body: newFamiliar,
      }),
    }),
  }),
});

export const { useCreateFamiliarMutation } = registerRelativesApi;
