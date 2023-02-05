import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMachineDto } from './dto';

@Injectable()
export class MachineService {
  constructor(private prisma: PrismaService) {}
  async create(machine: CreateMachineDto, adminId: number) {
    return await this.prisma.$transaction(async (tx) => {
      const newMachine = await tx.machine.create({
        data: {
          symbol: machine.symbol,
          category: machine.category,
          name: machine.name,
          usageStatus: machine.usageStatus,
          purchasedAt: machine.purchasedAt,
          adminId: adminId,
          userMachines: {
            create: { userId: machine.userId },
          },
        },
      });
      const remarks = JSON.stringify(newMachine);
      await tx.machineHistory.create({
        data: { remarks: remarks, machineId: newMachine.id },
      });
      return newMachine;
    });
  }
}
