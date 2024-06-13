import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const relativesApi = createApi({
  reducerPath: "relativesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/authorized-familiar`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    getAllRelatives: builder.query<Familiar[], null>({
      query: () => "getAllRelatives",
    }),

    getFamiliarById: builder.query<Familiar, string>({
      query: (id) => `getFamiliar/${id}`,
    }),

    getFamiliarByIdNumber: builder.query<Familiar, number>({
      query: (idNumber) => `getFamiliarById/${idNumber}`,
    }),

    updateFamiliar: builder.mutation<
      any,
      { id: string; updateFamiliar: Partial<Familiar> }
    >({
      query: ({ id, updateFamiliar }) => ({
        url: `updateFamiliar/${id}`,
        method: "PATCH",
        params: { id },
        body: updateFamiliar,
      }),
    }),

    banFamiliar: builder.mutation<any, string>({
      query: (id) => ({
        url: `ban/${id}`,
        method: "PATCH",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllRelativesQuery,
  useGetFamiliarByIdQuery,
  useGetFamiliarByIdNumberQuery,
  useUpdateFamiliarMutation,
  useBanFamiliarMutation,
} = relativesApi;
