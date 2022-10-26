import { EnvGetter } from '@fuks-ru/common-backend';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'node:path';
import * as process from 'node:process';

import { ormConfig } from 'backend/Config/utils/ormconfig';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';

@Injectable()
export class ConfigGetter {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  public readonly statusResolver: Record<ErrorCode, HttpStatus> = {
    [ErrorCode.PUB_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ErrorCode.POSTER_NOT_FOUND]: HttpStatus.NOT_FOUND,
    [ErrorCode.MESSAGE_NOT_PRIVATE]: HttpStatus.FORBIDDEN,
    [ErrorCode.EMPTY_MESSAGE]: HttpStatus.FORBIDDEN,
    [ErrorCode.ONLY_BOT_ALLOWED]: HttpStatus.FORBIDDEN,
    [ErrorCode.EMPTY_CONTACT]: HttpStatus.FORBIDDEN,
    [ErrorCode.NOT_YOU_CONTACT]: HttpStatus.FORBIDDEN,
  };

  public constructor(private readonly envGetter: EnvGetter) {}

  public getApiPort(): number {
    return 3_001;
  }

  public getApiPrefix(): string {
    return '/api';
  }

  public getAdminDomainWithScheme(): string {
    return this.envGetter.isDev()
      ? 'http://localhost:3000'
      : 'https://admin.esenin-family.ru';
  }

  public getAppDomainWithScheme(): string {
    return this.envGetter.isDev()
      ? 'http://localhost:49430'
      : 'https://app.esenin-family.ru';
  }

  public getAuthBackendDomainWithScheme(): string {
    return this.envGetter.isDev()
      ? 'http://localhost:3003'
      : 'https://auth.esenin-family.ru';
  }

  public getCookieDomain(): string {
    return this.envGetter.isDev() ? 'localhost' : '.esenin-family.ru';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return this.envGetter.isDev()
      ? this.getDevTypeOrmConfig()
      : this.getProdTypeOrmConfig();
  }

  public getInternalRequestToken(): string {
    return this.envGetter.isDev()
      ? ''
      : this.envGetter.getEnv('INTERNAL_REQUEST_TOKEN');
  }

  public getTelegramBotToken(): string {
    return this.envGetter.isDev()
      ? ''
      : this.envGetter.getEnv('TELEGRAM_BOT_TOKEN');
  }

  private getProdTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      ...ormConfig,
      autoLoadEntities: true,
    };
  }

  private getDevTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: path.join(process.cwd(), './var/sqlite'),
      synchronize: true,
      entities: ['**/entities/**/*.ts'],
      autoLoadEntities: true,
    };
  }
}
