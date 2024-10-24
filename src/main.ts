import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';
import logger from './common/loggers/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  const config = new DocumentBuilder()
    .setTitle('Tracker API')
    .setDescription('API for managing incomes and expenses')
    .setVersion('1.0')
    .addBearerAuth(
      { 
        type: 'http', 
        scheme: 'bearer', 
        bearerFormat: 'JWT' 
      },
      'JWT-auth'
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
