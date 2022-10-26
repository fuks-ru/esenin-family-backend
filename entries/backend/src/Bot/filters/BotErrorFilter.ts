import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { TelegrafArgumentsHost } from 'nestjs-telegraf';
import { CommonErrorCode } from '@fuks-ru/common';
import { Markup } from 'telegraf';
import { SystemError } from '@fuks-ru/common-backend';

import { IContext } from 'backend/Bot/types/IContext';

@Catch()
export class TelegrafExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(TelegrafExceptionFilter.name);

  public async catch(exception: Error, host: ArgumentsHost): Promise<void> {
    const telegrafHost = TelegrafArgumentsHost.create(host);
    const ctx = telegrafHost.getContext<IContext>();

    this.logger.error(exception.message, exception.stack);

    if (!(exception instanceof SystemError)) {
      await ctx.replyWithHTML('<b>Ошибка</b>');

      return;
    }

    if (exception.code === CommonErrorCode.FORBIDDEN) {
      await ctx.replyWithHTML(
        'Вы не модератор. Обратитесь к администратору для повышения прав и снова нажмите войти',
        Markup.keyboard([Markup.button.contactRequest('Войти')]),
      );

      return;
    }

    if (exception.code === CommonErrorCode.UNAUTHORIZED) {
      await ctx.replyWithHTML(
        'Войди по номеру, чтобы редактировать афишу',
        Markup.keyboard([Markup.button.contactRequest('Войти')]),
      );

      return;
    }

    await ctx.replyWithHTML(`<b>Ошибка</b>: ${exception.message}`);
  }
}
