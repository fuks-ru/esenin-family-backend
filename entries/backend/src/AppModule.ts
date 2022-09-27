import { CommonModule } from '@difuks/common-backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { PubModule } from 'backend/Pub/PubModule';
import { ConfigModule } from 'backend/Config/ConfigModule';

@Module({
  imports: [
    ConfigModule,
    CommonModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        domain: configGetter.getDomain(),
        translations: configGetter.getTranslations(),
        apiPrefix: configGetter.getApiPrefix(),
        statusResolver: configGetter.statusResolver,
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    PubModule,
  ],
})
export class AppModule {}
