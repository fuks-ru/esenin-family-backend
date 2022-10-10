import { getApi, Client } from '@fuks-ru/auth-client';
import { getBaseQuery } from '@fuks-ru/common-frontend';
import { message } from 'antd';
import qs from 'qs';

import { authBackendUrl, authFrontendUrl } from 'admin/shared/config';

const getAuthApi = async (): Promise<Client> => {
  const authApi = await getApi(authBackendUrl);

  authApi.defaults.headers.common.i18next = 'ru-RU';

  return authApi;
};

export const authBaseQuery = getBaseQuery({
  getClient: getAuthApi,
  onForbidden: () => {
    window.location.assign(
      `${authFrontendUrl}?${qs.stringify({
        redirectFrom: window.location.href,
      })}`,
    );
  },
  onError: (messageText) => {
    void message.error(messageText || 'Неизвестная ошибка');
  },
});
