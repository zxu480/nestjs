import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
//   @Type(() => Number) // alternative with enableImplicitConversion: true, in main.ts
  @IsOptional()
  @IsPositive()
  limit: number;

//   @Type(() => Number)
  @IsOptional()
  @IsPositive()
  offset: number;
}
