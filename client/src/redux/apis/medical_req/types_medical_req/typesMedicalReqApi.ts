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

  endpoints: (builder) => ({
    createMedicalReqType: builder.mutation<
      MedicalReqStatus,
      Partial<MedicalReqStatus>
    >({
      query: (newMedicalReqType) => ({
        url: `create`,
        method: "POST",
        body: newMedicalReqType,
      }),
    }),

    getAllMedicalReqTypes: builder.query<MedicalReqStatus[], null>({
      query: () => "getAll",
    }),

    getMedicalReqTypeById: builder.query<MedicalReqStatus, number>({
      query: (id) => `getReqType/${id}`,
    }),

    updateMedicalReqTypeById: builder.mutation<
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
  useCreateMedicalReqTypeMutation,
  useGetAllMedicalReqTypesQuery,
  useGetMedicalReqTypeByIdQuery,
  useUpdateMedicalReqTypeByIdMutation,
} = typesMedicalReqApi;
