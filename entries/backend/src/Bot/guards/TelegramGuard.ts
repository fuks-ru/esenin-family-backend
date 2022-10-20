import { SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { TelegrafContextType, TelegrafExecutionContext } from 'nestjs-telegraf';

import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { Context } from 'telegraf';

@Injectable()
export class TelegramGuard implements CanActivate {
  public constructor(private readonly systemErrorFactory: SystemErrorFactory) {}

  public canActivate(context: TelegrafExecutionContext): boolean {
    const type = context.getType<TelegrafContextType>();

    if (type !== 'telegraf') {
      throw this.systemErrorFactory.create(
        ErrorCode.ONLY_BOT_ALLOWED,
        'Разрешены запросы только от telegram-бота',
      );
    }

    const telegrafContext = context.getContext(0);

    return true;
  }
}
