import { createGlobalStyle } from 'styled-components';
import { FC } from 'react';

const GlobalStyleBase = createGlobalStyle`
  #app {
    height: 100%;
  }
`;

export const GlobalStyle: FC = () => <GlobalStyleBase />;
