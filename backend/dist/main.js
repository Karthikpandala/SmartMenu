"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const express = require("express");
const path_1 = require("path");
const ormconfig_1 = require("./ormconfig");
ormconfig_1.AppDataSource.initialize()
    .then(() => console.log('Data Source initialized'))
    .catch(err => console.error('Error during Data Source initialization', err));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    // Serve static uploads
    app.use('/uploads', express.static((0, path_1.join)(__dirname, '..', 'uploads')));
    // Enable CORS
    app.enableCors();
    await app.listen(3000);
    console.log('Backend running on http://localhost:3000');
}
bootstrap();
