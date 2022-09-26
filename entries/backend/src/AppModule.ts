import { CONFIG, CommonModule } from '@difuks/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { PubModule } from 'backend/Pub/PubModule';

@Module({
  imports: [
    CommonModule.forRoot(ConfigGetter),
    TypeOrmModule.forRootAsync({
      inject: [CONFIG],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    PubModule,
  ],
})
export class AppModule {}
