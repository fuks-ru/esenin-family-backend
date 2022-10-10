import { getApi, Client } from '@fuks-ru/esenin-family-client';
import { getBaseQuery } from '@fuks-ru/common-frontend';
import { message } from 'antd';
import qs from 'qs';

import { authFrontendUrl, backendUrl } from 'admin/shared/config';

const getMainApi = async (): Promise<Client> => {
  const mainApi = await getApi(backendUrl);

  mainApi.defaults.headers.common.i18next = 'ru-RU';

  return mainApi;
};

export const mainBaseQuery = getBaseQuery({
  getClient: getMainApi,
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
