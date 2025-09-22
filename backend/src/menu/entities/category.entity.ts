import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Item } from './item.entity';
import { Restaurant } from '../../restaurants/entities/restaurant.entity';

@Entity('menu_categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'int', default: 0 })
  display_order: number;

  @Column({ default: true })
  is_active: boolean;

  @ManyToOne(() => Restaurant, restaurant => restaurant.categories)
  restaurant: Restaurant;

  @Column()
  restaurant_id: number;

  @OneToMany(() => Item, item => item.category)
  items: Item[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
