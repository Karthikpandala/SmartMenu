import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './entities/restaurant.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(Restaurant) private restaurantRepo: Repository<Restaurant>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  async createRestaurant(data: Partial<Restaurant>): Promise<Restaurant> {
    // Optional: check unique subdomain
    if (data.subdomain) {
      const exists = await this.restaurantRepo.findOne({ where: { subdomain: data.subdomain } });
      if (exists) throw new BadRequestException('Subdomain already exists');
    }
    const restaurant = this.restaurantRepo.create(data);
    return this.restaurantRepo.save(restaurant);
  }

  async getAllRestaurants(): Promise<Restaurant[]> {
    return this.restaurantRepo.find({ relations: ['users', 'categories', 'items', 'orders'] });
  }

  async getRestaurantById(id: number): Promise<Restaurant> {
    const restaurant = await this.restaurantRepo.findOne({ where: { id }, relations: ['users', 'categories', 'items', 'orders'] });
    if (!restaurant) throw new NotFoundException('Restaurant not found');
    return restaurant;
  }

  async updateRestaurant(id: number, update: Partial<Restaurant>): Promise<Restaurant> {
    const restaurant = await this.getRestaurantById(id);
    Object.assign(restaurant, update);
    return this.restaurantRepo.save(restaurant);
  }

  async deleteRestaurant(id: number): Promise<void> {
    const restaurant = await this.getRestaurantById(id);
    restaurant.is_active = false;
    await this.restaurantRepo.save(restaurant);
  }

  async getRestaurantUsers(restaurantId: number): Promise<User[]> {
    return this.userRepo.find({ where: { restaurant_id: restaurantId } });
  }

  async assignOwner(restaurantId: number, ownerId: number): Promise<Restaurant> {
    const restaurant = await this.getRestaurantById(restaurantId);
    const user = await this.userRepo.findOne({ where: { id: ownerId } });
    if (!user) throw new NotFoundException('Owner user not found');

    restaurant.owner_id = ownerId;
    user.role = 'restaurant_admin';
    await this.userRepo.save(user);
    return this.restaurantRepo.save(restaurant);
  }
}
