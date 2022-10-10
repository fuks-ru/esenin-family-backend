import { createApi } from '@reduxjs/toolkit/query/react';
import { Paths, Schemas } from '@fuks-ru/auth-client';

import { authBaseQuery } from 'admin/shared/api';

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getList: builder.query<Schemas.UserResponse[], void>({
      query: () => ({
        method: 'userList',
        params: {},
        body: undefined,
      }),
    }),
    update: builder.mutation<
      Schemas.UserResponse,
      Schemas.UserUpdateRequest & Paths.UserUpdate.PathParameters
    >({
      query: ({ id, ...body }) => ({
        method: 'userUpdate',
        params: {
          id,
        },
        body,
      }),
      onQueryStarted: async (params, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          userApi.util.updateQueryData('getList', undefined, (draft) => {
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
        method: 'userDelete',
        params: {
          id,
        },
        body: undefined,
      }),
      onQueryStarted: async (id, { dispatch, queryFulfilled }) => {
        const addResult = dispatch(
          userApi.util.updateQueryData('getList', undefined, (draft) =>
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
