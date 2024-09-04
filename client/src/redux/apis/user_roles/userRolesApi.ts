import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const userRolesApi = createApi({
  reducerPath: "userRolesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL_PRO}/user-roles`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createUserRole: builder.mutation<UserRole, Partial<UserRole>>({
      query: (newUserRole) => ({
        url: `create`,
        method: "POST",
        body: newUserRole,
      }),
    }),

    getAllUserRoles: builder.query<UserRole[], null>({
      query: () => "getAll",
    }),

    updateUserRole: builder.mutation<any, { id: number; newName: string }>({
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
  useCreateUserRoleMutation,
  useGetAllUserRolesQuery,
  useUpdateUserRoleMutation,
} = userRolesApi;
