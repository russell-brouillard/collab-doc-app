// backend/src/users/users.controller.ts

import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint to create a new user
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findOne(createUserDto.username);
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }
    return this.usersService.create(createUserDto.username, createUserDto.password);
  }

  // Additional endpoints can be added here
}
