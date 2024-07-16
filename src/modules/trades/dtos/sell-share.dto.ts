import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SellShareDto {
  @IsNotEmpty()
  @IsString()
  symbol: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
