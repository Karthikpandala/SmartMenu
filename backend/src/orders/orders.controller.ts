import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards, ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { OrdersService } from './orders.service';
import { OrderStatus } from './entities/order.entity';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  createOrder(@Body() body: { customer_id: number; restaurant_id: number; items: any[]; special_instructions?: string }) {
    const { customer_id, restaurant_id, items, special_instructions } = body;
    return this.ordersService.createOrder(customer_id, restaurant_id, items, special_instructions);
  }

  @Get(':restaurantId')
  getOrders(
    @Param('restaurantId', ParseIntPipe) restaurantId: number,
    @Query('status') status?: string,
  ) {
    const statusArray = status ? status.split(',').map(s => s as OrderStatus) : undefined;
    return this.ordersService.getOrdersByRestaurant(restaurantId, statusArray);
  }

  @Patch(':orderId/status')
  updateStatus(@Param('orderId', ParseIntPipe) orderId: number, @Body('status') status: OrderStatus) {
    return this.ordersService.updateOrderStatus(orderId, status);
  }
}
