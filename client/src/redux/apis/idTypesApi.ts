import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const idTypesApi = createApi({
  reducerPath: "idTypesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/id-types`,
  }),
  endpoints: (builder) => ({
    createIdType: builder.mutation<IdType, null>({
      query: () => `create`,
    }),
    getAllIdTypes: builder.query<IdType[], null>({
      query: () => "getAll",
    }),
    updateIdTypeById: builder.mutation<IdType, { id: string }>({
      query: ({ id }) => `update/${id}`,
    }),
  }),
});

export const {
  useCreateIdTypeMutation,
  useGetAllIdTypesQuery,
  useUpdateIdTypeByIdMutation,
} = idTypesApi;
