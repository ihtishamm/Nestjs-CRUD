import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const logger = new Logger('Bootstrap');
  logger.log('Application is starting...');

  const config = new DocumentBuilder()
    .setTitle('Item API')
    .setDescription('API for managing items')
    .setVersion('1.0')
    .addTag('items')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  logger.log('Application is running on http://localhost:3000');
}
bootstrap();
