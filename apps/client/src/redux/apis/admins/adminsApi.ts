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
      query: (idNumber) => `getAdminByIdNumber/${idNumber}`,
    }),

    getAdminByIdTypeAndNumber: builder.query<Admin, Partial<Admin>>({
      query: ({ admin_id_type: user_id_type, id_number }) =>
        `getAdminByIdTypeAndNumber/${user_id_type}/${id_number}`,
    }),

    updateAdmin: builder.mutation<
      any,
      { id: number; updateAdmin: Partial<Admin> }
    >({
      query: ({ id, updateAdmin }) => ({
        url: `updateAdmin/${id}`,
        method: "PATCH",
        params: { id },
        body: updateAdmin,
      }),
    }),

    updatePassword: builder.mutation<
      any,
      { id: number; passwords: UpdatePassword }
    >({
      query: ({ id, passwords }) => ({
        url: `updatePassword/${id}`,
        method: "PATCH",
        params: { id },
        body: passwords,
      }),
    }),

    forgotPassword: builder.mutation<any, ForgotAdminsPassword>({
      query: (ForgotAdminsPassword) => ({
        url: "forgotAdminsPassword",
        method: "PATCH",
        body: ForgotAdminsPassword,
      }),
    }),

    banAdmin: builder.mutation<any, { id: number }>({
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
  useGetAdminByIdTypeAndNumberQuery,
  useUpdateAdminMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useBanAdminMutation,
} = adminsApi;
