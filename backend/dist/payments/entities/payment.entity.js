"use strict";
// import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
// import { User } from '../../users/entities/user.entity';
// import { Order } from '../../orders/entities/order.entity';
// export enum PaymentStatus {
//   PENDING = 'PENDING',
//   SUCCESS = 'SUCCESS',
//   FAILED = 'FAILED',
// }
// @Entity()
// export class Payment {
//   @PrimaryGeneratedColumn()
//   id!: number;
//   @ManyToOne(() => User, user => user.payments, { onDelete: 'CASCADE' })
//   user!: User;
//   @Column()
//   user_id!: number;
//   @ManyToOne(() => Order, { onDelete: 'CASCADE' })
//   order!: Order;
//   @Column()
//   order_id!: number;
//   @Column()
//   amount!: number;
//   @Column()
//   upi_id!: string;
//   @Column()
//   upi_transaction_ref!: string;
//   @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
//   status!: PaymentStatus;
//   @CreateDateColumn()
//   created_at!: Date;
//   @UpdateDateColumn()
//   updated_at!: Date;
// }
