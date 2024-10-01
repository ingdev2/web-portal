import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getSession } from "next-auth/react";
import { PositionLevelEnum } from "../../../utils/enums/position_level.enum";

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();

  if (session?.user?.access_token) {
    headers.set("Authorization", `Bearer ${session.user.access_token}`);
  }
  return headers;
};

export const positionLevelApi = createApi({
  reducerPath: "positionLevelApi",

  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_BACKEND_URL}/position-level`,
    prepareHeaders(headers, { getState }) {
      return addTokenToRequest(headers, { getState });
    },
  }),

  endpoints: (builder) => ({
    createPositionLevel: builder.mutation<
      PositionLevel,
      Partial<PositionLevel>
    >({
      query: (newPositionLevel) => ({
        url: `create`,
        method: "POST",
        body: newPositionLevel,
      }),
    }),

    getAllPositionLevels: builder.query<PositionLevel[], null>({
      query: () => "getAll",
    }),

    getPositionLevelByName: builder.query<
      PositionLevel,
      { name?: PositionLevelEnum | null }
    >({
      query: ({ name = null }) => {
        const params: any = {};

        if (name !== null) params.name = name;

        return {
          url: "getByName",
          params,
        };
      },
    }),

    updatePositionLevelById: builder.mutation<
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
  useCreatePositionLevelMutation,
  useGetAllPositionLevelsQuery,
  useGetPositionLevelByNameQuery,
  useUpdatePositionLevelByIdMutation,
} = positionLevelApi;
