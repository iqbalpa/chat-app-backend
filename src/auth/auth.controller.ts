import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpRequestDto } from './dto/signup.dto';
import { User } from '@prisma/client';
import { SignInRequestDto } from './dto/sigin.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() dto: SignUpRequestDto): Promise<User> {
    return this.authService.signUp(dto);
  }

  @Post('signin')
  async signIn(
    @Body() dto: SignInRequestDto,
  ): Promise<{ access_token: string }> {
    console.log(dto);
    return this.authService.signIn(dto.email, dto.password);
  }
}
