import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const epsCompanyApi = createApi({
  reducerPath: "epsCompanyApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/eps-company`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createEpsCompany: builder.mutation<EpsCompany, Partial<EpsCompany>>({
      query: (newEpsCompany) => ({
        url: `create`,
        method: "POST",
        body: newEpsCompany,
      }),
    }),

    getAllEpsCompany: builder.query<EpsCompany[], null>({
      query: () => "getAll",
    }),

    getEpsCompanyById: builder.query<EpsCompany, number>({
      query: (id) => `getCompany/${id}`,
    }),

    updateEpsCompanyById: builder.mutation<
      any,
      { id: number; newName: string }
    >({
      query: ({ id, newName }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: { newName },
      }),
    }),
  }),
});

export const {
  useCreateEpsCompanyMutation,
  useGetAllEpsCompanyQuery,
  useGetEpsCompanyByIdQuery,
  useUpdateEpsCompanyByIdMutation,
} = epsCompanyApi;