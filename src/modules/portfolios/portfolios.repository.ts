import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { Portfolio } from '@prisma/client';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';

@Injectable()
export class PortfoliosRepository {
  constructor(private readonly prisma: PrismaService) {}

  createPortfolio(
    userId: number,
    createPortfolioDto: CreatePortfolioDto,
  ): Promise<Portfolio> {
    return this.prisma.portfolio.create({
      data: { userId, ...createPortfolioDto },
    });
  }

  getUserPortfolioWithShares(userId: number): Promise<Portfolio> {
    return this.prisma.portfolio.findUnique({
      where: { userId },
      include: { portfolioShares: true },
    });
  }

  updatePortfolio(
    userId: number,
    id: number,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    return this.prisma.portfolio.update({
      where: { userId, id },
      data: updatePortfolioDto,
    });
  }

  async deletePortfolio(userId: number, id: number): Promise<void> {
    await this.prisma.portfolio.delete({ where: { userId, id } });
  }

  getUserPortfolio(userId: number): Promise<Portfolio> {
    return this.prisma.portfolio.findUnique({ where: { userId } });
  }
}
