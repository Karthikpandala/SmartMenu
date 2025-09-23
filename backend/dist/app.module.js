"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
// Import your feature modules here
const users_module_1 = require("./users/users.module");
const menu_module_1 = require("./menu/menu.module");
const orders_module_1 = require("./orders/orders.module");
const analytics_module_1 = require("./analytics/analytics.module");
// import { PaymentsModule } from './payments/payments.module'; // ❌ Disabled for now
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            // ❌ Database disabled (TypeORM removed)
            users_module_1.UsersModule,
            menu_module_1.MenuModule,
            orders_module_1.OrdersModule,
            analytics_module_1.AnalyticsModule,
            // PaymentsModule, // disabled
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
