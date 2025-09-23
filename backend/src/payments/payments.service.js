// "use strict";
// var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
//     var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
//     if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
//     else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
//     return c > 3 && r && Object.defineProperty(target, key, r), r;
// };
// var __metadata = (this && this.__metadata) || function (k, v) {
//     if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
// };
// var __param = (this && this.__param) || function (paramIndex, decorator) {
//     return function (target, key) { decorator(target, key, paramIndex); }
// };
// Object.defineProperty(exports, "__esModule", { value: true });
// exports.PaymentsService = void 0;
// const common_1 = require("@nestjs/common");
// const typeorm_1 = require("@nestjs/typeorm");
// const typeorm_2 = require("typeorm");
// const payment_entity_1 = require("./entities/payment.entity");
// const orders_service_1 = require("../orders/orders.service");
// let PaymentsService = class PaymentsService {
//     constructor(paymentRepo, ordersService) {
//         this.paymentRepo = paymentRepo;
//         this.ordersService = ordersService;
//     }
//     async createPayment(userId, orderId, amount, upiId) {
//         // Verify order exists
//         const order = await this.ordersService.getOrderById(orderId);
//         const payment = this.paymentRepo.create({
//             user_id: userId,
//             order_id: orderId,
//             amount,
//             upi_id: upiId,
//             status: payment_entity_1.PaymentStatus.PENDING,
//         });
//         const savedPayment = await this.paymentRepo.save(payment);
//         return savedPayment;
//     }
//     // Generate UPI deep link for apps like GPay, PhonePe, etc.
//     generateUPILink(upiId, payeeName, amount, txnRef) {
//         return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tr=${txnRef}`;
//     }
//     async updatePaymentStatus(paymentId, status, upiTransactionRef) {
//         const payment = await this.paymentRepo.findOne({ where: { id: paymentId } });
//         if (!payment)
//             throw new common_1.NotFoundException('Payment not found');
//         payment.status = status;
//         if (upiTransactionRef)
//             payment.upi_transaction_ref = upiTransactionRef;
//         const updatedPayment = await this.paymentRepo.save(payment);
//         // Auto-update order status on successful payment
//         if (status === payment_entity_1.PaymentStatus.COMPLETED) {
//             await this.ordersService.updateOrderStatus(payment.order_id, 'CONFIRMED');
//         }
//         return updatedPayment;
//     }
//     async getPaymentsByRestaurant(restaurantId) {
//         return this.paymentRepo
//             .createQueryBuilder('payment')
//             .leftJoinAndSelect('payment.order', 'order')
//             .where('order.restaurant_id = :restaurantId', { restaurantId })
//             .orderBy('payment.created_at', 'DESC')
//             .getMany();
//     }
//     async getPaymentById(id) {
//         const payment = await this.paymentRepo.findOne({ where: { id } });
//         if (!payment)
//             throw new common_1.NotFoundException('Payment not found');
//         return payment;
//     }
// };
// exports.PaymentsService = PaymentsService;
// exports.PaymentsService = PaymentsService = __decorate([
//     (0, common_1.Injectable)(),
//     __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
//     __metadata("design:paramtypes", [typeorm_2.Repository,
//         orders_service_1.OrdersService])
// ], PaymentsService);
