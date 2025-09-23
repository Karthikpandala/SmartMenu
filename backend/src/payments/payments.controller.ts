// import { Controller, Post, Patch, Get, Body, Param, UseGuards, ParseIntPipe, Query } from '@nestjs/common';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
// import { PaymentsService } from './payments.service';
// import { PaymentStatus } from './entities/payment.entity';

// @Controller('payments')
// @UseGuards(JwtAuthGuard)
// export class PaymentsController {
//   constructor(private paymentsService: PaymentsService) {}

//   @Post()
//   createPayment(@Body() body: { user_id: number; order_id: number; amount: number; upi_id: string }) {
//     const { user_id, order_id, amount, upi_id } = body;
//     return this.paymentsService.createPayment(user_id, order_id, amount, upi_id);
//   }

//   @Get('upi-link')
//   getUPILink(@Query('upiId') upiId: string, @Query('payeeName') payeeName: string, @Query('amount') amount: number, @Query('txnRef') txnRef: string) {
//     return { upiLink: this.paymentsService.generateUPILink(upiId, payeeName, amount, txnRef) };
//   }

//   @Patch(':paymentId/status')
//   updateStatus(@Param('paymentId', ParseIntPipe) paymentId: number, @Body('status') status: PaymentStatus, @Body('upi_transaction_ref') txnRef?: string) {
//     return this.paymentsService.updatePaymentStatus(paymentId, status, txnRef);
//   }

//   @Get('restaurant/:restaurantId')
//   getPaymentsByRestaurant(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
//     return this.paymentsService.getPaymentsByRestaurant(restaurantId);
//   }

//   @Get(':id')
//   getPaymentById(@Param('id', ParseIntPipe) id: number) {
//     return this.paymentsService.getPaymentById(id);
//   }
// }
