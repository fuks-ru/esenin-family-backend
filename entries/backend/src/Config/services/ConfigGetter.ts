import { ConfigGetterBase, SystemErrorFactory } from '@difuks/common';
import { HttpStatus, Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as path from 'node:path';
import * as process from 'node:process';
import { I18nTranslation } from 'nestjs-i18n';

import { ormConfig } from 'backend/Config/utils/ormconfig';
import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import enUs from 'backend/__i18n__/enUS.json';
import ruRU from 'backend/__i18n__/ruRU.json';

@Injectable()
export class ConfigGetter extends ConfigGetterBase {
  /**
   * Соответствие между ошибками и статус-кодами ответов.
   */
  protected readonly statusResolver: Record<ErrorCode, HttpStatus> = {
    [ErrorCode.PUB_NOT_FOUND]: HttpStatus.NOT_FOUND,
  };

  public constructor(systemErrorFactory: SystemErrorFactory) {
    super(systemErrorFactory);
  }

  /**
   * Получает порт для апи.
   */
  public getApiPort(): number {
    return 3_001;
  }

  /**
   * Возвращает конфиг для подключения к БД.
   */
  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return this.isDev()
      ? this.getDevTypeOrmConfig()
      : this.getProdTypeOrmConfig();
  }

  public override getTranslations(): {
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
