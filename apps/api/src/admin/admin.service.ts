import {
  Injectable,
  HttpException,
  HttpStatus,
  forwardRef,
  Inject,
} from '@nestjs/common';
import { CreateAdminDto, VerifyPasswordDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { v4 as uuid } from 'uuid';
import { addHours } from 'date-fns';
// import { SendgridEmitter } from 'src/sendgrid/sendgrid.emitter';
// import { OnEvent } from '@nestjs/event-emitter';
// import { ResetPassword } from 'src/sendgrid/mails/resetPassword.mail';
import { User, Admin } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService // private sendgrid: SendgridEmitter
  ) {}

  async createAdmin(createAdminDto: CreateAdminDto) {
    const { firstName, lastName, email, password, adminName } = createAdminDto;

    if (!firstName || !lastName || !email || !password || !adminName)
      throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);

    const result = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if (result)
      throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);

    const salt = await bcrypt.genSalt();
    const hashPassword = bcrypt.hashSync(password, salt);
    await this.prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashPassword,
        isPasswordUpdated: true,
        role: 1,
        admin: { create: { name: adminName } },
      },
    });
    return this.authService.login({ email, password });
  }

  async findUser(email: string): Promise<
    | (User & {
        admin: Admin;
      })
    | undefined
  > {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
      include: { admin: true },
    });
    return user;
  }

  // async createVerificationToken(email: string) {
  //   if (!email)
  //     throw new HttpException('invalid value', HttpStatus.BAD_REQUEST);
  //   const user = await this.findUser(email);
  //   if (!user) throw new HttpException('not found user', HttpStatus.NOT_FOUND);
  //   const verificationTokenExpiredAt = addHours(new Date(), 1);

  //   await this.prisma.user.update({
  //     where: { email: email },
  //     data: {
  //       verificationToken: uuid(),
  //       verificationTokenExpiredAt: verificationTokenExpiredAt,
  //     },
  //   });
  //   //URLを定数に置き換える必要あり
  //   const verificationTokenUrl = `http://localhost:3000/password-reset/verification/${user.verificationToken}`;

  //   this.sendgrid.sendResetPassword(
  //     user.email,
  //     'tez.0731.mst@gmail.com',
  //     verificationTokenUrl
  //   );
  //   return;
  // }

  // @OnEvent(ResetPassword.type)
  // sendMail(msg: ResetPassword) {
  //   console.log('send');
  // }

  async verifyPassword({ token, newPassword }: VerifyPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { verificationToken: token },
    });

    if (!user) {
      throw new HttpException('not found user', HttpStatus.NOT_FOUND);
    }

    if (user.verificationTokenExpiredAt < new Date()) {
      throw new HttpException('not acceptable', HttpStatus.NOT_ACCEPTABLE);
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = bcrypt.hashSync(newPassword, salt);

    user.verificationToken = null;
    user.verificationTokenExpiredAt = null;
    user.password = hashPassword;
    await this.prisma.user.update({
      where: { verificationToken: token },
      data: {
        password: hashPassword,
        verificationToken: null,
        verificationTokenExpiredAt: null,
      },
    });
    return;
  }

  async fetchUser(): Promise<User[] | undefined> {
    const user = await this.prisma.user.findMany({
      where: { role: 2, deletedAt: null },
    });
    return user;
  }

  // async createUser({
  //   firstName,
  //   lastName,
  //   email,
  // }: CreateUserDto): Promise<User | undefined> {
  //   const result = await this.findUser(email);

  //   if (result) {
  //     throw new HttpException('user already exists', HttpStatus.BAD_REQUEST);
  //   }

  //   const salt = await bcrypt.genSalt();
  //   const hashPassword = bcrypt.hashSync(email, salt);
  //   const newUser = this.prisma.user.create({
  //     data: {
  //       firstName: firstName,
  //       lastName: lastName,
  //       email: email,
  //       password: hashPassword,
  //       isPasswordUpdated: false,
  //       role: 2,
  //     },
  //   });
  //   return newUser;
  // }
}
