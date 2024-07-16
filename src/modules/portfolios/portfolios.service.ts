import { Injectable } from '@nestjs/common';
import { PortfoliosRepository } from './portfolios.repository';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { Portfolio } from '@prisma/client';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';

@Injectable()
export class PortfoliosService {
  constructor(private readonly portfoliosRepository: PortfoliosRepository) {}

  createPortfolio(
    userId: number,
    createPortfolioDto: CreatePortfolioDto,
  ): Promise<Portfolio> {
    return this.portfoliosRepository.createPortfolio(
      userId,
      createPortfolioDto,
    );
  }

  getUserPortfolios(userId: number): Promise<Portfolio[]> {
    return this.portfoliosRepository.getUserPortfolios(userId);
  }

  updatePortfolio(
    userId: number,
    id: number,
    updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    return this.portfoliosRepository.updatePortfolio(
      userId,
      id,
      updatePortfolioDto,
    );
  }

  deletePortfolio(userId: number, id: number): Promise<void> {
    return this.portfoliosRepository.deletePortfolio(userId, id);
  }
}
