import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { PortfolioShare } from '@prisma/client';

@Injectable()
export class PortfolioSharesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findPortfolioShare(
    shareId: number,
    portfolioId: number,
  ): Promise<PortfolioShare> {
    return this.prisma.portfolioShare.findUnique({
      where: { shareId_portfolioId: { shareId, portfolioId } },
    });
  }

  async incrementQuantityForPortfolioShare(
    shareId: number,
    portfolioId: number,
    quantity: number,
  ) {
    return this.prisma.portfolioShare.update({
      where: { shareId_portfolioId: { shareId, portfolioId } },
      data: { quantity: { increment: quantity } },
    });
  }

  async decrementQuantityForPortfolioShare(
    shareId: number,
    portfolioId: number,
    quantity: number,
  ) {
    return this.prisma.portfolioShare.update({
      where: {
        shareId_portfolioId: { shareId, portfolioId },
      },
      data: {
        quantity: { decrement: quantity },
      },
    });
  }

  async createPortfolioShare(
    shareId: number,
    portfolioId: number,
    quantity: number,
  ) {
    return this.prisma.portfolioShare.create({
      data: {
        portfolioId,
        shareId,
        quantity,
      },
    });
  }
}
