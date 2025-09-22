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
exports.MenuController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const common_2 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const menu_service_1 = require("./menu.service");
let MenuController = class MenuController {
    constructor(menuService) {
        this.menuService = menuService;
    }
    // Categories
    getCategories(restaurantId) {
        return this.menuService.getCategories(restaurantId);
    }
    createCategory(body) {
        return this.menuService.createCategory(body);
    }
    updateCategory(id, body) {
        return this.menuService.updateCategory(id, body);
    }
    deleteCategory(id) {
        return this.menuService.deleteCategory(id);
    }
    // Menu Items
    getMenuItems(restaurantId) {
        return this.menuService.getMenuItems(restaurantId);
    }
    getMenuItem(id) {
        return this.menuService.getMenuItem(id);
    }
    createMenuItem(body) {
        return this.menuService.createMenuItem(body);
    }
    updateMenuItem(id, body) {
        return this.menuService.updateMenuItem(id, body);
    }
    deleteMenuItem(id) {
        return this.menuService.deleteMenuItem(id);
    }
    toggleAvailability(id) {
        return this.menuService.toggleItemAvailability(id);
    }
    reorderItems(updates) {
        return this.menuService.updateMenuItemsOrder(updates);
    }
    // Image Upload
    async uploadImage(id, file) {
        if (!file)
            throw new common_1.BadRequestException('No image provided');
        const imageUrl = `/uploads/menu-images/${file.filename}`;
        const item = await this.menuService.updateItemImage(id, imageUrl);
        return { message: 'Image uploaded', imageUrl, item };
    }
};
exports.MenuController = MenuController;
__decorate([
    (0, common_1.Get)('categories'),
    __param(0, (0, common_1.Query)('restaurant_id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getCategories", null);
__decorate([
    (0, common_1.Post)('categories'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "createCategory", null);
__decorate([
    (0, common_1.Patch)('categories/:id'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "updateCategory", null);
__decorate([
    (0, common_1.Delete)('categories/:id'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "deleteCategory", null);
__decorate([
    (0, common_1.Get)('items'),
    __param(0, (0, common_1.Query)('restaurant_id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuItems", null);
__decorate([
    (0, common_1.Get)('items/:id'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "getMenuItem", null);
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "createMenuItem", null);
__decorate([
    (0, common_1.Patch)('items/:id'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "updateMenuItem", null);
__decorate([
    (0, common_1.Delete)('items/:id'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "deleteMenuItem", null);
__decorate([
    (0, common_1.Patch)('items/:id/toggle-availability'),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "toggleAvailability", null);
__decorate([
    (0, common_1.Patch)('items/reorder'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], MenuController.prototype, "reorderItems", null);
__decorate([
    (0, common_1.Post)('items/:id/upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('id', common_2.ParseIntPipe)),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], MenuController.prototype, "uploadImage", null);
exports.MenuController = MenuController = __decorate([
    (0, common_1.Controller)('menu'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [menu_service_1.MenuService])
], MenuController);
