import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Payment, PaymentStatus } from '../payments/entities/payment.entity';
import { Item } from '../menu/entities/item.entity';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Payment) private paymentRepo: Repository<Payment>,
  ) {}

  // Get total revenue for a restaurant by day/month
  async getRevenueSummary(restaurantId: number, period: 'daily' | 'monthly') {
    let query = this.paymentRepo
      .createQueryBuilder('payment')
      .leftJoin('payment.order', 'order')
      .where('order.restaurant_id = :restaurantId', { restaurantId })
      .andWhere('payment.status = :status', { status: PaymentStatus.COMPLETED });

    if (period === 'daily') {
      query = query
        .select('DATE(payment.created_at) as date')
        .addSelect('SUM(payment.amount) as total_revenue')
        .groupBy('DATE(payment.created_at)')
        .orderBy('date', 'DESC');
    } else if (period === 'monthly') {
      query = query
        .select("TO_CHAR(payment.created_at, 'YYYY-MM') as month")
        .addSelect('SUM(payment.amount) as total_revenue')
        .groupBy("TO_CHAR(payment.created_at, 'YYYY-MM')")
        .orderBy('month', 'DESC');
    }

    return query.getRawMany();
  }

  // Popular menu items based on order frequency
  async getPopularItems(restaurantId: number, limit = 10) {
    return this.orderRepo
      .createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'item')
      .leftJoin('item.category', 'category')
      .where('category.restaurant_id = :restaurantId', { restaurantId })
      .select('item.id', 'item_id')
      .addSelect('item.name', 'item_name')
      .addSelect('COUNT(order.id)', 'order_count')
      .addSelect('SUM(item.price)', 'total_revenue')
      .groupBy('item.id')
      .orderBy('order_count', 'DESC')
      .limit(limit)
      .getRawMany();
  }

  // Total orders, average order value, peak hours
  async getOrderStats(restaurantId: number) {
    const totalOrders = await this.orderRepo.count({
      where: { restaurant_id: restaurantId },
    });

    const avgOrderValueResult = await this.orderRepo
      .createQueryBuilder('order')
      .leftJoin('order.payments', 'payment')
      .select('AVG(payment.amount)', 'avg_order_value')
      .where('order.restaurant_id = :restaurantId', { restaurantId })
      .andWhere('payment.status = :status', { status: PaymentStatus.COMPLETED })
      .getRawOne();

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
      avgOrderValue: parseFloat(avgOrderValueResult.avg_order_value) || 0,
      ordersByHour,
    };
  }

  // Payment analytics: success/failure counts
  async getPaymentStats(restaurantId: number) {
    return this.paymentRepo
      .createQueryBuilder('payment')
      .leftJoin('payment.order', 'order')
      .select('payment.status', 'status')
      .addSelect('COUNT(payment.id)', 'count')
      .where('order.restaurant_id = :restaurantId', { restaurantId })
      .groupBy('payment.status')
      .getRawMany();
  }

  // Repeat customer stats
  async getCustomerAnalytics(restaurantId: number) {
    return this.orderRepo
      .createQueryBuilder('order')
      .leftJoin('order.user', 'user')
      .select('user.id', 'user_id')
      .addSelect('user.name', 'user_name')
      .addSelect('COUNT(order.id)', 'order_count')
      .where('order.restaurant_id = :restaurantId', { restaurantId })
      .groupBy('user.id')
      .orderBy('order_count', 'DESC')
      .limit(10)
      .getRawMany();
  }
}
