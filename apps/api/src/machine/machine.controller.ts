import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto, UpdateMachineDto } from './dto';
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post(':adminId')
  async createMachine(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Body() createMachineDto: CreateMachineDto
  ) {
    const data = await this.machineService.create(createMachineDto, adminId);
    return data;
  }
  @Get(':adminId')
  async fetchByAdminId(@Param('adminId', ParseIntPipe) adminId: number) {
    const data = await this.machineService.fetchByAdminId(adminId);
    return data;
  }

  @Put()
  async update(@Body() updateMachine: UpdateMachineDto) {
    return await this.machineService.update(updateMachine);
  }
}
