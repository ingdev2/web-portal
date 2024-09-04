import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const authMethodApi = createApi({
  reducerPath: "authMethodApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/authentication-method`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createAuthMethod: builder.mutation<AuthMethod, Partial<AuthMethod>>({
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
        body: { newName },
      }),
    }),
  }),
});

export const {
  useCreateAuthMethodMutation,
  useGetAllAuthMethodsQuery,
  useUpdateAuthMethodByIdMutation,
} = authMethodApi;
