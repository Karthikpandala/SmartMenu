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
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const order_entity_1 = require("../orders/entities/order.entity");
const payment_entity_1 = require("../payments/entities/payment.entity");
let AnalyticsService = class AnalyticsService {
    constructor(orderRepo, paymentRepo) {
        this.orderRepo = orderRepo;
        this.paymentRepo = paymentRepo;
    }
    // Get total revenue for a restaurant by day/month
    async getRevenueSummary(restaurantId, period) {
        let query = this.paymentRepo
            .createQueryBuilder('payment')
            .leftJoin('payment.order', 'order')
            .where('order.restaurant_id = :restaurantId', { restaurantId })
            .andWhere('payment.status = :status', { status: payment_entity_1.PaymentStatus.COMPLETED });
        if (period === 'daily') {
            query = query
                .select('DATE(payment.created_at) as date')
                .addSelect('SUM(payment.amount) as total_revenue')
                .groupBy('DATE(payment.created_at)')
                .orderBy('date', 'DESC');
        }
        else if (period === 'monthly') {
            query = query
                .select("TO_CHAR(payment.created_at, 'YYYY-MM') as month")
                .addSelect('SUM(payment.amount) as total_revenue')
                .groupBy("TO_CHAR(payment.created_at, 'YYYY-MM')")
                .orderBy('month', 'DESC');
        }
        return query.getRawMany();
    }
    // Popular menu items based on order frequency
    async getPopularItems(restaurantId, limit = 10) {
        return this.orderRepo
            .createQueryBuilder('order')
            .leftJoinAndSelect('order.items', 'item')
            .leftJoin('item.category', 'category')
            .where('category.restaurant_id = :restaurantId', { restaurantId })
            .select('item.id', 'item_id')
            .addSelect('item.name', 'item_name')
            .addSelect('COUNT(order.id)', 'order_count')
            .addSelect('SUM(item.price)', 'total_revenue')
            .groupBy('item.id')
            .orderBy('order_count', 'DESC')
            .limit(limit)
            .getRawMany();
    }
    // Total orders, average order value, peak hours
    async getOrderStats(restaurantId) {
        const totalOrders = await this.orderRepo.count({
            where: { restaurant_id: restaurantId },
        });
        const avgOrderValueResult = await this.orderRepo
            .createQueryBuilder('order')
            .leftJoin('order.payments', 'payment')
            .select('AVG(payment.amount)', 'avg_order_value')
            .where('order.restaurant_id = :restaurantId', { restaurantId })
            .andWhere('payment.status = :status', { status: payment_entity_1.PaymentStatus.COMPLETED })
            .getRawOne();
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
            avgOrderValue: parseFloat(avgOrderValueResult.avg_order_value) || 0,
            ordersByHour,
        };
    }
    // Payment analytics: success/failure counts
    async getPaymentStats(restaurantId) {
        return this.paymentRepo
            .createQueryBuilder('payment')
            .leftJoin('payment.order', 'order')
            .select('payment.status', 'status')
            .addSelect('COUNT(payment.id)', 'count')
            .where('order.restaurant_id = :restaurantId', { restaurantId })
            .groupBy('payment.status')
            .getRawMany();
    }
    // Repeat customer stats
    async getCustomerAnalytics(restaurantId) {
        return this.orderRepo
            .createQueryBuilder('order')
            .leftJoin('order.user', 'user')
            .select('user.id', 'user_id')
            .addSelect('user.name', 'user_name')
            .addSelect('COUNT(order.id)', 'order_count')
            .where('order.restaurant_id = :restaurantId', { restaurantId })
            .groupBy('user.id')
            .orderBy('order_count', 'DESC')
            .limit(10)
            .getRawMany();
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_2.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], AnalyticsService);
