import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const gendersApi = createApi({
  reducerPath: "gendersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/genders`,
  }),

  endpoints: (builder) => ({
    createGender: builder.mutation<Gender, Partial<Gender>>({
      query: (newGender) => ({
        url: `create`,
        method: "POST",
        body: newGender,
      }),
    }),

    getAllGenders: builder.query<Gender[], null>({
      query: () => "getAll",
    }),

    updateGenderById: builder.mutation<any, { id: number; newName: string }>({
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
  useCreateGenderMutation,
  useGetAllGendersQuery,
  useUpdateGenderByIdMutation,
} = gendersApi;
