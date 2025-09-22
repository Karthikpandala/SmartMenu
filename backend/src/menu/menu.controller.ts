import {
  Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, UseInterceptors, UploadedFile, BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MenuService } from './menu.service';

@Controller('menu')
@UseGuards(JwtAuthGuard)
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // Categories
  @Get('categories')
  getCategories(@Query('restaurant_id', ParseIntPipe) restaurantId: number) {
    return this.menuService.getCategories(restaurantId);
  }

  @Post('categories')
  createCategory(@Body() body: any) {
    return this.menuService.createCategory(body);
  }

  @Patch('categories/:id')
  updateCategory(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.menuService.updateCategory(id, body);
  }

  @Delete('categories/:id')
  deleteCategory(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.deleteCategory(id);
  }

  // Menu Items
  @Get('items')
  getMenuItems(@Query('restaurant_id', ParseIntPipe) restaurantId: number) {
    return this.menuService.getMenuItems(restaurantId);
  }

  @Get('items/:id')
  getMenuItem(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.getMenuItem(id);
  }

  @Post('items')
  createMenuItem(@Body() body: any) {
    return this.menuService.createMenuItem(body);
  }

  @Patch('items/:id')
  updateMenuItem(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
    return this.menuService.updateMenuItem(id, body);
  }

  @Delete('items/:id')
  deleteMenuItem(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.deleteMenuItem(id);
  }

  @Patch('items/:id/toggle-availability')
  toggleAvailability(@Param('id', ParseIntPipe) id: number) {
    return this.menuService.toggleItemAvailability(id);
  }

  @Patch('items/reorder')
  reorderItems(@Body() updates: { id: number; display_order: number }[]) {
    return this.menuService.updateMenuItemsOrder(updates);
  }

  // Image Upload
  @Post('items/:id/upload-image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No image provided');

    const imageUrl = `/uploads/menu-images/${file.filename}`;
    const item = await this.menuService.updateItemImage(id, imageUrl);
    return { message: 'Image uploaded', imageUrl, item };
  }
}
