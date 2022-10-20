import { Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context, Markup, Scenes } from 'telegraf';
import { UseFilters, UseGuards } from '@nestjs/common';

import { TelegrafExceptionFilter } from 'backend/Bot/filters/BotErrorFilter';
import { TelegramGuard } from 'backend/Bot/guards/TelegramGuard';

@Update()
@UseFilters(TelegrafExceptionFilter)
export class BotService {
  @Start()
  @UseGuards(TelegramGuard)
  public async start(@Ctx() ctx: Context): Promise<void> {
    await ctx.replyWithHTML(
      'Войди по номеру, чтобы редактировать афишу',
      Markup.keyboard([Markup.button.contactRequest('Войти')]),
    );
  }

  @On('contact')
  public async phone(@Ctx() ctx: Context): Promise<void> {
    console.log(ctx);
  }

  public async test(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    await ctx.replyWithHTML(
      'Привет!',
      Markup.keyboard([
        Markup.button.webApp(
          'Добавить афишу',
          'https://9106-94-180-203-146.eu.ngrok.io/',
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
}
