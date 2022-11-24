import { forwardRef, Module } from '@nestjs/common';
import { AdminModule } from '../admin/admin.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { PrismaService } from '../../prisma.service';
dotenv.config();

@Module({
  imports: [
    forwardRef(() => AdminModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: 60 * 30 },
    }),
    ConfigModule.forRoot(),
  ],
  providers: [AuthService, JwtStrategy, JwtAuthGuard, PrismaService],
  controllers: [AuthController],
  exports: [AuthService, JwtStrategy, JwtAuthGuard],
})
export class AuthModule {}
