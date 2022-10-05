import {
  getApi,
  Client,
  TApiArgs,
  TApiBody,
  TMethods,
} from '@fuks-ru/esenin-family-client';
import {
  ForbiddenError,
  RedirectError,
  SystemError,
  UnauthorizedError,
  ValidationError,
} from '@fuks-ru/common';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { message } from 'antd';
import qs from 'qs';

import { authFrontendUrl, backendUrl } from 'admin/shared/config';

// eslint-disable-next-line import/no-mutable-exports
export let mainApi: Client;

export const initMainApi = async (): Promise<void> => {
  mainApi = await getApi(backendUrl);

  mainApi.defaults.headers.common.i18next = 'ru-RU';
};

export type IQueryArgs<Method extends TMethods = TMethods> = {
  method: Method;
  params?: TApiArgs<Method>;
  body?: TApiBody<Method>;
};

export const getMainBaseQuery = (): BaseQueryFn<IQueryArgs> => async (args) => {
  const method = mainApi[args.method].bind(mainApi);

  try {
    const response = await method(args.params, args.body);

    return {
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ValidationError || error instanceof SystemError) {
      await message.error(error.message);

      return {
        error: error.message,
      };
    }

    if (error instanceof ForbiddenError || error instanceof UnauthorizedError) {
      window.location.assign(
        `${authFrontendUrl}?${qs.stringify({
          redirectFrom: window.location.href,
        })}`,
      );

      return {
        error: '',
      };
    }

    if (error instanceof RedirectError) {
      window.location.assign(error.data.location);

      return {
        error: '',
      };
    }

    await message.error('Неизвестная ошибка');

    return {
      error: 'Неизвестная ошибка',
    };
  }
};
