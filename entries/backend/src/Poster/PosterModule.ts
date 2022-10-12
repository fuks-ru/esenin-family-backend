import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Poster } from 'backend/Poster/entities/Poster';
import { PosterService } from 'backend/Poster/services/PosterService';
import { PosterController } from 'backend/Poster/controllers/PosterController';

@Module({
  imports: [TypeOrmModule.forFeature([Poster])],
  providers: [PosterService],
  controllers: [PosterController],
})
export class PosterModule {}
