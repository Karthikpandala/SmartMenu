"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const restaurant_entity_1 = require("./entities/restaurant.entity");
const user_entity_1 = require("../users/entities/user.entity");
let RestaurantsService = class RestaurantsService {
    constructor(restaurantRepo, userRepo) {
        this.restaurantRepo = restaurantRepo;
        this.userRepo = userRepo;
    }
    async createRestaurant(data) {
        // Optional: check unique subdomain
        if (data.subdomain) {
            const exists = await this.restaurantRepo.findOne({ where: { subdomain: data.subdomain } });
            if (exists)
                throw new common_1.BadRequestException('Subdomain already exists');
        }
        const restaurant = this.restaurantRepo.create(data);
        return this.restaurantRepo.save(restaurant);
    }
    async getAllRestaurants() {
        return this.restaurantRepo.find({ relations: ['users', 'categories', 'items', 'orders'] });
    }
    async getRestaurantById(id) {
        const restaurant = await this.restaurantRepo.findOne({ where: { id }, relations: ['users', 'categories', 'items', 'orders'] });
        if (!restaurant)
            throw new common_1.NotFoundException('Restaurant not found');
        return restaurant;
    }
    async updateRestaurant(id, update) {
        const restaurant = await this.getRestaurantById(id);
        Object.assign(restaurant, update);
        return this.restaurantRepo.save(restaurant);
    }
    async deleteRestaurant(id) {
        const restaurant = await this.getRestaurantById(id);
        restaurant.is_active = false;
        await this.restaurantRepo.save(restaurant);
    }
    async getRestaurantUsers(restaurantId) {
        return this.userRepo.find({ where: { restaurant_id: restaurantId } });
    }
    async assignOwner(restaurantId, ownerId) {
        const restaurant = await this.getRestaurantById(restaurantId);
        const user = await this.userRepo.findOne({ where: { id: ownerId } });
        if (!user)
            throw new common_1.NotFoundException('Owner user not found');
        restaurant.owner_id = ownerId;
        user.role = 'restaurant_admin';
        await this.userRepo.save(user);
        return this.restaurantRepo.save(restaurant);
    }
};
exports.RestaurantsService = RestaurantsService;
exports.RestaurantsService = RestaurantsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurant_entity_1.Restaurant)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], RestaurantsService);
