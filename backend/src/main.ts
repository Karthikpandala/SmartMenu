// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ❌ Disable DB init for now
  // AppDataSource.initialize()
  //   .then(() => console.log('DB Connected'))
  //   .catch(err => console.error('DB init error', err));

  await app.listen(3000);
}
bootstrap();
