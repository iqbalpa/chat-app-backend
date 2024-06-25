import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllIds(): Promise<number[]> {
    return this.usersService.getAllIds();
  }

  @Get(":id")
  async getById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getById(id)
  }
}
