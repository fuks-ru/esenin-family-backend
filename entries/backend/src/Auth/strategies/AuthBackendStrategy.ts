import { Client, getApi, TApiResponse } from '@fuks-ru/auth-backend';
import { RedirectErrorFactory, SystemErrorFactory } from '@fuks-ru/common-backend';
import { CommonErrorCode, ForbiddenError } from '@fuks-ru/common';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { Strategy } from 'passport-custom';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

interface IRequest extends ExpressRequest {
  cookies: {
    jwtToken?: string;
  };
}

@Injectable()
export class AuthBackendStrategy extends PassportStrategy(
  Strategy,
  'auth-backend',
) {
  private authApi!: Client;

  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly redirectErrorFactory: RedirectErrorFactory,
    private readonly configGetter: ConfigGetter,
  ) {
    super();

    void this.initApi();
  }

  private async initApi(): Promise<void> {
    this.authApi = await getApi(this.configGetter.getAuthBackendDomainWithScheme());
  }

  private async validate(
    request: IRequest,
  ): Promise<TApiResponse<'authVerify'>> {
    const { jwtToken } = request.cookies;

    if (!jwtToken) {
      throw this.systemErrorFactory.create(
        CommonErrorCode.FORBIDDEN,
        'Отсутствует токен авторизации.',
      );
    }

    try {
      this.authApi.defaults.headers.common.cookie =
        request.headers.cookie || '';

      const response = await this.authApi.authVerify(null, {
        jwtToken,
      });

      return response.data;
    } catch (error) {
      if (error instanceof ForbiddenError) {
        throw this.systemErrorFactory.create(
          CommonErrorCode.FORBIDDEN,
          'Ошибка авторизации.',
        );
      }

      throw error;
    }
  }
}
