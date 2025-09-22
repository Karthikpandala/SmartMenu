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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const order_entity_1 = require("./entities/order.entity");
const order_item_entity_1 = require("./entities/order-item.entity");
const orders_gateway_1 = require("./orders.gateway");
let OrdersService = class OrdersService {
    constructor(orderRepo, orderItemRepo, ordersGateway) {
        this.orderRepo = orderRepo;
        this.orderItemRepo = orderItemRepo;
        this.ordersGateway = ordersGateway;
    }
    async createOrder(customerId, restaurantId, items, specialInstructions) {
        const order = this.orderRepo.create({
            customer_id: customerId,
            restaurant_id: restaurantId,
            status: order_entity_1.OrderStatus.PENDING,
            special_instructions: specialInstructions,
            total_price: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
        const savedOrder = await this.orderRepo.save(order);
        const orderItems = items.map(i => this.orderItemRepo.create({
            order_id: savedOrder.id,
            item_id: i.item_id,
            quantity: i.quantity,
            price: i.price,
        }));
        await this.orderItemRepo.save(orderItems);
        const fullOrder = await this.getOrderById(savedOrder.id);
        // Notify staff via WebSocket
        this.ordersGateway.emitOrderUpdate(fullOrder);
        return fullOrder;
    }
    async getOrderById(id) {
        const order = await this.orderRepo.findOne({
            where: { id },
            relations: ['items', 'items.item', 'customer', 'restaurant'],
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        return order;
    }
    async getOrdersByRestaurant(restaurantId, status) {
        const query = this.orderRepo.createQueryBuilder('order')
            .leftJoinAndSelect('order.items', 'orderItem')
            .leftJoinAndSelect('orderItem.item', 'item')
            .where('order.restaurant_id = :restaurantId', { restaurantId });
        if (status && status.length > 0) {
            query.andWhere('order.status IN (:...status)', { status });
        }
        return query.orderBy('order.created_at', 'DESC').getMany();
    }
    async updateOrderStatus(orderId, newStatus) {
        const order = await this.getOrderById(orderId);
        // Validate status progression
        const validNextStatuses = {
            [order_entity_1.OrderStatus.PENDING]: [order_entity_1.OrderStatus.CONFIRMED, order_entity_1.OrderStatus.CANCELLED],
            [order_entity_1.OrderStatus.CONFIRMED]: [order_entity_1.OrderStatus.PREPARING, order_entity_1.OrderStatus.CANCELLED],
            [order_entity_1.OrderStatus.PREPARING]: [order_entity_1.OrderStatus.READY],
            [order_entity_1.OrderStatus.READY]: [order_entity_1.OrderStatus.SERVED],
            [order_entity_1.OrderStatus.SERVED]: [],
            [order_entity_1.OrderStatus.CANCELLED]: [],
        };
        if (!validNextStatuses[order.status].includes(newStatus)) {
            throw new common_1.BadRequestException(`Cannot change status from ${order.status} to ${newStatus}`);
        }
        order.status = newStatus;
        const updatedOrder = await this.orderRepo.save(order);
        // Notify staff/customers
        this.ordersGateway.emitOrderUpdate(updatedOrder);
        return updatedOrder;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(1, (0, typeorm_1.InjectRepository)(order_item_entity_1.OrderItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository, typeof (_a = typeof orders_gateway_1.OrdersGateway !== "undefined" && orders_gateway_1.OrdersGateway) === "function" ? _a : Object])
], OrdersService);
