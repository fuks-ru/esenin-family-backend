import { FC } from 'react';
import { Route } from 'react-router-dom';
import 'antd/dist/antd.css';

import { PubPage } from 'admin/pages/PubPage';
import { routes } from 'admin/shared/config/routes';
import { AppProvider } from 'admin/app/providers';
import { PosterPage } from 'admin/pages/PosterPage';
import { Layout } from 'admin/widgets/Layout';
import { useI18nRu } from 'admin/shared/lib';

export const App: FC = () => {
  useI18nRu();

  return (
    <AppProvider Wrapper={Layout}>
      <Route path={routes.pubs} element={<PubPage />} />
      <Route path={routes.posters} element={<PosterPage />} />
    </AppProvider>
  );
};
