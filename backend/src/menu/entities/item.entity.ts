// src/menu/entities/item.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column('decimal')
  price!: number;

  @Column()
  image_url!: string;

  @Column()
  image_alt_text!: string;

  @Column()
  is_available!: boolean;

  @Column()
  preparation_time!: number;

  @Column()
  is_vegetarian!: boolean;

  @Column()
  is_vegan!: boolean;

  @Column()
  is_gluten_free!: boolean;

  @ManyToOne(() => Category, category => category.items)
  category!: Category;

  @Column()
  category_id!: number;

  @Column()
  created_at!: Date;

  @Column()
  updated_at!: Date;
}
