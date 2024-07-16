import { IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { TransactionType } from '@prisma/client';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  portfolioId: number;

  @IsNotEmpty()
  @IsNumber()
  shareId: number;

  @IsNotEmpty()
  @IsEnum(TransactionType)
  transactionType: TransactionType;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
