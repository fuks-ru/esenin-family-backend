import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { CONFIG, SwaggerService } from '@difuks/common';

import { AppModule } from 'backend/AppModule';
import { ConfigGetter } from 'backend/Config/services/ConfigGetter';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const swaggerService = app.get(SwaggerService);
  const configGetter = await app.resolve<ConfigGetter>(CONFIG);

  app.setGlobalPrefix(configGetter.getApiPrefix());

  const document = swaggerService.createDocument('Esenin Family', app);

  await swaggerService.generateApiContract(document);
})();
