import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

import { CompanyAreaEnum } from "@/utils/enums/company_area.enum";
import { RequirementStatusEnum } from "@/utils/enums/requirement_status.enum";
import { RequirementTypeEnum } from "@/utils/enums/requirement_type.enum";
import { UserRolType } from "@/utils/enums/user_roles.enum";

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
        aplicantType?: UserRolType | null;
        year?: number | null;
        month?: number | null;
      }
    >({
      query: ({
        status = null,
        type = null,
        aplicantType = null,
        year = null,
        month = null,
      }) => {
        const params: any = {};

        if (status !== null) params.status = status;
        if (type !== null) params.type = type;
        if (aplicantType !== null) params.aplicantType = aplicantType;
        if (year !== null) params.year = year;
        if (month !== null) params.month = month;

        return {
          url: "getAllMedicalReqUsers",
          params,
        };
      },
    }),

    getAllMedicalReqUsersByArea: builder.query<
      MedicalReq[],
      {
        companyAreaNames?: CompanyAreaEnum[] | null;
        status?: RequirementStatusEnum | null;
        type?: RequirementTypeEnum | null;
        aplicantType?: UserRolType | null;
        year?: number | null;
        month?: number | null;
      }
    >({
      query: ({
        companyAreaNames = null,
        status = null,
        type = null,
        aplicantType = null,
        year = null,
        month = null,
      }) => {
        const params = new URLSearchParams();

        if (companyAreaNames && companyAreaNames.length > 0) {
          companyAreaNames.forEach((area) =>
            params.append("companyAreaNames", area)
          );
        }
        if (status) params.append("status", status);
        if (type) params.append("type", type);
        if (aplicantType) params.append("aplicantType", aplicantType);
        if (year) params.append("year", year.toString());
        if (month) params.append("month", month.toString());

        return {
          url: `getAllMedReqUsersByArea?${params.toString()}`,
        };
      },
    }),

    getAverageResponseTime: builder.query<
      string[],
      { currentlyArea?: number | null }
    >({
      query: ({ currentlyArea = null }) => {
        const params: any = {};

        if (currentlyArea !== null) params.currentlyArea = currentlyArea;

        return {
          url: "averageResponseTime",
          params,
        };
      },
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

    getMedicalReqById: builder.query<MedicalReq, string>({
      query: (id) => `medicalReqById/${id}`,
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

    changeStatusToVisualized: builder.mutation<any, string>({
      query: (reqId) => ({
        url: `visualizedStatus/${reqId}`,
        method: "PATCH",
        params: { reqId },
      }),
    }),

    changeStatusToUnderReview: builder.mutation<any, string>({
      query: (filingNumber) => ({
        url: `underReviewStatus/${filingNumber}`,
        method: "PATCH",
        params: { filingNumber },
      }),
    }),

    changeStatusToDelivered: builder.mutation<
      any,
      { filingNumber: string; updateStatus: Partial<UpdateStatusMedicalReq> }
    >({
      query: ({ filingNumber, updateStatus }) => ({
        url: `deliveredStatus/${filingNumber}`,
        method: "PATCH",
        params: { filingNumber },
        body: updateStatus,
      }),
    }),

    changeStatusToRejected: builder.mutation<
      any,
      { filingNumber: string; updateStatus: Partial<UpdateStatusMedicalReq> }
    >({
      query: ({ filingNumber, updateStatus }) => ({
        url: `rejectedStatus/${filingNumber}`,
        method: "PATCH",
        params: { filingNumber },
        body: updateStatus,
      }),
    }),

    forwardToAnotherArea: builder.mutation<
      any,
      {
        filingNumber: string;
        sendToAnotherArea: Partial<UpdateStatusMedicalReq>;
      }
    >({
      query: ({ filingNumber, sendToAnotherArea }) => ({
        url: `sendToAnotherArea/${filingNumber}`,
        method: "PATCH",
        params: { filingNumber },
        body: sendToAnotherArea,
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
  useGetAllMedicalReqUsersByAreaQuery,
  useGetAverageResponseTimeQuery,
  useGetAllMedicalReqPatientQuery,
  useGetAllMedicalReqFamiliarQuery,
  useGetAllMedicalReqEpsQuery,
  useGetMedicalReqByIdQuery,
  useGetMedicalReqPatientByIdQuery,
  useGetMedicalReqFamiliarByIdQuery,
  useGetMedicalReqEpsByIdQuery,
  useChangeStatusToVisualizedMutation,
  useChangeStatusToUnderReviewMutation,
  useChangeStatusToDeliveredMutation,
  useChangeStatusToRejectedMutation,
  useForwardToAnotherAreaMutation,
  useDeletedMedicalReqMutation,
} = medicalReqApi;
