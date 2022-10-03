import { ComponentType, FC, ReactNode } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';

import { ReduxProvider } from 'admin/app/providers/ReduxProvider';

interface IProps {
  children: ReactNode;
  Wrapper: ComponentType<{ children: ReactNode }>;
}

export const AppProvider: FC<IProps> = ({ children, Wrapper }) => (
  <BrowserRouter>
    <ReduxProvider>
      <Wrapper>
        <Routes>{children}</Routes>
      </Wrapper>
    </ReduxProvider>
  </BrowserRouter>
);
