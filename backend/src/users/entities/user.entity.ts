import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

export enum UserRole {
  CUSTOMER = 'customer',
  STAFF = 'staff',
  RESTAURANT_ADMIN = 'restaurant_admin',
  PLATFORM_ADMIN = 'platform_admin',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole })
  role: UserRole;

  @ManyToOne(() => Restaurant, restaurant => restaurant.users, { nullable: true })
  restaurant: Restaurant;

  @Column({ nullable: true })
  restaurant_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
