import { Module } from '@nestjs/common';
// ❌ Disable DB for now
// import { TypeOrmModule } from '@nestjs/typeorm';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
// import { Order } from '../orders/entities/order.entity';
// import { Payment } from '../payments/entities/payment.entity';
import { MenuModule } from '../menu/menu.module';
import { OrdersModule } from '../orders/orders.module';
// import { PaymentsModule } from '../payments/payments.module';

@Module({
  // ❌ remove TypeOrmModule + PaymentsModule
  imports: [
    MenuModule,
    OrdersModule,
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
