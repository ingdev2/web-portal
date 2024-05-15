import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authMethodApi = createApi({
  reducerPath: "authMethodApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/authentication-method`,
  }),

  endpoints: (builder) => ({
    createAuthMethod: builder.mutation<AuthMethod, AuthMethod>({
      query: (newAuthMethod) => ({
        url: `create`,
        method: "POST",
        body: newAuthMethod,
      }),
    }),

    getAllAuthMethods: builder.query<AuthMethod[], null>({
      query: () => "getAll",
    }),

    updateAuthMethodById: builder.mutation<
      any,
      { id: number; newName: string }
    >({
      query: ({ id, newName }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: newName,
      }),
    }),
  }),
});

export const {
  useCreateAuthMethodMutation,
  useGetAllAuthMethodsQuery,
  useUpdateAuthMethodByIdMutation,
} = authMethodApi;
