import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  menuItemName!: string;

  @Column()
  quantity!: number;

  @Column()
  price!: number;

  @ManyToOne(() => Order, order => order.items, { onDelete: 'CASCADE' })
  order!: Order;

  @Column()
  order_id!: number;
}
