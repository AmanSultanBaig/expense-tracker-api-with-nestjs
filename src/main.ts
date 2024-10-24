import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

async function bootstrap() {

  const logger = WinstonModule.createLogger({
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json(),
        ),
      }),
    ],
  });

  const app = await NestFactory.create(AppModule);

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
