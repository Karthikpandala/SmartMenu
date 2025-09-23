import { Controller, Get, Post, Body } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll() {
    return this.restaurantsService.findAll();
  }

  @Post()
  create(@Body() data: any) {
    return this.restaurantsService.create(data);
  }
}
