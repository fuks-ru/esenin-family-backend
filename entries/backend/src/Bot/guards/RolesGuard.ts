import { I18nResolver, SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CommonErrorCode } from '@fuks-ru/common';
import { Schemas } from '@fuks-ru/auth-module';
import {
  TelegrafArgumentsHost,
  TelegrafContextType,
  TelegrafExecutionContext,
} from 'nestjs-telegraf';

import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { IContext } from 'backend/Bot/types/IContext';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  /**
   * Проверяет, можно ли пускать пользователя с указанной ролью по маршруту.
   */
  public async canActivate(
    context: TelegrafExecutionContext,
  ): Promise<boolean> {
    const contextHandler = context.getHandler();

    const telegrafHost = TelegrafArgumentsHost.create(context);
    const type = context.getType<TelegrafContextType>();

    if (type !== 'telegraf') {
      throw this.systemErrorFactory.create(
        ErrorCode.ONLY_BOT_ALLOWED,
        'Разрешены запросы только от telegram-бота',
      );
    }

    const requiredRoles = this.reflector.get<
      Array<Schemas.UserVerifyResponse['role']> | undefined
    >('roles', contextHandler);

    if (!requiredRoles) {
      return true;
    }

    const { user } = telegrafHost.getContext<IContext>();

    if (user?.role === undefined || !requiredRoles.includes(user.role)) {
      throw this.systemErrorFactory.create(
        CommonErrorCode.FORBIDDEN,
        'Запрещенно',
      );
    }

    return true;
  }
}
