import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { Restaurant } from '../restaurants/entities/restaurant.entity';
import { Category } from '../menu/entities/category.entity';
import { Item } from '../menu/entities/item.entity';
import { Order, OrderStatus } from '../orders/entities/order.entity';
import { Payment, PaymentStatus } from '../payments/entities/payment.entity';
import * as fs from 'fs';
import * as path from 'path';

// Connect to database
import { AppDataSource } from '../app-data-source';

async function seed() {
  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository(User);
  const restaurantRepo = AppDataSource.getRepository(Restaurant);
  const categoryRepo = AppDataSource.getRepository(Category);
  const itemRepo = AppDataSource.getRepository(Item);
  const orderRepo = AppDataSource.getRepository(Order);
  const paymentRepo = AppDataSource.getRepository(Payment);

  console.log('Seeding data...');

  // 1️⃣ Platform Admin
  const platformAdmin = userRepo.create({
    name: 'Platform Admin',
    email: 'admin@platform.com',
    password: await bcrypt.hash('Admin@123', 10),
    role: 'platform_admin',
  });
  await userRepo.save(platformAdmin);

  // 2️⃣ Sample Restaurants
  const restaurant1 = restaurantRepo.create({
    name: 'Spicy Indian',
    cuisine: 'Indian',
    contact_email: 'contact@spicyindian.com',
    contact_phone: '9999999991',
    upi_id: 'spicyindian@upi',
    settings: { open_time: '10:00', close_time: '22:00' },
  });

  const restaurant2 = restaurantRepo.create({
    name: 'Italiano Delight',
    cuisine: 'Italian',
    contact_email: 'contact@italianodelight.com',
    contact_phone: '9999999992',
    upi_id: 'italiano@upi',
    settings: { open_time: '11:00', close_time: '23:00' },
  });

  await restaurantRepo.save([restaurant1, restaurant2]);

  // 3️⃣ Restaurant Admins
  const r1Admin = userRepo.create({
    name: 'R1 Admin',
    email: 'r1admin@restaurant.com',
    password: await bcrypt.hash('R1Admin@123', 10),
    role: 'restaurant_admin',
    restaurant: restaurant1,
  });
  const r2Admin = userRepo.create({
    name: 'R2 Admin',
    email: 'r2admin@restaurant.com',
    password: await bcrypt.hash('R2Admin@123', 10),
    role: 'restaurant_admin',
    restaurant: restaurant2,
  });

  await userRepo.save([r1Admin, r2Admin]);

  // 4️⃣ Staff Users
  const staff1 = userRepo.create({
    name: 'R1 Staff',
    email: 'r1staff@restaurant.com',
    password: await bcrypt.hash('Staff@123', 10),
    role: 'staff',
    restaurant: restaurant1,
  });

  const staff2 = userRepo.create({
    name: 'R2 Staff',
    email: 'r2staff@restaurant.com',
    password: await bcrypt.hash('Staff@123', 10),
    role: 'staff',
    restaurant: restaurant2,
  });

  await userRepo.save([staff1, staff2]);

  // 5️⃣ Customers
  const customer = userRepo.create({
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: await bcrypt.hash('Customer@123', 10),
    role: 'customer',
  });

  await userRepo.save(customer);

  // 6️⃣ Menu Categories and Items
  const r1Category1 = categoryRepo.create({
    name: 'Starters',
    display_order: 1,
    restaurant: restaurant1,
  });
  const r1Category2 = categoryRepo.create({
    name: 'Main Course',
    display_order: 2,
    restaurant: restaurant1,
  });

  const r2Category1 = categoryRepo.create({
    name: 'Pizza',
    display_order: 1,
    restaurant: restaurant2,
  });

  await categoryRepo.save([r1Category1, r1Category2, r2Category1]);

  // Helper: Get sample images
  function getSampleImage(restaurantId: number, filename: string) {
    return `/uploads/menu-images/restaurant-${restaurantId}/${filename}`;
  }

  // Items
  const r1Item1 = itemRepo.create({
    name: 'Paneer Tikka',
    description: 'Grilled cottage cheese cubes',
    price: 250,
    image_url: getSampleImage(1, 'paneer_tikka.jpg'),
    is_available: true,
    category: r1Category1,
  });

  const r1Item2 = itemRepo.create({
    name: 'Butter Chicken',
    description: 'Classic butter chicken',
    price: 350,
    image_url: getSampleImage(1, 'butter_chicken.jpg'),
    is_available: true,
    category: r1Category2,
  });

  const r2Item1 = itemRepo.create({
    name: 'Margherita Pizza',
    description: 'Classic cheese pizza',
    price: 400,
    image_url: getSampleImage(2, 'margherita.jpg'),
    is_available: true,
    category: r2Category1,
  });

  await itemRepo.save([r1Item1, r1Item2, r2Item1]);

  // 7️⃣ Sample Orders
  const order1 = orderRepo.create({
    user: customer,
    restaurant: restaurant1,
    items: [r1Item1, r1Item2],
    status: OrderStatus.PENDING,
    total_amount: r1Item1.price + r1Item2.price,
  });

  const order2 = orderRepo.create({
    user: customer,
    restaurant: restaurant2,
    items: [r2Item1],
    status: OrderStatus.PREPARING,
    total_amount: r2Item1.price,
  });

  await orderRepo.save([order1, order2]);

  // 8️⃣ Sample Payments
  const payment1 = paymentRepo.create({
    order: order1,
    user: customer,
    amount: order1.total_amount,
    status: PaymentStatus.COMPLETED,
    upi_app: 'GPay',
  });

  const payment2 = paymentRepo.create({
    order: order2,
    user: customer,
    amount: order2.total_amount,
    status: PaymentStatus.PENDING,
    upi_app: 'PhonePe',
  });

  await paymentRepo.save([payment1, payment2]);

  console.log('Seeding completed successfully!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
