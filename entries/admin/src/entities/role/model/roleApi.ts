import { createApi } from '@reduxjs/toolkit/query/react';
import { Schemas } from '@fuks-ru/auth-client';

import { authBaseQuery } from 'admin/shared/api';

export const roleApi = createApi({
  reducerPath: 'role',
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    getList: builder.query<Schemas.RoleResponse[], void>({
      query: () => ({
        method: 'roleList',
        params: {},
        body: undefined,
      }),
    }),
  }),
});
