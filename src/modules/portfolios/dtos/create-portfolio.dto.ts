import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePortfolioDto {
  @IsNotEmpty()
  @IsString()
  portfolioName: string;
}
