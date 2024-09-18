import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const typesMedicalReqApi = createApi({
  reducerPath: "typesMedicalReqApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/requirement-type`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    createMedicalReqType: builder.mutation<
      MedicalReqType,
      Partial<MedicalReqType>
    >({
      query: (newMedicalReqType) => ({
        url: `create`,
        method: "POST",
        body: newMedicalReqType,
      }),
    }),

    getAllMedicalReqTypes: builder.query<MedicalReqType[], null>({
      query: () => "getAll",
    }),

    getAllMedicalReqTypesAdminDashboard: builder.query<MedicalReqType[], null>({
      query: () => "getAllAdminDashboard",
    }),

    getMedicalReqTypeById: builder.query<MedicalReqType, number>({
      query: (id) => `getReqType/${id}`,
    }),

    updateMedicalReqTypeById: builder.mutation<
      any,
      { id: number; updateTypeOfRequest: Partial<MedicalReqType> }
    >({
      query: ({ id, updateTypeOfRequest }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: updateTypeOfRequest,
      }),
    }),

    banMedicalReqType: builder.mutation<any, { id: number }>({
      query: ({ id }) => ({
        url: `ban/${id}`,
        method: "PATCH",
        params: { id },
      }),
    }),
  }),
});

export const {
  useCreateMedicalReqTypeMutation,
  useGetAllMedicalReqTypesQuery,
  useGetAllMedicalReqTypesAdminDashboardQuery,
  useGetMedicalReqTypeByIdQuery,
  useUpdateMedicalReqTypeByIdMutation,
  useBanMedicalReqTypeMutation,
} = typesMedicalReqApi;
