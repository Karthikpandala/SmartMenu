// import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Payment, PaymentStatus } from './entities/payment.entity';
// import { OrdersService } from '../orders/orders.service';

// @Injectable()
// export class PaymentsService {
//   constructor(
//     @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
//     private ordersService: OrdersService,
//   ) {}

//   async createPayment(userId: number, orderId: number, amount: number, upiId: string) {
//     // Verify order exists
//     const order = await this.ordersService.getOrderById(orderId);

//     const payment = this.paymentRepo.create({
//       user_id: userId,
//       order_id: orderId,
//       amount,
//       upi_id: upiId,
//       status: PaymentStatus.PENDING,
//     });

//     const savedPayment = await this.paymentRepo.save(payment);
//     return savedPayment;
//   }

//   // Generate UPI deep link for apps like GPay, PhonePe, etc.
//   generateUPILink(upiId: string, payeeName: string, amount: number, txnRef: string) {
//     return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(payeeName)}&am=${amount}&cu=INR&tr=${txnRef}`;
//   }

//   async updatePaymentStatus(paymentId: number, status: PaymentStatus, upiTransactionRef?: string) {
//     const payment = await this.paymentRepo.findOne({ where: { id: paymentId } });
//     if (!payment) throw new NotFoundException('Payment not found');

//     payment.status = status;
//     if (upiTransactionRef) payment.upi_transaction_ref = upiTransactionRef;

//     const updatedPayment = await this.paymentRepo.save(payment);

//     // Auto-update order status on successful payment
//     if (status === PaymentStatus.COMPLETED) {
//       await this.ordersService.updateOrderStatus(payment.order_id, 'CONFIRMED');
//     }

//     return updatedPayment;
//   }

//   async getPaymentsByRestaurant(restaurantId: number) {
//     return this.paymentRepo
//       .createQueryBuilder('payment')
//       .leftJoinAndSelect('payment.order', 'order')
//       .where('order.restaurant_id = :restaurantId', { restaurantId })
//       .orderBy('payment.created_at', 'DESC')
//       .getMany();
//   }

//   async getPaymentById(id: number) {
//     const payment = await this.paymentRepo.findOne({ where: { id } });
//     if (!payment) throw new NotFoundException('Payment not found');
//     return payment;
//   }
// }
