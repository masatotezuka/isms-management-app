import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AdminService } from '../admin/admin.service';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => AdminService))
    private adminService: AdminService,
    private jwtService: JwtService
  ) {}
  async validateUser(email: string, password: string) {
    const user = await this.adminService.findUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(
    credentialsDto: CredentialsDto
  ): Promise<{ accessToken: string; userId: number }> {
    const { email, password } = credentialsDto;

    const user = await this.adminService.findUser(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const payload = {
        id: user.admin.id,
        username: user.firstName + user.lastName,
      };
      const accessToken = this.jwtService.sign(payload);
      const userId = payload.id;
      return { accessToken, userId };
    }
    throw new UnauthorizedException();
  }
}
