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

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

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

    transformGenderName: builder.mutation<null, { genderAbbrev: string }>({
      query: ({ genderAbbrev }) => ({
        url: `transformGenderName`,
        method: "POST",
        body: { genderAbbrev },
      }),
    }),

    transformGenderNumber: builder.mutation<null, { genderAbbrev: string }>({
      query: ({ genderAbbrev }) => ({
        url: `transformGenderNumber`,
        method: "POST",
        body: { genderAbbrev },
      }),
    }),

    getAllUsers: builder.query<User[], null>({
      query: () => "getAllUsers",
    }),

    getAllAuthorizedPatientRelatives: builder.query<Familiar, string>({
      query: (patientId) => `getAllRelatives/${patientId}`,
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

    updateUserPatient: builder.mutation<
      any,
      { id: string; updateUser: Partial<User> }
    >({
      query: ({ id, updateUser }) => ({
        url: `updatePatient/${id}`,
        method: "PATCH",
        params: { id },
        body: updateUser,
      }),
    }),

    updateUserEps: builder.mutation<
      any,
      { id: string; updateUser: Partial<User> }
    >({
      query: ({ id, updateUser }) => ({
        url: `updateEps/${id}`,
        method: "PATCH",
        params: { id },
        body: updateUser,
      }),
    }),

    updatePassword: builder.mutation<
      any,
      { id: string; passwords: UpdatePassword }
    >({
      query: ({ id, passwords }) => ({
        url: `updatePassword/${id}`,
        method: "PATCH",
        params: { id },
        body: { passwords },
      }),
    }),

    forgotPassword: builder.mutation<any, { email: string }>({
      query: ({ email }) => ({
        url: "forgotPassword",
        method: "PATCH",
        body: { email },
      }),
    }),

    resetPassword: builder.mutation<
      any,
      { token: string; new_password: string }
    >({
      query: ({ token, new_password }) => ({
        url: "resetPassword",
        method: "PATCH",
        body: { new_password },
        params: { token },
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
  useGetAllAuthorizedPatientRelativesQuery,
  useLazyGetAllAuthorizedPatientRelativesQuery,
  useGetAllPatientsQuery,
  useGetAllEpsQuery,
  useGetUserByIdQuery,
  useGetUserByIdNumberPatientQuery,
  useGetUserByIdNumberEpsQuery,
  useUpdateUserPatientMutation,
  useUpdateUserEpsMutation,
  useUpdatePasswordMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useBanUserMutation,
} = usersApi;
