import { Controller, Get, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
@UseGuards(JwtAuthGuard)
export class AnalyticsController {
  constructor(private analyticsService: AnalyticsService) {}

  @Get('revenue/:restaurantId')
  getRevenue(@Param('restaurantId', ParseIntPipe) restaurantId: number, @Query('period') period: 'daily' | 'monthly' = 'daily') {
    return this.analyticsService.getRevenueSummary(restaurantId, period);
  }

  @Get('popular-items/:restaurantId')
  getPopularItems(@Param('restaurantId', ParseIntPipe) restaurantId: number, @Query('limit') limit = 10) {
    return this.analyticsService.getPopularItems(restaurantId, Number(limit));
  }

  @Get('order-stats/:restaurantId')
  getOrderStats(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.analyticsService.getOrderStats(restaurantId);
  }

  @Get('payment-stats/:restaurantId')
  getPaymentStats(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.analyticsService.getPaymentStats(restaurantId);
  }

  @Get('customer-analytics/:restaurantId')
  getCustomerAnalytics(@Param('restaurantId', ParseIntPipe) restaurantId: number) {
    return this.analyticsService.getCustomerAnalytics(restaurantId);
  }
}
