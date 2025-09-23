import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Restaurant } from './restaurants/entities/restaurant.entity';
import { Category } from './menu/entities/category.entity';
import { Item } from './menu/entities/item.entity';
import { Order } from './orders/entities/order.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // or 'mysql' / 'sqlite'
  host: 'localhost',
  port: 5432,        // change for your DB
  username: 'postgres', // change for your DB
  password: 'password', // change for your DB
  database: 'smartmenu', // your DB name
  synchronize: true,   // set to false in production
  logging: false,
  entities: [User, Restaurant, Category, Item, Order],
  migrations: [],
  subscribers: [],
});
