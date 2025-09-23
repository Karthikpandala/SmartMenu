"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnalyticsService = void 0;
// src/analytics/analytics.service.ts
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const order_entity_1 = require("../orders/entities/order.entity");
let AnalyticsService = class AnalyticsService {
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    // Popular menu items based on order frequency
    async getPopularItems(restaurantId, limit = 10) {
        return this.orderRepo
            .createQueryBuilder('order')
            .leftJoin('order.items', 'orderItem')
            .leftJoin('orderItem.item', 'item')
            .leftJoin('item.category', 'category')
            .where('category.restaurant_id = :restaurantId', { restaurantId })
            .select('item.id', 'itemId')
            .addSelect('item.name', 'itemName')
            .addSelect('COUNT(order.id)', 'orderCount')
            .addSelect('SUM(item.price)', 'totalRevenue')
            .groupBy('item.id')
            .orderBy('orderCount', 'DESC')
            .limit(limit)
            .getRawMany();
    }
    // Total orders, average order value, peak hours
    async getOrderStats(restaurantId) {
        const totalOrders = await this.orderRepo.count({
            where: { restaurant_id: restaurantId },
        });
        const ordersByHour = await this.orderRepo
            .createQueryBuilder('order')
            .select('EXTRACT(HOUR FROM order.created_at)::int', 'hour')
            .addSelect('COUNT(order.id)', 'count')
            .where('order.restaurant_id = :restaurantId', { restaurantId })
            .groupBy('hour')
            .orderBy('hour', 'ASC')
            .getRawMany();
        return {
            totalOrders,
            ordersByHour,
        };
    }
    // Repeat customer stats
    async getCustomerAnalytics(restaurantId) {
        return this.orderRepo
            .createQueryBuilder('order')
            .leftJoin('order.user', 'user')
            .select('user.id', 'userId')
            .addSelect('user.name', 'userName')
            .addSelect('COUNT(order.id)', 'orderCount')
            .where('order.restaurant_id = :restaurantId', { restaurantId })
            .groupBy('user.id')
            .orderBy('orderCount', 'DESC')
            .limit(10)
            .getRawMany();
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(order_entity_1.Order)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], AnalyticsService);
