import { EnvGetter } from '@difuks/common-backend';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'node:path';
import * as process from 'node:process';
import { I18nTranslation } from 'nestjs-i18n';
import { API_PREFIX, domainUrl, ports } from '@difuks/esenin-family-constants';

import { ormConfig } from 'backend/Config/utils/ormconfig';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import enUs from 'backend/__i18n__/enUS.json';
import ruRU from 'backend/__i18n__/ruRU.json';

@Injectable()
export class ConfigGetter {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  public readonly statusResolver: Record<ErrorCode, HttpStatus> = {
    [ErrorCode.PUB_NOT_FOUND]: HttpStatus.NOT_FOUND,
  };

  public constructor(private readonly envGetter: EnvGetter) {}

  /**
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return ports.BACKEND_PORT;
  }

  /**
   * Получает префикс API.
   */
  public getApiPrefix(): string {
    return API_PREFIX;
  }

  /**
   * Получает корневой домен.
   */
  public getDomain(): string {
    return domainUrl;
  }

  /**
   * Возвращает конфиг для подключения к БД.
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return this.envGetter.isDev()
      ? this.getDevTypeOrmConfig()
      : this.getProdTypeOrmConfig();
  }

  public getTranslations(): {
    'en-US': I18nTranslation;
    'ru-RU': I18nTranslation;
  } {
    return {
      'en-US': enUs,
      'ru-RU': ruRU,
    };
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
