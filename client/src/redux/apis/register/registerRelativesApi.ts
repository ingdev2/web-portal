import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const registerRelativesApi = createApi({
  reducerPath: "registerRelativesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL_PRO}/auth`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createFamiliar: builder.mutation<
      Familiar,
      { patientId: string; newFamiliar: Partial<Familiar> }
    >({
      query: ({ patientId, newFamiliar }) => ({
        url: `${patientId}/registerFamiliar`,
        method: "POST",
        body: newFamiliar,
      }),
    }),
  }),
});

export const { useCreateFamiliarMutation } = registerRelativesApi;
