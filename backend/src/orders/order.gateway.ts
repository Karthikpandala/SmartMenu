import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Order } from './entities/order.entity';

@WebSocketGateway()
export class OrdersGateway {
  @WebSocketServer()
  server: Server;

  emitOrderUpdate(order: Order) {
    this.server.emit('orderUpdate', order);
  }
}
