import { Ctx, Start, Update } from 'nestjs-telegraf';
import { Scenes } from 'telegraf';

@Update()
export class BotService {
  @Start()
  public async start(@Ctx() ctx: Scenes.SceneContext): Promise<void> {
    await ctx.reply('Welcome');
  }
}
