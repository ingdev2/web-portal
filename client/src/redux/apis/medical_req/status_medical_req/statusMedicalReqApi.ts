import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const statusMedicalReqApi = createApi({
  reducerPath: "statusMedicalReqApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/requirement-status`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createMedicalReqStatus: builder.mutation<
      MedicalReqStatus,
      Partial<MedicalReqStatus>
    >({
      query: (newMedicalReqStatus) => ({
        url: `create`,
        method: "POST",
        body: newMedicalReqStatus,
      }),
    }),

    getAllMedicalReqStatus: builder.query<MedicalReqStatus[], null>({
      query: () => "getAll",
    }),

    getMedicalReqStatusById: builder.query<MedicalReqStatus, number>({
      query: (id) => `getReqStatus/${id}`,
    }),

    updateMedicalReqStatusById: builder.mutation<
      any,
      { id: number; newName: string }
    >({
      query: ({ id, newName }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: { newName },
      }),
    }),
  }),
});

export const {
  useCreateMedicalReqStatusMutation,
  useGetAllMedicalReqStatusQuery,
  useGetMedicalReqStatusByIdQuery,
  useUpdateMedicalReqStatusByIdMutation,
} = statusMedicalReqApi;
