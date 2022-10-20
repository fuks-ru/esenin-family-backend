import { Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Markup } from 'telegraf';
import { UseFilters, UseGuards } from '@nestjs/common';
import { Roles, Schemas } from '@fuks-ru/auth-module';

import { TelegrafExceptionFilter } from 'backend/Bot/filters/BotErrorFilter';
import { TelegramAuthGuard } from 'backend/Bot/guards/TelegramAuthGuard';
import { User } from 'backend/Bot/decorators/User';
import { IContext } from 'backend/Bot/types/IContext';
import { TelegramLoginGuard } from 'backend/Bot/guards/TelegramLoginGuard';
import { RolesGuard } from 'backend/Bot/guards/RolesGuard';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class BotService {
  @Start()
  @Roles('admin', 'moderator')
  @UseGuards(TelegramAuthGuard, RolesGuard)
  public async start(
    @Ctx() ctx: IContext,
    @User() user: Schemas.UserVerifyResponse,
  ): Promise<void> {
    const name = user.firstName ? `, ${user.firstName}` : '';

    await ctx.replyWithHTML(
      `Привет${name}!`,
      Markup.keyboard([
        Markup.button.webApp(
          'Добавить афишу',
          'https://82a0-94-180-162-10.eu.ngrok.io/',
        ),
        Markup.button.webApp(
          'Удалить афишу',
          'https://9106-94-180-203-146.eu.ngrok.io/',
        ),
        Markup.button.webApp(
          'Редактировать афишу',
          'https://9106-94-180-203-146.eu.ngrok.io/',
        ),
      ]),
    );
  }

  @On('contact')
  @Roles('admin', 'moderator')
  @UseGuards(TelegramLoginGuard, RolesGuard)
  public async phone(
    @Ctx() ctx: IContext,
    @User() user: Schemas.UserVerifyResponse,
  ): Promise<void> {
    await this.start(ctx, user);
  }
}
