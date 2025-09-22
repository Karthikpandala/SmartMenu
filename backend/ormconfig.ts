import { DataSource } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Restaurant } from './src/restaurants/entities/restaurant.entity';
import { Payment } from './src/payments/entities/payment.entity';
import { Order } from './src/orders/entities/order.entity';

export const AppDataSource = new DataSource({
  type: 'postgres', // or 'mysql', 'sqlite', etc.
  host: 'localhost',
  port: 5432,
  username: 'your_db_user',
  password: 'your_db_password',
  database: 'your_db_name',
  synchronize: true, // set to false in production
  logging: true,
  entities: [User, Restaurant, Payment, Order],
  migrations: ['src/migrations/*.ts'],
  subscribers: [],
});
