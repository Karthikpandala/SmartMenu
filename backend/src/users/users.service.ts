import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async createUser(data: Partial<User>): Promise<User> {
    const exists = await this.userRepo.findOne({ where: { email: data.email } });
    if (exists) throw new BadRequestException('Email already exists');

    const hashed = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({ ...data, password: hashed });
    return this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepo.find({ relations: ['restaurant'] });
  }

  async updateUser(id: number, update: Partial<User>): Promise<User> {
    const user = await this.findById(id);
    if (update.password) {
      update.password = await bcrypt.hash(update.password, 10);
    }
    Object.assign(user, update);
    return this.userRepo.save(user);
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException('User not found');
  }
}
