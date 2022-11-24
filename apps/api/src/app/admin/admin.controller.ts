import { Body, Controller, Post, Patch, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateAdminDto, VerifyPasswordDto } from './dto';
import { AdminService } from './admin.service';
import { User } from '@prisma/client';
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Post()
  async createAdmin(
    @Body() createAdminDto: CreateAdminDto
  ): Promise<{ accessToken: string }> {
    return await this.adminService.createAdmin(createAdminDto);
  }

  //あとで修正
  // @Put('password-reset/request')
  // async resetPassword(@Body() data: { email: string }): Promise<void> {
  //   return await this.adminService.createVerificationToken(data.email);
  // }

  @Patch('password-reset/verification')
  async verifyPassword(
    @Body() verifyPasswordDto: VerifyPasswordDto
  ): Promise<void> {
    return await this.adminService.verifyPassword(verifyPasswordDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async fetchUser(): Promise<User[]> {
    return this.adminService.fetchUser();
  }
}
