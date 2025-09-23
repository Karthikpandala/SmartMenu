import { Injectable } from '@nestjs/common';

@Injectable()
export class RestaurantsService {
  private restaurants: any[] = [];
  private idCounter = 1;

  create(data: any) {
    const restaurant = { id: this.idCounter++, ...data };
    this.restaurants.push(restaurant);
    return restaurant;
  }

  findAll() {
    return this.restaurants;
  }
}

