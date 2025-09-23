// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userRepo.findOneBy({ email });
  }

  async getAllUsers() {
    return this.userRepo.find();
  }

  async findById(id: number) {
    return this.userRepo.findOneBy({ id });
  }

  async createUser(data: Partial<User>) {
    return this.userRepo.save(data);
  }

  async updateUser(id: number, data: Partial<User>) {
    await this.userRepo.update(id, data);
    return this.findById(id);
  }

  async deleteUser(id: number) {
    await this.userRepo.delete(id);
    return { deleted: true };
  }
}
