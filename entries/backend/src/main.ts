import { CONFIG, SwaggerService } from '@difuks/common';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { isDevelopment } from '@difuks/common/dist/constants';

import { AppModule } from 'backend/AppModule';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin: [
        isDevelopment ? 'http://localhost:3000' : 'https://esenin-family.ru',
      ],
      credentials: true,
    },
  });

  const configGetter = await app.resolve<ConfigGetter>(CONFIG);
  const swaggerService = app.get(SwaggerService);

  app.use(cookieParser());
  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Esenin Family', app);

  swaggerService.setupRoute(configGetter.getApiPrefix(), app, document);

  if (configGetter.isDev()) {
    void swaggerService.generateApiContract(document);
  }

  await app.listen(configGetter.getApiPort());
})();
