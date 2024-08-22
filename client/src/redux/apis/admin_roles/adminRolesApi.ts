import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { AdminRolType } from "../../../../../api/src/utils/enums/admin_roles.enum";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const adminRolesApi = createApi({
  reducerPath: "adminRolesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admin-roles`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createAdminRole: builder.mutation<AdminRole, Partial<AdminRole>>({
      query: (newAdminRole) => ({
        url: `create`,
        method: "POST",
        body: newAdminRole,
      }),
    }),

    getAllAdminRoles: builder.query<AdminRole[], null>({
      query: () => "getAll",
    }),

    getAdminRoleByName: builder.query<
      AdminRole,
      { name?: AdminRolType | null }
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

    updateAdminRole: builder.mutation<any, { id: number; newName: string }>({
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
  useCreateAdminRoleMutation,
  useGetAllAdminRolesQuery,
  useGetAdminRoleByNameQuery,
  useUpdateAdminRoleMutation,
} = adminRolesApi;
