import {
  getApi,
  Client,
  TApiArgs,
  TApiBody,
  TMethods,
} from '@fuks-ru/esenin-family-backend';
import { urls } from '@fuks-ru/esenin-family-constants';
import {
  errorInterceptor,
  UnknownError,
  ValidationError,
} from '@fuks-ru/common-frontend';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { message } from 'antd';

/**
 * Клиент для работы с Api.
 */
// eslint-disable-next-line import/no-mutable-exports
export let api: Client;

/**
 * Инициализирует Api.
 */
export const initApi = async (): Promise<void> => {
  api = await getApi(urls.BACKEND_URL);

  api.interceptors.response.use(undefined, errorInterceptor);
  api.defaults.headers.common.i18next = navigator.language;
};

export type IQueryArgs<Method extends TMethods = TMethods> = {
  method: Method;
  params?: TApiArgs<Method>;
  body?: TApiBody<Method>;
};

export const getBaseQuery = (): BaseQueryFn<IQueryArgs> => async (args) => {
  const method = api[args.method].bind(api);

  try {
    const response = await method(args.params, args.body);

    return {
      data: response.data,
    };
  } catch (error) {
    if (error instanceof ValidationError || error instanceof UnknownError) {
      await message.error(error.message);

      return {
        error: error.message,
      };
    }

    await message.error('Неизвестная ошибка');

    return {
      error: 'Неизвестная ошибка',
    };
  }
};
