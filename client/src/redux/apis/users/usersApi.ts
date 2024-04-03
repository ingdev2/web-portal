import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
  }),
  endpoints: (builder) => ({
    createUser: builder.mutation<User, Partial<User>>({
      query: (newUser) => ({
        url: `create`,
        method: "POST",
        body: newUser,
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
    getUserByIdNumber: builder.query<User, number>({
      query: (idNumber) => `getUserById/${idNumber}`,
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
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetAllPatientsQuery,
  useGetAllEpsQuery,
  useGetUserByIdQuery,
  useGetUserByIdNumberQuery,
  useUpdateUserMutation,
} = usersApi;
