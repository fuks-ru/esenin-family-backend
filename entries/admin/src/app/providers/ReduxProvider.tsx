import { configureStore } from '@reduxjs/toolkit';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { pubApi } from 'admin/entities/pub';
import { userApi } from 'admin/entities/user';
import { roleApi } from 'admin/entities/role';
import { posterApi } from 'admin/entities/poster';

const store = configureStore({
  reducer: {
    [pubApi.reducerPath]: pubApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [posterApi.reducerPath]: posterApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    pubApi.middleware,
    userApi.middleware,
    roleApi.middleware,
    posterApi.middleware,
  ],
});

interface IProps {
  children: ReactNode;
}

export const ReduxProvider: FC<IProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
