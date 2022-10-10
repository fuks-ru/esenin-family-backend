import { getApi } from '@fuks-ru/esenin-family-client';
import { getBaseQuery } from '@fuks-ru/common-frontend';
import { message } from 'antd';
import qs from 'qs';

import { authFrontendUrl, backendUrl } from 'admin/shared/config';

export const mainBaseQuery = getBaseQuery({
  getClient: () => getApi(backendUrl),
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
