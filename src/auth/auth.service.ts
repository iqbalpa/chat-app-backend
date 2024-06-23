import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { SignUpRequestDto } from './dto/signup.dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(dto: SignUpRequestDto): Promise<User> {
    return this.usersService.create(dto);
  }
}
