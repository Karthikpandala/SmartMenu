"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/main.ts
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    // ❌ Disable DB init for now
    // AppDataSource.initialize()
    //   .then(() => console.log('DB Connected'))
    //   .catch(err => console.error('DB init error', err));
    await app.listen(3000);
}
bootstrap();
