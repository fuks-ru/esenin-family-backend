import { CommonModule } from '@fuks-ru/common-backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@fuks-ru/auth-module';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { PubModule } from 'backend/Pub/PubModule';
import { ConfigModule } from 'backend/Config/ConfigModule';
import { PosterModule } from 'backend/Poster/PosterModule';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from 'backend/Bot/BotModule';

@Module({
  imports: [
    ConfigModule,
    AuthModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        authUrl: configGetter.getAuthBackendDomainWithScheme(),
      }),
    }),
    CommonModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        sessionCookieDomain: configGetter.getCookieDomain(),
        apiPrefix: configGetter.getApiPrefix(),
        statusResolver: configGetter.statusResolver,
        swagger: {
          generators: ['axios', 'dart'],
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    TelegrafModule.forRoot({
      token: '5790987925:AAGlHrEnA9ItkM4FVm1GiYLpJ7vqDwCsirI',
    }),
    PubModule,
    PosterModule,
    BotModule,
  ],
})
export class AppModule {}
