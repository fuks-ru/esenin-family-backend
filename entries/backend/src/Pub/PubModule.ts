import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PubController } from 'backend/Pub/controllers/PubController';
import { Pub } from 'backend/Pub/entities/Pub';
import { PubService } from 'backend/Pub/services/PubService';

@Module({
  imports: [TypeOrmModule.forFeature([Pub])],
  providers: [PubService],
  controllers: [PubController],
})
export class PubModule {}
