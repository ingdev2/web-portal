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

    updateMedicalReqReasonForRejectionById: builder.mutation<
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
  useCreateMedicalReqReasonForRejectionMutation,
  useGetAllMedicalReqReasonsForRejectionQuery,
  useUpdateMedicalReqReasonForRejectionByIdMutation,
} = reasonForRejectionMedicalReqApi;
