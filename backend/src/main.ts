import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
import { AppDataSource } from './ormconfig';

AppDataSource.initialize()
  .then(() => console.log('Data Source initialized'))
  .catch(err => console.error('Error during Data Source initialization', err));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Serve static uploads
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  // Enable CORS
  app.enableCors();

  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
}
bootstrap();
