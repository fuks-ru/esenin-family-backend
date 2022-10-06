import { useEffect } from 'react';

import { setCookie } from 'admin/shared/lib/setCookie';

export const useI18nRu = (): void => {
  useEffect(() => {
    setCookie('i18next', 'ru-RU', 365);
  }, []);
};
