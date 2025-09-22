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
exports.PaymentsController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const payments_service_1 = require("./payments.service");
const payment_entity_1 = require("./entities/payment.entity");
let PaymentsController = class PaymentsController {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    createPayment(body) {
        const { user_id, order_id, amount, upi_id } = body;
        return this.paymentsService.createPayment(user_id, order_id, amount, upi_id);
    }
    getUPILink(upiId, payeeName, amount, txnRef) {
        return { upiLink: this.paymentsService.generateUPILink(upiId, payeeName, amount, txnRef) };
    }
    updateStatus(paymentId, status, txnRef) {
        return this.paymentsService.updatePaymentStatus(paymentId, status, txnRef);
    }
    getPaymentsByRestaurant(restaurantId) {
        return this.paymentsService.getPaymentsByRestaurant(restaurantId);
    }
    getPaymentById(id) {
        return this.paymentsService.getPaymentById(id);
    }
};
exports.PaymentsController = PaymentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "createPayment", null);
__decorate([
    (0, common_1.Get)('upi-link'),
    __param(0, (0, common_1.Query)('upiId')),
    __param(1, (0, common_1.Query)('payeeName')),
    __param(2, (0, common_1.Query)('amount')),
    __param(3, (0, common_1.Query)('txnRef')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number, String]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getUPILink", null);
__decorate([
    (0, common_1.Patch)(':paymentId/status'),
    __param(0, (0, common_1.Param)('paymentId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('upi_transaction_ref')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "updateStatus", null);
__decorate([
    (0, common_1.Get)('restaurant/:restaurantId'),
    __param(0, (0, common_1.Param)('restaurantId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getPaymentsByRestaurant", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PaymentsController.prototype, "getPaymentById", null);
exports.PaymentsController = PaymentsController = __decorate([
    (0, common_1.Controller)('payments'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], PaymentsController);
