import { CommonModule } from '@fuks-ru/common-backend';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NestMinioModule } from 'nestjs-minio';

import { ConfigGetter } from 'backend/Config/services/ConfigGetter';
import { PubModule } from 'backend/Pub/PubModule';
import { ConfigModule } from 'backend/Config/ConfigModule';
import { AuthModule } from 'backend/Auth/AuthModule';

@Module({
  imports: [
    ConfigModule,
    AuthModule,
    CommonModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => ({
        domain: configGetter.getRootDomain(),
        apiPrefix: configGetter.getApiPrefix(),
        statusResolver: configGetter.statusResolver,
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) =>
        configGetter.getTypeOrmConfig(),
    }),
    NestMinioModule.registerAsync({
      inject: [ConfigGetter],
      useFactory: (configGetter: ConfigGetter) => configGetter.getMinioConfig(),
    }),
    PubModule,
  ],
})
export class AppModule {}
