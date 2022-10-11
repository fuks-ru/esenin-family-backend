import { useEffect } from 'react';

import { setCookie } from 'admin/shared/lib/setCookie';
import { rootDomain } from 'admin/shared/config';

export const useI18nRu = (): void => {
  useEffect(() => {
    setCookie('i18next', 'ru-RU', rootDomain, 365);
  }, []);
};
