import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateShareDto {
  @IsOptional()
  @IsString()
  @Length(3, 3)
  symbol: string;

  @IsOptional()
  @IsNumber()
  latestPrice: number;
}
