import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const registerAdminApi = createApi({
  reducerPath: "registerAdminApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL_PRO}/auth`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createAdmin: builder.mutation<Admin, Partial<Admin>>({
      query: (newAdmin) => ({
        url: `registerAdmin`,
        method: "POST",
        body: newAdmin,
      }),
    }),
  }),
});

export const { useCreateAdminMutation } = registerAdminApi;
