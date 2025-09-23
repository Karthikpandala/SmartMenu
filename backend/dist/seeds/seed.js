"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_data_source_1 = require("../app-data-source");
const bcrypt = require("bcrypt");
const user_entity_1 = require("../users/entities/user.entity");
const restaurant_entity_1 = require("../restaurants/entities/restaurant.entity");
const category_entity_1 = require("../menu/entities/category.entity");
const item_entity_1 = require("../menu/entities/item.entity");
const order_entity_1 = require("../orders/entities/order.entity");
async function seed() {
    await app_data_source_1.AppDataSource.initialize();
    const userRepo = app_data_source_1.AppDataSource.getRepository(user_entity_1.User);
    const restaurantRepo = app_data_source_1.AppDataSource.getRepository(restaurant_entity_1.Restaurant);
    const categoryRepo = app_data_source_1.AppDataSource.getRepository(category_entity_1.Category);
    const itemRepo = app_data_source_1.AppDataSource.getRepository(item_entity_1.Item);
    const orderRepo = app_data_source_1.AppDataSource.getRepository(order_entity_1.Order);
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
        status: order_entity_1.OrderStatus.PENDING,
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
