import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { MachineModule } from './machine/machine.module';

@Module({
  imports: [AuthModule, AdminModule, MachineModule],
})
export class AppModule {}
