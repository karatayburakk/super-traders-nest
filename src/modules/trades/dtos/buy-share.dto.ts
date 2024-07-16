import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class BuyShareDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  symbol: string;

  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
