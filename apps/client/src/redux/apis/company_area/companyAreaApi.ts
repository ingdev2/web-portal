import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { CompanyAreaEnum } from "shared/utils/enums/company_area.enum";

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

    getCompanyAreaByName: builder.query<
      CompanyArea,
      { name?: CompanyAreaEnum | null }
    >({
      query: ({ name = null }) => {
        const params: any = {};

        if (name !== null) params.name = name;

        return {
          url: "getByName",
          params,
        };
      },
    }),

    updateCompanyAreaById: builder.mutation<
      any,
      { id: number; updateCompanyArea: Partial<CompanyArea> }
    >({
      query: ({ id, updateCompanyArea }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: updateCompanyArea,
      }),
    }),
  }),
});

export const {
  useCreateCompanyAreaMutation,
  useGetAllCompanyAreaQuery,
  useGetCompanyAreaByIdQuery,
  useGetCompanyAreaByNameQuery,
  useUpdateCompanyAreaByIdMutation,
} = companyAreaApi;
