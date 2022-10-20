import { SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable, CanActivate } from '@nestjs/common';
import {
  TelegrafArgumentsHost,
  TelegrafContextType,
  TelegrafExecutionContext,
} from 'nestjs-telegraf';
import { AuthClient } from '@fuks-ru/auth-module';
import { CommonErrorCode, UnauthorizedError } from '@fuks-ru/common';

import { ErrorCode } from 'backend/Config/enums/ErrorCode';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { IContext } from 'backend/Bot/types/IContext';

@Injectable()
export class TelegramLoginGuard implements CanActivate {
  public constructor(
    private readonly systemErrorFactory: SystemErrorFactory,
    private readonly authClient: AuthClient,
    private readonly configGetter: ConfigGetter,
  ) {}

  public async canActivate(
    context: TelegrafExecutionContext,
  ): Promise<boolean> {
    const telegrafHost = TelegrafArgumentsHost.create(context);
    const type = context.getType<TelegrafContextType>();

    if (type !== 'telegraf') {
      throw this.systemErrorFactory.create(
        ErrorCode.ONLY_BOT_ALLOWED,
        'Разрешены запросы только от telegram-бота',
      );
    }

    const telegramContext = telegrafHost.getContext<IContext>();

    if (!telegramContext.message) {
      throw this.systemErrorFactory.create(
        ErrorCode.EMPTY_MESSAGE,
        'Сообщение не может быть пустым',
      );
    }

    if (telegramContext.message.chat.type !== 'private') {
      throw this.systemErrorFactory.create(
        ErrorCode.MESSAGE_NOT_PRIVATE,
        'Сообщение можно отправлять только из приватного чата',
      );
    }

    const api = this.authClient.getClient();

    if (!('contact' in telegramContext.message)) {
      throw this.systemErrorFactory.create(
        ErrorCode.EMPTY_CONTACT,
        'Вы не передали контакт',
      );
    }

    const {
      chat: { id: chatId },
      contact: { user_id: userId },
    } = telegramContext.message;

    if (chatId !== userId) {
      throw this.systemErrorFactory.create(
        ErrorCode.NOT_YOU_CONTACT,
        'Вы передали не свой контакт',
      );
    }

    const {
      contact: { phone_number: phone },
      chat: { first_name: firstName, last_name: lastName },
    } = telegramContext.message;

    try {
      const { data } = await api.loginTelegramBot(
        null,
        {
          id: chatId,
          phone,
          firstName,
          lastName,
        },
        {
          headers: {
            'X-INTERNAL-TOKEN': this.configGetter.getInternalRequestToken(),
          },
        },
      );

      telegramContext.user = data;

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        throw this.systemErrorFactory.create(
          CommonErrorCode.UNAUTHORIZED,
          'Не авторизован',
        );
      }

      throw this.systemErrorFactory.create(
        CommonErrorCode.REMOTE_HOST_ERROR,
        'Ошибка при запросе к сервису авторизации',
      );
    }
  }
}
