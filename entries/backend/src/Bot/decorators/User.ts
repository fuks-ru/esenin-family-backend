import { createParamDecorator } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';

import { IContext } from 'backend/Bot/types/IContext';

export const User = createParamDecorator((_, ctx: TelegrafExecutionContext) => {
  const telegramContext = ctx.getArgByIndex<IContext>(0);

  return telegramContext.user;
});
