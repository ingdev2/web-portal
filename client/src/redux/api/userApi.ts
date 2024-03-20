import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/users`,
  }),
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], null>({
      query: () => "getAllUsers",
    }),
    getUserById: builder.query<User, { id: string }>({
      query: ({ id }) => `getUser/${id}`,
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByIdQuery } = userApi;
