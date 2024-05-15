import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const adminsApi = createApi({
  reducerPath: "adminsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/admins`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    getAllAdmins: builder.query<Admin[], null>({
      query: () => "getAllAdmins",
    }),
    getAdminById: builder.query<Admin, string>({
      query: (id) => `getAdmin/${id}`,
    }),
    getAdminByIdNumber: builder.query<Admin, number>({
      query: (idNumber) => `getAdminById/${idNumber}`,
    }),
    updateAdmin: builder.mutation<
      any,
      { id: string; updateAdmin: Partial<Admin> }
    >({
      query: ({ id, updateAdmin }) => ({
        url: `updateAdmin/${id}`,
        method: "PATCH",
        params: { id },
        body: updateAdmin,
      }),
    }),
    banAdmin: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `banAdmin/${id}`,
        method: "PATCH",
        params: { id },
      }),
    }),
  }),
});

export const {
  useGetAllAdminsQuery,
  useGetAdminByIdQuery,
  useGetAdminByIdNumberQuery,
  useUpdateAdminMutation,
  useBanAdminMutation,
} = adminsApi;
