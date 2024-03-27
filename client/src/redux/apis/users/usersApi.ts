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
    getUserById: builder.query<User, { id: string }>({
      query: ({ id }) => `getUser/${id}`,
    }),
    getUserByIdNumber: builder.query<User, { idNumber: number }>({
      query: ({ idNumber }) => `getUserById/${idNumber}`,
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
  useGetUserByIdQuery,
  useGetUserByIdNumberQuery,
  useUpdateUserMutation,
} = usersApi;
