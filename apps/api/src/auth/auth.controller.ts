import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body() credentialsDto: CredentialsDto
  ): Promise<{ accessToken: string; userId: number }> {
    return await this.authService.login(credentialsDto);
  }

  @Get('verification')
  @UseGuards(JwtAuthGuard)
  async verify() {
    return;
  }
}
