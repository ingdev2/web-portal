import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const idTypesApi = createApi({
  reducerPath: "idTypesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/id-types`,
  }),
  endpoints: (builder) => ({
    createIdType: builder.mutation<IdType, IdType>({
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
