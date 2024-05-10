import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const usersApi = createApi({
  reducerPath: "usersApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    transformIdTypeName: builder.mutation<null, string>({
      query: (idTypeAbbrev) => ({
        url: `transformIdTypeName`,
        method: "POST",
        body: idTypeAbbrev,
      }),
    }),

    transformIdTypeNumber: builder.mutation<null, string>({
      query: (idTypeAbbrev) => ({
        url: `transformIdTypeNumber`,
        method: "POST",
        body: idTypeAbbrev,
      }),
    }),

    transformGenderName: builder.mutation<null, string>({
      query: (genderAbbrev) => ({
        url: `transformGenderName`,
        method: "POST",
        body: genderAbbrev,
      }),
    }),

    transformGenderNumber: builder.mutation<null, string>({
      query: (genderAbbrev) => ({
        url: `transformGenderNumber`,
        method: "POST",
        body: genderAbbrev,
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

    banUser: builder.mutation<any, string>({
      query: (id) => ({
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
  useTransformGenderNameMutation,
  useTransformGenderNumberMutation,
  useGetAllUsersQuery,
  useGetAllPatientsQuery,
  useGetAllEpsQuery,
  useGetUserByIdQuery,
  useGetUserByIdNumberPatientQuery,
  useGetUserByIdNumberEpsQuery,
  useUpdateUserMutation,
  useBanUserMutation,
} = usersApi;
