import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateMachineDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @IsNotEmpty()
  @IsString()
  readonly symbol: string;

  @IsNotEmpty()
  @IsString()
  readonly category: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @Type(() => Date)
  @IsOptional()
  readonly purchasedAt: Date;

  @IsNotEmpty()
  readonly usageStatus: string;

  @Type(() => Number)
  @IsOptional()
  @IsNumber()
  readonly userId: number;
}
