import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import prisma from 'src/utils/prisma/prisma';
import { CreateUserRequestDto } from './dto/create-user.dto';
import { PasswordHelper } from 'src/utils/hash/password-hash.helper';

@Injectable()
export class UsersService {
  async create(dto: CreateUserRequestDto): Promise<User> {
    const hashedPassword: string = await PasswordHelper.hash(dto.password);
    const user: User = await prisma.user.create({
      data: {
        ...dto,
        password: hashedPassword,
      },
    });
    user.password = '';
    return user;
  }

  async findOne(email: string): Promise<User | null> {
    const user: User | null = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }
}
