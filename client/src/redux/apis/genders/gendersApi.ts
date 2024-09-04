import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const gendersApi = createApi({
  reducerPath: "gendersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL_PRO}/genders`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
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

    getGenderById: builder.query<Gender, number>({
      query: (id) => `getGender/${id}`,
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
  useGetGenderByIdQuery,
  useUpdateGenderByIdMutation,
} = gendersApi;
