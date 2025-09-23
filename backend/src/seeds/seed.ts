import { AppDataSource } from '../app-data-source';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { Category } from '../menu/entities/category.entity';
import { Item } from '../menu/entities/item.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const categoryRepo = AppDataSource.getRepository(Category);
  const itemRepo = AppDataSource.getRepository(Item);
  const orderRepo = AppDataSource.getRepository(Order);

  const now = new Date();

  // Users
  const user1 = userRepo.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: await bcrypt.hash('Customer@123', 10),
    created_at: now,
    updated_at: now,
  });

  await userRepo.save(user1);

  // Restaurants
  const restaurant1 = restaurantRepo.create({
    name: 'Spicy Indian',
    contact_email: 'contact@spicyindian.com',
    contact_phone: '9999999991',
    created_at: now,
    updated_at: now,
  });

  await restaurantRepo.save(restaurant1);

  // Categories
  const category1 = categoryRepo.create({
    name: 'Starters',
    display_order: 1,
    created_at: now,
    updated_at: now,
  });

  await categoryRepo.save(category1);

  // Items
  const item1 = itemRepo.create({
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes',
    price: 250,
    is_available: true,
    category: category1,
    created_at: now,
    updated_at: now,
  });

  await itemRepo.save(item1);

  // Orders
  const order1 = orderRepo.create({
    status: OrderStatus.PENDING,
    total_amount: item1.price,
    items: [item1],
    created_at: now,
    updated_at: now,
  });

  await orderRepo.save(order1);

  console.log('Seeding completed successfully!');
  process.exit(0);
}

seed().catch(err => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
