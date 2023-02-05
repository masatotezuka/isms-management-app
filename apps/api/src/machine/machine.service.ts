import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMachineDto } from './dto';

@Injectable()
export class MachineService {
  constructor(private prisma: PrismaService) {}
  async create(machine: CreateMachineDto, adminId: number) {
    const newMachine = await this.prisma.machine.create({
      data: {
        symbol: machine.symbol,
        category: machine.category,
        name: machine.name,
        purchasedAt: machine.purchasedAt,
        adminId: adminId,
        machineHistories: {
          create: { usageStatus: machine.usageStatus, userId: machine.userId },
        },
        userMachines: {
          create: { userId: machine.userId },
        },
      },
    });

    return newMachine;
  }
}
