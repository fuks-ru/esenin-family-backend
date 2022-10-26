import { CommonModule, EnvGetter } from '@fuks-ru/common-backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@fuks-ru/auth-module';
import { TelegrafModule } from 'nestjs-telegraf';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { PubModule } from 'backend/Pub/PubModule';
import { ConfigModule } from 'backend/Config/ConfigModule';
import { PosterModule } from 'backend/Poster/PosterModule';
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
    TelegrafModule.forRootAsync({
      inject: [ConfigGetter, EnvGetter],
      useFactory: (configGetter: ConfigGetter, envGetter: EnvGetter) => ({
        token: configGetter.getTelegramBotToken(),
        launchOptions: envGetter.isDev() ? false : undefined,
      }),
    }),
    PubModule,
    PosterModule,
    BotModule,
  ],
})
export class AppModule {}
