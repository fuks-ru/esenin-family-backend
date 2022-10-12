import { ComponentType, FC, ReactNode } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import ruRu from 'antd/es/locale/ru_RU';
import { ConfigProvider } from 'antd';

import { ReduxProvider } from 'admin/app/providers/ReduxProvider';

// https://github.com/ant-design/ant-design/issues/26699
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ruRu.DatePicker!.lang.locale = 'ru';

interface IProps {
  children: ReactNode;
  Wrapper: ComponentType<{ children: ReactNode }>;
}

export const AppProvider: FC<IProps> = ({ children, Wrapper }) => (
  <BrowserRouter>
    <ReduxProvider>
      <ConfigProvider locale={ruRu}>
        <Wrapper>
          <Routes>{children}</Routes>
        </Wrapper>
      </ConfigProvider>
    </ReduxProvider>
  </BrowserRouter>
);
