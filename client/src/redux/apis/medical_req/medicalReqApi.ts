import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import { RequirementStatusEnum } from "@/../../api/src/medical_req/enums/requirement_status.enum";
import { RequirementTypeEnum } from "@/../../api/src/medical_req/enums/requirement_type.enum";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const medicalReqApi = createApi({
  reducerPath: "medicalReqApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/medical-req`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    createMedicalReqPatient: builder.mutation<
      Partial<MedicalReq>,
      {
        userId: string;
        medicalReqPatient: Partial<MedicalReq>;
      }
    >({
      query: ({ userId, medicalReqPatient }) => {
        return {
          url: `createMedicalReqPatient/${userId}`,
          method: "POST",
          params: { userId },
          body: medicalReqPatient,
        };
      },
    }),

    createMedicalReqEps: builder.mutation<
      Partial<MedicalReq>,
      { userId: string; medicalReqEps: Partial<MedicalReq> }
    >({
      query: ({ userId, medicalReqEps }) => ({
        url: `createMedicalReqEps/${userId}`,
        method: "POST",
        params: { userId },
        body: medicalReqEps,
      }),
    }),

    createMedicalReqFamiliar: builder.mutation<
      Partial<MedicalReq>,
      { familiarId: string; medicalReqFamiliar: Partial<MedicalReq> }
    >({
      query: ({ familiarId, medicalReqFamiliar }) => ({
        url: `createMedicalReqFamiliar/${familiarId}`,
        method: "POST",
        params: { familiarId },
        body: medicalReqFamiliar,
      }),
    }),

    getMedicalReqByFilingNumber: builder.query<MedicalReq[], string>({
      query: (filingNumber) => `medicalReq/${filingNumber}`,
    }),

    getAllMedicalReqUsers: builder.query<
      MedicalReq[],
      {
        status?: RequirementStatusEnum | null;
        type?: RequirementTypeEnum | null;
      }
    >({
      query: ({ status = null, type = null }) => {
        const params: any = {};
        if (status !== null) params.status = status;
        if (type !== null) params.type = type;

        return {
          url: "getAllMedicalReqUsers",
          params,
        };
      },
    }),

    getAllMedicalReqUsersToLegalArea: builder.query<MedicalReq[], null>({
      query: () => "getAllMedicalReqUsersToLegalArea",
    }),

    getAllMedicalReqPatient: builder.query<MedicalReq[], null>({
      query: () => "getAllMedicalReqPatient",
    }),

    getAllMedicalReqOfAUsers: builder.query<MedicalReq[], string>({
      query: (userId) => `getAllMedicalReqOfAUsers/${userId}`,
    }),

    getAllMedicalReqOfAFamiliar: builder.query<MedicalReq[], string>({
      query: (familiarId) => `getAllMedicalReqOfAFamiliar/${familiarId}`,
    }),

    getAllMedicalReqFamiliar: builder.query<MedicalReq[], null>({
      query: () => "getAllMedicalReqFamiliar",
    }),

    getAllMedicalReqEps: builder.query<MedicalReq[], null>({
      query: () => "getAllMedicalReqEps",
    }),

    getMedicalReqPatientById: builder.query<MedicalReq[], string>({
      query: (id) => `medicalReqPatient/${id}`,
    }),

    getMedicalReqFamiliarById: builder.query<MedicalReq[], string>({
      query: (id) => `medicalReqFamiliar/${id}`,
    }),

    getMedicalReqEpsById: builder.query<MedicalReq[], string>({
      query: (id) => `medicalReqEps/${id}`,
    }),

    changeStatusToDelivered: builder.mutation<
      any,
      { reqId: string; updateStatus: Partial<MedicalReq> }
    >({
      query: ({ reqId, updateStatus }) => ({
        url: `deliveredStatus/${reqId}`,
        method: "PATCH",
        params: { reqId },
        body: updateStatus,
      }),
    }),

    changeStatusToRejected: builder.mutation<
      any,
      { reqId: string; updateStatus: Partial<MedicalReq> }
    >({
      query: ({ reqId, updateStatus }) => ({
        url: `rejectedStatus/${reqId}`,
        method: "PATCH",
        params: { reqId },
        body: updateStatus,
      }),
    }),

    forwardToAnotherArea: builder.mutation<
      any,
      { reqId: string; updateStatus: Partial<MedicalReq> }
    >({
      query: ({ reqId, updateStatus }) => ({
        url: `rejectedStatus/${reqId}`,
        method: "PATCH",
        params: { reqId },
        body: updateStatus,
      }),
    }),

    deletedMedicalReq: builder.mutation<any, string>({
      query: (reqId) => ({
        url: `deleted/${reqId}`,
        method: "PATCH",
        params: { reqId },
      }),
    }),
  }),
});

export const {
  useCreateMedicalReqPatientMutation,
  useCreateMedicalReqEpsMutation,
  useCreateMedicalReqFamiliarMutation,
  useGetMedicalReqByFilingNumberQuery,
  useGetAllMedicalReqUsersQuery,
  useGetAllMedicalReqOfAUsersQuery,
  useLazyGetAllMedicalReqOfAUsersQuery,
  useGetAllMedicalReqOfAFamiliarQuery,
  useLazyGetAllMedicalReqOfAFamiliarQuery,
  useGetAllMedicalReqUsersToLegalAreaQuery,
  useGetAllMedicalReqPatientQuery,
  useGetAllMedicalReqFamiliarQuery,
  useGetAllMedicalReqEpsQuery,
  useGetMedicalReqPatientByIdQuery,
  useGetMedicalReqFamiliarByIdQuery,
  useGetMedicalReqEpsByIdQuery,
  useChangeStatusToDeliveredMutation,
  useChangeStatusToRejectedMutation,
  useForwardToAnotherAreaMutation,
  useDeletedMedicalReqMutation,
} = medicalReqApi;
