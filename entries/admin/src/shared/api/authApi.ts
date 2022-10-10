import { getApi } from '@fuks-ru/auth-client';
import { getBaseQuery } from '@fuks-ru/common-frontend';
import { message } from 'antd';
import qs from 'qs';

import { authBackendUrl, authFrontendUrl } from 'admin/shared/config';

export const authBaseQuery = getBaseQuery({
  getClient: () => getApi(authBackendUrl),
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
