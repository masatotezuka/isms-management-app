import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { MachineService } from './machine.service';
import { CreateMachineDto } from './dto';
@Controller('machine')
export class MachineController {
  constructor(private readonly machineService: MachineService) {}

  @Post(':adminId')
  async createMachine(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Body() createMachineDto: CreateMachineDto
  ) {
    console.log(typeof createMachineDto.userId);
    console.log('adminId' + adminId);
    const data = await this.machineService.create(createMachineDto, adminId);
    return data;
  }
}
