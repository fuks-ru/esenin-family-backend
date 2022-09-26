import {
  getApi,
  Client,
  TApiArgs,
  TApiBody,
  OperationMethods,
} from '@difuks/esenin-family-backend';
import { isDevelopment } from '@difuks/common/dist/constants';
import {
  errorInterceptor,
  UnknownError,
  ValidationError,
} from '@difuks/common/dist/frontend';
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
  api = await getApi(
    isDevelopment ? 'http://localhost:3001' : 'https://esenin-family.ru',
  );

  api.interceptors.response.use(undefined, errorInterceptor);
  api.defaults.headers.common.i18next = navigator.language;
};

export type IQueryArgs<
  Method extends keyof OperationMethods = keyof OperationMethods,
> = {
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
