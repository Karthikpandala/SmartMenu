import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from './category.entity';

@Entity('menu_items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ nullable: true })
  image_url: string;

  @Column({ nullable: true })
  image_alt_text: string;

  @Column({ default: true })
  is_available: boolean;

  @Column({ type: 'int', nullable: true })
  preparation_time: number;

  @Column({ default: false })
  is_vegetarian: boolean;

  @Column({ default: false })
  is_vegan: boolean;

  @Column({ default: false })
  is_gluten_free: boolean;

  @ManyToOne(() => Category, category => category.items)
  category: Category;

  @Column()
  category_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
