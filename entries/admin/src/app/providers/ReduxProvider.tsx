import { configureStore } from '@reduxjs/toolkit';
import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { pubApi } from 'admin/entities/pub';

const store = configureStore({
  reducer: {
    [pubApi.reducerPath]: pubApi.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    pubApi.middleware,
  ],
});

interface IProps {
  children: ReactNode;
}

export const ReduxProvider: FC<IProps> = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
