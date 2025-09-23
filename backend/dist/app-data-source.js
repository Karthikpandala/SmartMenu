"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./users/entities/user.entity");
const restaurant_entity_1 = require("./restaurants/entities/restaurant.entity");
const category_entity_1 = require("./menu/entities/category.entity");
const item_entity_1 = require("./menu/entities/item.entity");
const order_entity_1 = require("./orders/entities/order.entity");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'postgres', // or 'mysql' / 'sqlite'
    host: 'localhost',
    port: 5432, // change for your DB
    username: 'postgres', // change for your DB
    password: 'password', // change for your DB
    database: 'smartmenu', // your DB name
    synchronize: true, // set to false in production
    logging: false,
    entities: [user_entity_1.User, restaurant_entity_1.Restaurant, category_entity_1.Category, item_entity_1.Item, order_entity_1.Order],
    migrations: [],
    subscribers: [],
});
