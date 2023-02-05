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
    this.machineService.create(createMachineDto, adminId);
  }
  @Get()
  async fetch() {
    console.log('test');
    return 'test';
  }
}
