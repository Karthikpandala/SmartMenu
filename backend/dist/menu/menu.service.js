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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const category_entity_1 = require("./entities/category.entity");
const item_entity_1 = require("./entities/item.entity");
let MenuService = class MenuService {
    constructor(categoryRepo, itemRepo) {
        this.categoryRepo = categoryRepo;
        this.itemRepo = itemRepo;
    }
    // Category CRUD
    async getCategories(restaurantId) {
        return this.categoryRepo.find({
            where: { restaurant_id: restaurantId, is_active: true },
            relations: ['items'],
            order: { display_order: 'ASC' },
        });
    }
    async createCategory(data) {
        const category = this.categoryRepo.create(data);
        return this.categoryRepo.save(category);
    }
    async updateCategory(id, data) {
        const category = await this.categoryRepo.findOne({ where: { id } });
        if (!category)
            throw new common_1.NotFoundException('Category not found');
        Object.assign(category, data);
        return this.categoryRepo.save(category);
    }
    async deleteCategory(id) {
        const result = await this.categoryRepo.update(id, { is_active: false });
        if (result.affected === 0)
            throw new common_1.NotFoundException('Category not found');
    }
    // Menu Item CRUD
    async getMenuItems(restaurantId) {
        return this.itemRepo
            .createQueryBuilder('item')
            .leftJoinAndSelect('item.category', 'category')
            .where('category.restaurant_id = :restaurantId', { restaurantId })
            .andWhere('item.is_available = :available', { available: true })
            .orderBy('category.display_order', 'ASC')
            .addOrderBy('item.created_at', 'ASC')
            .getMany();
    }
    async getMenuItem(id) {
        const item = await this.itemRepo.findOne({ where: { id }, relations: ['category'] });
        if (!item)
            throw new common_1.NotFoundException('Menu item not found');
        return item;
    }
    async createMenuItem(data) {
        const item = this.itemRepo.create(data);
        return this.itemRepo.save(item);
    }
    async updateMenuItem(id, data) {
        const item = await this.getMenuItem(id);
        Object.assign(item, data);
        return this.itemRepo.save(item);
    }
    async updateItemImage(id, imageUrl) {
        const item = await this.getMenuItem(id);
        item.image_url = imageUrl;
        return this.itemRepo.save(item);
    }
    async toggleItemAvailability(id) {
        const item = await this.getMenuItem(id);
        item.is_available = !item.is_available;
        return this.itemRepo.save(item);
    }
    async updateMenuItemsOrder(updates) {
        const promises = updates.map(u => this.itemRepo.update(u.id, { display_order: u.display_order }));
        await Promise.all(promises);
    }
    async deleteMenuItem(id) {
        const result = await this.itemRepo.update(id, { is_available: false });
        if (result.affected === 0)
            throw new common_1.NotFoundException('Menu item not found');
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(category_entity_1.Category)),
    __param(1, (0, typeorm_1.InjectRepository)(item_entity_1.Item)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MenuService);
