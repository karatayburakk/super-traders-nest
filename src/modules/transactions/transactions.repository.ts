import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Transaction } from '@prisma/client';
import { CreateTransactionDto } from './dtos/create-transaction.dto';

@Injectable()
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createTransaction(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.prisma.transaction.create({
      data: {
        portfolio: { connect: { id: createTransactionDto.portfolioId } },
        share: { connect: { id: createTransactionDto.shareId } },
        transactionType: createTransactionDto.transactionType,
        price: createTransactionDto.price,
        quantity: createTransactionDto.quantity,
        transactionDate: new Date(),
      },
    });
  }
}
