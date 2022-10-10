import { Schemas, Paths } from '@fuks-ru/esenin-family-client';
import { createApi } from '@reduxjs/toolkit/dist/query/react';

import { mainBaseQuery } from 'admin/shared/api';

export const pubApi = createApi({
  baseQuery: mainBaseQuery,
  reducerPath: 'pub',
  endpoints: (builder) => ({
    getList: builder.query<Schemas.Pub[], void>({
      query: () => ({
        method: 'pubList',
        body: undefined,
        params: {},
      }),
    }),

    add: builder.mutation<Schemas.Pub, Schemas.Pub>({
      query: (body) => ({
        method: 'pubAdd',
        body,
        params: {},
      }),
      onQueryStarted: async (body, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          pubApi.util.updateQueryData('getList', undefined, (draft) => {
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
      Schemas.Pub,
      Schemas.PubUpdateRequest & Paths.PubUpdate.PathParameters
    >({
      query: ({ id, ...body }) => ({
        method: 'pubUpdate',
        params: {
          id,
        },
        body,
      }),
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          pubApi.util.updateQueryData('getList', undefined, (draft) => {
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
        method: 'pubDelete',
        params: {
          id,
        },
        body: undefined,
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          pubApi.util.updateQueryData('getList', undefined, (draft) =>
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
