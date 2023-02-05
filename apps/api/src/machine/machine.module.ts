import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MachineController } from './machine.controller';
import { MachineService } from './machine.service';

@Module({
  controllers: [MachineController],
  providers: [MachineService, PrismaService],
})
export class MachineModule {}
