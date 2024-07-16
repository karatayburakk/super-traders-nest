import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateShareDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 3)
  symbol: string;

  @IsNotEmpty()
  @IsNumber()
  latestPrice: number;
}
