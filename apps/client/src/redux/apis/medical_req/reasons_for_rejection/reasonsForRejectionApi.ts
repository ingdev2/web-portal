import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const reasonForRejectionMedicalReqApi = createApi({
  reducerPath: "reasonForRejectionMedicalReqApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/reasons-for-rejection`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  refetchOnMountOrArgChange: true,

  refetchOnFocus: true,

  refetchOnReconnect: true,

  endpoints: (builder) => ({
    createMedicalReqReasonForRejection: builder.mutation<
      MedicalReqReasonForRejection,
      Partial<MedicalReqReasonForRejection>
    >({
      query: (newMedicalReqReasonForRejection) => ({
        url: `create`,
        method: "POST",
        body: newMedicalReqReasonForRejection,
      }),
    }),

    getAllMedicalReqReasonsForRejection: builder.query<
      MedicalReqReasonForRejection[],
      null
    >({
      query: () => "getAll",
    }),

    getMedicalReqReasonsForRejectionById: builder.query<
      MedicalReqReasonForRejection,
      number
    >({
      query: (id) => `getReasonForRejection/${id}`,
    }),

    updateMedicalReqReasonForRejectionById: builder.mutation<
      any,
      {
        id: number;
        updateReasonForRejection: Partial<MedicalReqReasonForRejection>;
      }
    >({
      query: ({ id, updateReasonForRejection }) => ({
        url: `update/${id}`,
        method: "PATCH",
        params: { id },
        body: updateReasonForRejection,
      }),
    }),
  }),
});

export const {
  useCreateMedicalReqReasonForRejectionMutation,
  useGetAllMedicalReqReasonsForRejectionQuery,
  useGetMedicalReqReasonsForRejectionByIdQuery,
  useUpdateMedicalReqReasonForRejectionByIdMutation,
} = reasonForRejectionMedicalReqApi;
