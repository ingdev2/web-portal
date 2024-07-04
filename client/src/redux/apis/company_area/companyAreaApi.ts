import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const companyAreaApi = createApi({
  reducerPath: "companyAreaApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/company-area`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createCompanyArea: builder.mutation<CompanyArea, Partial<CompanyArea>>({
      query: (newCompanyArea) => ({
        url: `create`,
        method: "POST",
        body: newCompanyArea,
      }),
    }),

    getAllCompanyArea: builder.query<CompanyArea[], null>({
      query: () => "getAll",
    }),

    getCompanyAreaById: builder.query<CompanyArea, number>({
      query: (id) => `getCompanyArea/${id}`,
    }),

    updateCompanyAreaById: builder.mutation<
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
  useCreateCompanyAreaMutation,
  useGetAllCompanyAreaQuery,
  useGetCompanyAreaByIdQuery,
  useUpdateCompanyAreaByIdMutation,
} = companyAreaApi;
