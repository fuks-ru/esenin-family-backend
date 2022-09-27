import { FC } from 'react';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import { PubPage } from 'admin/pages/PubPage';
import { routes } from 'admin/shared/config/routes';
import { AppProvider } from 'admin/app/providers';
import { PosterPage } from 'admin/pages/PosterPage';

export const App: FC = () => (
  <AppProvider>
    <Route path={routes.pubs} element={<PubPage />} />
    <Route path={routes.posters} element={<PosterPage />} />
  </AppProvider>
);
