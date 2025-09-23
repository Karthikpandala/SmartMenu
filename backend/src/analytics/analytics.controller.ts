// src/analytics/analytics.controller.ts
import { Controller, Get, Param, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('popular-items/:restaurantId')
  async getPopularItems(
    @Param('restaurantId') restaurantId: number,
    @Query('limit') limit: number,
  ) {
    return this.analyticsService.getPopularItems(restaurantId, limit);
  }

  @Get('order-stats/:restaurantId')
  async getOrderStats(@Param('restaurantId') restaurantId: number) {
    return this.analyticsService.getOrderStats(restaurantId);
  }

  @Get('customer-analytics/:restaurantId')
  async getCustomerAnalytics(@Param('restaurantId') restaurantId: number) {
    return this.analyticsService.getCustomerAnalytics(restaurantId);
  }
}

