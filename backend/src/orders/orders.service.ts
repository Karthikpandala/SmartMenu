import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order, OrderStatus } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrdersGateway } from './order.gateway';
import { User } from '../users/entities/user.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemRepo: Repository<OrderItem>,
    private ordersGateway: OrdersGateway,
  ) {}

  async createOrder(
    customer: User,
    restaurant: Restaurant,
    items: { item_id: number; quantity: number; price: number }[],
    specialInstructions?: string,
  ): Promise<Order> {
    const order = this.orderRepo.create({
      customer,
      restaurant,
      status: OrderStatus.PENDING,
      special_instructions: specialInstructions,
      total_price: items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    });

    const savedOrder = await this.orderRepo.save(order);

    const orderItems = items.map(i =>
      this.orderItemRepo.create({
        order: savedOrder,
        item_id: i.item_id,
        quantity: i.quantity,
        price: i.price,
      }),
    );

    await this.orderItemRepo.save(orderItems);

    const fullOrder = await this.getOrderById(savedOrder.id);

    // Notify staff via WebSocket
    this.ordersGateway.emitOrderUpdate(fullOrder);

    return fullOrder;
  }

  async getOrderById(id: number): Promise<Order> {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.item', 'customer', 'restaurant'],
    });
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  async getOrdersByRestaurant(restaurantId: number, status?: OrderStatus[]): Promise<Order[]> {
    const query = this.orderRepo.createQueryBuilder('order')
      .leftJoinAndSelect('order.items', 'orderItem')
      .leftJoinAndSelect('orderItem.item', 'item')
      .where('order.restaurant = :restaurantId', { restaurantId });

    if (status && status.length > 0) {
      query.andWhere('order.status IN (:...status)', { status });
    }

    return query.orderBy('order.created_at', 'DESC').getMany();
  }

  async updateOrderStatus(orderId: number, newStatus: OrderStatus): Promise<Order> {
    const order = await this.getOrderById(orderId);

    const validNextStatuses: Record<OrderStatus, OrderStatus[]> = {
      [OrderStatus.PENDING]: [OrderStatus.CONFIRMED, OrderStatus.CANCELLED],
      [OrderStatus.CONFIRMED]: [OrderStatus.PREPARING, OrderStatus.CANCELLED],
      [OrderStatus.PREPARING]: [OrderStatus.READY],
      [OrderStatus.READY]: [OrderStatus.SERVED],
      [OrderStatus.SERVED]: [],
      [OrderStatus.CANCELLED]: [],
    };

    if (!validNextStatuses[order.status].includes(newStatus)) {
      throw new BadRequestException(`Cannot change status from ${order.status} to ${newStatus}`);
    }

    order.status = newStatus;
    const updatedOrder = await this.orderRepo.save(order);

    this.ordersGateway.emitOrderUpdate(updatedOrder);

    return updatedOrder;
  }
}
