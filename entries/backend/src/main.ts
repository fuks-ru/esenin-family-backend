import { EnvGetter, SwaggerService } from '@fuks-ru/common-backend';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from 'backend/AppModule';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const configGetter = app.get(ConfigGetter);
  const swaggerService = app.get(SwaggerService);
  const envGetter = app.get(EnvGetter);

  app.use(cookieParser());
  app.setGlobalPrefix(configGetter.getApiPrefix());
  app.enableCors({
    origin: [configGetter.getAdminDomainWithScheme()],
    credentials: true,
  });

  const document = swaggerService.createDocument('Esenin Family', app);

  swaggerService.setupRoute(configGetter.getApiPrefix(), app, document);

  if (envGetter.isDev()) {
    void swaggerService.generateApiContract(document);
  }

  await app.listen(configGetter.getApiPort());
})();
