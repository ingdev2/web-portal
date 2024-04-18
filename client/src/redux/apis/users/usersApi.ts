import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { useSession } from "next-auth/react";

// const { data: session, status } = useSession();

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
    // prepareHeaders(headers, { getState }) {
    //   if (status === "authenticated") {
    //     headers.set("authorization", `Bearer ${session?.user?.token}`);
    //   }
    //   return headers;
    // },
  }),

  endpoints: (builder) => ({
    transformIdTypeName: builder.mutation<null, { idTypeAbbrev: string }>({
      query: ({ idTypeAbbrev }) => ({
        url: `transformIdTypeName`,
        method: "POST",
        body: { idTypeAbbrev },
      }),
    }),
    transformIdTypeNumber: builder.mutation<null, { idTypeAbbrev: string }>({
      query: ({ idTypeAbbrev }) => ({
        url: `transformIdTypeNumber`,
        method: "POST",
        body: { idTypeAbbrev },
      }),
    }),
    getAllUsers: builder.query<User[], null>({
      query: () => "getAllUsers",
    }),
    getAllPatients: builder.query<User[], null>({
      query: () => "getAllPatient",
    }),
    getAllEps: builder.query<User[], null>({
      query: () => "getAllEps",
    }),
    getUserById: builder.query<User, string>({
      query: (id) => `getUser/${id}`,
    }),
    getUserByIdNumberPatient: builder.query<User, number>({
      query: (idNumber) => `getPatientUserById/${idNumber}`,
    }),
    getUserByIdNumberEps: builder.query<User, number>({
      query: (idNumber) => `getEpsUserById/${idNumber}`,
    }),
    updateUser: builder.mutation<
      any,
      { id: string; updateUser: Partial<User> }
    >({
      query: ({ id, updateUser }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: { updateUser },
      }),
    }),
    banUser: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `ban/${id}`,
        method: "PATCH",
        params: { id },
      }),
    }),
  }),
});

export const {
  useTransformIdTypeNameMutation,
  useTransformIdTypeNumberMutation,
  useGetAllUsersQuery,
  useGetAllPatientsQuery,
  useGetAllEpsQuery,
  useGetUserByIdQuery,
  useGetUserByIdNumberPatientQuery,
  useGetUserByIdNumberEpsQuery,
  useUpdateUserMutation,
  useBanUserMutation,
} = usersApi;
