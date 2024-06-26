import {
  Controller,
  Get,
  Param,
  UseGuards,
  Request,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAllIds(): Promise<number[]> {
    return this.usersService.getAllIds();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getById(@Param('id') id: string): Promise<User | null> {
    return this.usersService.getById(id);
  }

  @UseGuards(AuthGuard)
  @Post('friends')
  async addFriend(@Request() request, @Body('friendId') friendId: number) {
    return this.usersService.addFriend(request, friendId);
  }
}
