import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const uploadViewFilesApi = createApi({
  reducerPath: "uploadViewFilesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/s3FileUploader`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    uploadFile: builder.mutation<string[], FormData>({
      query: (files) => ({
        url: `uploadFileToS3`,
        method: "POST",
        body: files,
      }),
    }),

    viewFile: builder.query<string[], string[]>({
      query: (key) => ({
        url: `viewFileFromS3`,
        method: "GET",
        params: { key },
      }),
    }),
  }),
});

export const { useUploadFileMutation, useViewFileQuery } = uploadViewFilesApi;
