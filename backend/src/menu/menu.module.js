"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const menu_controller_1 = require("./menu.controller");
const menu_service_1 = require("./menu.service");
const category_entity_1 = require("./entities/category.entity");
const item_entity_1 = require("./entities/item.entity");
let MenuModule = class MenuModule {
};
exports.MenuModule = MenuModule;
exports.MenuModule = MenuModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([category_entity_1.Category, item_entity_1.Item]),
            platform_express_1.MulterModule.register({
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/menu-images',
                    filename: (req, file, cb) => {
                        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                        const ext = (0, path_1.extname)(file.originalname);
                        cb(null, `menu-${uniqueSuffix}${ext}`);
                    },
                }),
                fileFilter: (req, file, cb) => {
                    if (file.mimetype.match(/\/(jpg|jpeg|png|webp)$/)) {
                        cb(null, true);
                    }
                    else {
                        cb(new Error('Only image files are allowed!'), false);
                    }
                },
                limits: {
                    fileSize: 5 * 1024 * 1024, // 5MB
                },
            }),
        ],
        controllers: [menu_controller_1.MenuController],
        providers: [menu_service_1.MenuService],
        exports: [menu_service_1.MenuService],
    })
], MenuModule);
