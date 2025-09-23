// src/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Item } from '../menu/entities/item.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}

  // Popular menu items based on order frequency
  async getPopularItems(restaurantId: number, limit = 10) {
    return this.orderRepo
      .createQueryBuilder('order')
      .leftJoin('order.items', 'orderItem')
      .leftJoin('orderItem.item', 'item')
      .leftJoin('item.category', 'category')
      .where('category.restaurant_id = :restaurantId', { restaurantId })
      .select('item.id', 'itemId')
      .addSelect('item.name', 'itemName')
      .addSelect('COUNT(order.id)', 'orderCount')
      .addSelect('SUM(item.price)', 'totalRevenue')
      .groupBy('item.id')
      .orderBy('orderCount', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  // Total orders, average order value, peak hours
  async getOrderStats(restaurantId: number) {
    const totalOrders = await this.orderRepo.count({
      where: { restaurant_id: restaurantId },
    });

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
      ordersByHour,
    };
  }

  // Repeat customer stats
  async getCustomerAnalytics(restaurantId: number) {
    return this.orderRepo
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .select('user.id', 'userId')
      .addSelect('user.name', 'userName')
      .addSelect('COUNT(order.id)', 'orderCount')
      .where('order.restaurant_id = :restaurantId', { restaurantId })
      .groupBy('user.id')
      .orderBy('orderCount', 'DESC')
      .limit(10)
      .getRawMany();
  }
}
