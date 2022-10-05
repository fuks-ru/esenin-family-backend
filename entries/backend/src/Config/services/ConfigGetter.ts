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

  public getAuthBackendDomainWithScheme(): string {
    return this.envGetter.isDev()
      ? 'http://localhost:3003'
      : 'https://auth.esenin-family.ru';
  }

  public getRootDomain(): string {
    return this.envGetter.isDev() ? 'localhost' : 'esenin-family.ru';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return this.envGetter.isDev()
      ? this.getDevTypeOrmConfig()
      : this.getProdTypeOrmConfig();
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
