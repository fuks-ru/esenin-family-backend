import { createApi } from '@reduxjs/toolkit/query/react';
import {
  TApiArgs,
  TApiBody,
  TApiResponse,
} from '@fuks-ru/esenin-family-backend';

import { getBaseQuery } from 'admin/shared/api/api';

export const pubApi = createApi({
  reducerPath: 'pub',
  baseQuery: getBaseQuery(),
  endpoints: (builder) => ({
    getList: builder.query<TApiResponse<'pubList'>, void>({
      query: () => ({
        method: 'pubList',
      }),
    }),
    add: builder.mutation<TApiResponse<'pubAdd'>, TApiBody<'pubAdd'>>({
      query: (body) => ({
        method: 'pubAdd',
        body,
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
      TApiResponse<'pubUpdate'>,
      TApiBody<'pubUpdate'> & TApiArgs<'pubUpdate'>
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
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          pubApi.util.updateQueryData('getList', undefined, (draft) =>
            draft.filter((item) => item.id === id),
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
