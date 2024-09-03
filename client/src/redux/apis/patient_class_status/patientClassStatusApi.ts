import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const patientClassStatusApi = createApi({
  reducerPath: "patientClassStatusApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL_PRO}/patient-class-status`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createPatientClassStatus: builder.mutation<
      PatientClassStatus,
      Partial<PatientClassStatus>
    >({
      query: (newPatientClassStatus) => ({
        url: `create`,
        method: "POST",
        body: newPatientClassStatus,
      }),
    }),

    getAllPatientClassStatus: builder.query<PatientClassStatus[], null>({
      query: () => "getAll",
    }),

    getPatientClassStatusById: builder.query<PatientClassStatus, number>({
      query: (id) => `getPatientClassStatus/${id}`,
    }),

    updatePatientClassStatusById: builder.mutation<
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
  useCreatePatientClassStatusMutation,
  useGetAllPatientClassStatusQuery,
  useGetPatientClassStatusByIdQuery,
  useUpdatePatientClassStatusByIdMutation,
} = patientClassStatusApi;
