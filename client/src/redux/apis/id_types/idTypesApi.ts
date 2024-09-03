import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const idTypesApi = createApi({
  reducerPath: "idTypesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL_PRO}/id-types`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createIdType: builder.mutation<IdType, Partial<IdType>>({
      query: (newIdtype) => ({
        url: `create`,
        method: "POST",
        body: newIdtype,
      }),
    }),

    getAllIdTypes: builder.query<IdType[], null>({
      query: () => "getAll",
    }),

    getIdTypeById: builder.query<IdType, number>({
      query: (id) => `getIdType/${id}`,
    }),

    updateIdTypeById: builder.mutation<any, { id: number; newName: string }>({
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
  useCreateIdTypeMutation,
  useGetAllIdTypesQuery,
  useGetIdTypeByIdQuery,
  useUpdateIdTypeByIdMutation,
} = idTypesApi;
