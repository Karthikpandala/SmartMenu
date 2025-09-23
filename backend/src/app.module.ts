import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Import your feature modules here
import { UsersModule } from './users/users.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { AnalyticsModule } from './analytics/analytics.module';
// import { PaymentsModule } from './payments/payments.module'; // ❌ Disabled for now

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // ❌ Database disabled (TypeORM removed)
    UsersModule,
    MenuModule,
    OrdersModule,
    AnalyticsModule,
    // PaymentsModule, // disabled
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
