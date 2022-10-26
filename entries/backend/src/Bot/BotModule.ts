import { Module } from '@nestjs/common';

import { BotService } from 'backend/Bot/services/BotService';

@Module({
  providers: [BotService],
})
export class BotModule {}
