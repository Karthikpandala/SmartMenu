import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { Item } from './entities/item.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Item) private itemRepo: Repository<Item>,
  ) {}

  // Category CRUD
  async getCategories(restaurantId: number): Promise<Category[]> {
    return this.categoryRepo.find({
      where: { restaurant_id: restaurantId, is_active: true },
      relations: ['items'],
      order: { display_order: 'ASC' },
    });
  }

  async createCategory(data: Partial<Category>): Promise<Category> {
    const category = this.categoryRepo.create(data);
    return this.categoryRepo.save(category);
  }

  async updateCategory(id: number, data: Partial<Category>): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    Object.assign(category, data);
    return this.categoryRepo.save(category);
  }

  async deleteCategory(id: number): Promise<void> {
    const result = await this.categoryRepo.update(id, { is_active: false });
    if (result.affected === 0) throw new NotFoundException('Category not found');
  }

  // Menu Item CRUD
  async getMenuItems(restaurantId: number): Promise<Item[]> {
    return this.itemRepo
      .createQueryBuilder('item')
      .leftJoinAndSelect('item.category', 'category')
      .where('category.restaurant_id = :restaurantId', { restaurantId })
      .andWhere('item.is_available = :available', { available: true })
      .orderBy('category.display_order', 'ASC')
      .addOrderBy('item.created_at', 'ASC')
      .getMany();
  }

  async getMenuItem(id: number): Promise<Item> {
    const item = await this.itemRepo.findOne({ where: { id }, relations: ['category'] });
    if (!item) throw new NotFoundException('Menu item not found');
    return item;
  }

  async createMenuItem(data: Partial<Item>): Promise<Item> {
    const item = this.itemRepo.create(data);
    return this.itemRepo.save(item);
  }

  async updateMenuItem(id: number, data: Partial<Item>): Promise<Item> {
    const item = await this.getMenuItem(id);
    Object.assign(item, data);
    return this.itemRepo.save(item);
  }

  async updateItemImage(id: number, imageUrl: string): Promise<Item> {
    const item = await this.getMenuItem(id);
    item.image_url = imageUrl;
    return this.itemRepo.save(item);
  }

  async toggleItemAvailability(id: number): Promise<Item> {
    const item = await this.getMenuItem(id);
    item.is_available = !item.is_available;
    return this.itemRepo.save(item);
  }

  async updateMenuItemsOrder(updates: { id: number; display_order: number }[]): Promise<void> {
    const promises = updates.map(u => this.itemRepo.update(u.id, { display_order: u.display_order }));
    await Promise.all(promises);
  }

  async deleteMenuItem(id: number): Promise<void> {
    const result = await this.itemRepo.update(id, { is_available: false });
    if (result.affected === 0) throw new NotFoundException('Menu item not found');
  }
}
