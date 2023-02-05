import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateMachineDto, UpdateMachineDto } from './dto';

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
          userId: machine.userId,
        },
      });
      const remarks = JSON.stringify(newMachine);
      await tx.machineHistory.create({
        data: { remarks: remarks, machineId: newMachine.id },
      });
      return newMachine;
    });
  }

  async fetchByAdminId(adminId: number) {
    const data = await this.prisma.machine.findMany({
      where: { adminId: adminId },
    });
    return data;
  }

  async update(machine: UpdateMachineDto) {
    return await this.prisma.$transaction(async (tx) => {
      const updatedMachine = await tx.machine.update({
        data: {
          symbol: machine.symbol,
          category: machine.category,
          name: machine.name,
          purchasedAt: machine.purchasedAt,
          usageStatus: machine.usageStatus,
          userId: machine.userId,
        },
        where: { id: machine.id },
      });

      const remarks = JSON.stringify(updatedMachine);
      await tx.machineHistory.create({
        data: { remarks: remarks, machineId: updatedMachine.id },
      });
      return updatedMachine;
    });
  }
}
