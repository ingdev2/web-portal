import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const relationshipTypesApi = createApi({
  reducerPath: "relationshipTypesApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/rel-with-patient`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createRelationshipType: builder.mutation<
      RelationshipType,
      Partial<RelationshipType>
    >({
      query: (newRelationshipType) => ({
        url: `create`,
        method: "POST",
        body: newRelationshipType,
      }),
    }),

    getAllRelationshipTypes: builder.query<RelationshipType[], null>({
      query: () => "getAll",
    }),

    getRelationshipTypeById: builder.query<RelationshipType, number>({
      query: (id) => `getRelationshipType/${id}`,
    }),

    updateRelationshipTypeById: builder.mutation<
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
  useCreateRelationshipTypeMutation,
  useGetAllRelationshipTypesQuery,
  useGetRelationshipTypeByIdQuery,
  useUpdateRelationshipTypeByIdMutation,
} = relationshipTypesApi;
