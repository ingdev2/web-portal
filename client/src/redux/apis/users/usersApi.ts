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
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL_PRO}/users`,
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

    getUserById: builder.query<Partial<User>, string>({
      query: (id) => `getUser/${id}`,
    }),

    getUserByIdNumber: builder.query<Partial<User>, Partial<User>>({
      query: ({ user_id_type, id_number }) => ({
        url: `getUserByIdNumber/${user_id_type}/${id_number}`,
        method: "GET",
        params: { user_id_type, id_number },
      }),
    }),

    getUserByIdNumberPatient: builder.query<Partial<User>, number>({
      query: (idNumber) => `getPatientUserByIdNumber/${idNumber}`,
    }),

    getUserByIdNumberEps: builder.query<Partial<User>, number>({
      query: (idNumber) => `getEpsUserByIdNumber/${idNumber}`,
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
        body: passwords,
      }),
    }),

    forgotPatientPassword: builder.mutation<any, ForgotUserPatientPassword>({
      query: (forgotUserPatientPassword) => ({
        url: "forgotPatientPassword",
        method: "PATCH",
        body: forgotUserPatientPassword,
      }),
    }),

    forgotEpsPassword: builder.mutation<any, ForgotUserEpsPassword>({
      query: (forgotUserEpsPassword) => ({
        url: "forgotEpsPassword",
        method: "PATCH",
        body: forgotUserEpsPassword,
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
  useTransformGenderNameMutation,
  useTransformGenderNumberMutation,
  useGetAllUsersQuery,
  useGetAllAuthorizedPatientRelativesQuery,
  useLazyGetAllAuthorizedPatientRelativesQuery,
  useGetAllPatientsQuery,
  useGetAllEpsQuery,
  useGetUserByIdQuery,
  useGetUserByIdNumberQuery,
  useGetUserByIdNumberPatientQuery,
  useGetUserByIdNumberEpsQuery,
  useUpdateUserPatientMutation,
  useUpdateUserEpsMutation,
  useUpdatePasswordMutation,
  useForgotPatientPasswordMutation,
  useForgotEpsPasswordMutation,
  useBanUserMutation,
} = usersApi;
