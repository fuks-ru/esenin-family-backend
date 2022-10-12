import { Schemas, Paths } from '@fuks-ru/esenin-family-client';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { mainBaseQuery } from 'admin/shared/api';

export const posterApi = createApi({
  baseQuery: mainBaseQuery,
  reducerPath: 'poster',
  endpoints: (builder) => ({
    getList: builder.query<Schemas.PosterResponse[], void>({
      query: () => ({
        method: 'posterList',
        body: undefined,
        params: {},
      }),
    }),

    add: builder.mutation<Schemas.PosterAddRequest, Schemas.PosterResponse>({
      query: (body) => ({
        method: 'posterAdd',
        body,
        params: {},
      }),
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          posterApi.util.updateQueryData('getList', undefined, (draft) => {
            draft.push(body);
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          addResult.undo();
        }
      },
    }),

    update: builder.mutation<
      Schemas.PosterResponse,
      Schemas.PosterUpdateRequest & Paths.PosterUpdate.PathParameters
    >({
      query: ({ id, ...body }) => ({
        method: 'posterUpdate',
        params: {
          id,
        },
        body,
      }),
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          posterApi.util.updateQueryData('getList', undefined, (draft) => {
            const pub = draft.find((item) => item.id === params.id);

            if (pub) {
              Object.assign(pub, params);
            }
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          addResult.undo();
        }
      },
    }),

    delete: builder.mutation<void, string>({
      query: (id) => ({
        method: 'posterDelete',
        params: {
          id,
        },
        body: undefined,
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          posterApi.util.updateQueryData('getList', undefined, (draft) =>
            draft.filter((item) => item.id !== id),
          ),
        );

        try {
          await queryFulfilled;
        } catch {
          addResult.undo();
        }
      },
    }),
  }),
});
