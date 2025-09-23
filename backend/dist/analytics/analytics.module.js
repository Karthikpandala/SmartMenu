"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsModule = void 0;
const common_1 = require("@nestjs/common");
// ❌ Disable DB for now
// import { TypeOrmModule } from '@nestjs/typeorm';
const analytics_service_1 = require("./analytics.service");
const analytics_controller_1 = require("./analytics.controller");
// import { Order } from '../orders/entities/order.entity';
// import { Payment } from '../payments/entities/payment.entity';
const menu_module_1 = require("../menu/menu.module");
const orders_module_1 = require("../orders/orders.module");
// import { PaymentsModule } from '../payments/payments.module';
let AnalyticsModule = class AnalyticsModule {
};
exports.AnalyticsModule = AnalyticsModule;
exports.AnalyticsModule = AnalyticsModule = __decorate([
    (0, common_1.Module)({
        // ❌ remove TypeOrmModule + PaymentsModule
        imports: [
            menu_module_1.MenuModule,
            orders_module_1.OrdersModule,
        ],
        controllers: [analytics_controller_1.AnalyticsController],
        providers: [analytics_service_1.AnalyticsService],
    })
], AnalyticsModule);
