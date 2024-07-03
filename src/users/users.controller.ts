import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Body,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllPagination(
    @Query('skip', ParseIntPipe) skip: number,
  ): Promise<User[]> {
    return this.usersService.getAllPagination(skip, 9);
  }

  @Get()
  async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get('/count')
  async getUsersCount(): Promise<number> {
    return this.usersService.getUsersCount();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateUser(
    @Request() request,
    @Body('name') name: string,
  ): Promise<User> {
    return this.usersService.updateUser(request, name);
  }

  @UseGuards(AuthGuard)
  @Delete()
  async deleteUser(@Request() request): Promise<User> {
    return this.usersService.deleteUser(request);
  }
}
