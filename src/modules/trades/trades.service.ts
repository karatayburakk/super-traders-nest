import { BadRequestException, Injectable } from '@nestjs/common';
import { BuyShareDto } from './dtos/buy-share.dto';
import { SharesRepository } from '../shares/shares.repository';
import { PortfoliosRepository } from '../portfolios/portfolios.repository';
import { PortfolioShare, TransactionType } from '@prisma/client';
import { TransactionsRepository } from '../transactions/transactions.repository';
import { PortfolioSharesRepository } from '../portfolio-shares/portfolio-shares.repository';
import { SellShareDto } from './dtos/sell-share.dto';

@Injectable()
export class TradesService {
  constructor(
    private readonly sharesRepository: SharesRepository,
    private readonly portfoliosRepository: PortfoliosRepository,
    private readonly transactionsRepository: TransactionsRepository,
    private readonly portfolioSharesRepository: PortfolioSharesRepository,
  ) {}

  async buyShare(
    userId: number,
    buyShareDto: BuyShareDto,
  ): Promise<PortfolioShare> {
    const { symbol, quantity } = buyShareDto;

    const share = await this.sharesRepository.findUniqueBySymbol(symbol);

    if (!share) throw new BadRequestException('Share does not exist!');

    const portfolio = await this.portfoliosRepository.getUserPortfolio(userId);

    if (!portfolio)
      throw new BadRequestException(
        'Portfolio does not exists for user, please create portfolio.',
      );

    const transactionData = {
      portfolioId: portfolio.id,
      shareId: share.id,
      transactionType: TransactionType.BUY,
      price: share.latestPrice,
      quantity: quantity,
    };

    await this.transactionsRepository.createTransaction(transactionData);

    const portfolioShare =
      await this.portfolioSharesRepository.findPortfolioShare(
        share.id,
        portfolio.id,
      );

    if (portfolioShare) {
      return this.portfolioSharesRepository.incrementQuantityForPortfolioShare(
        share.id,
        portfolio.id,
        quantity,
      );
    } else {
      return this.portfolioSharesRepository.createPortfolioShare(
        share.id,
        portfolio.id,
        quantity,
      );
    }
  }

  async sellShare(
    userId: number,
    sellShareDto: SellShareDto,
  ): Promise<PortfolioShare> {
    const { symbol, quantity } = sellShareDto;

    const share = await this.sharesRepository.findUniqueBySymbol(symbol);

    if (!share) throw new BadRequestException('Share does not exist!');

    const portfolio = await this.portfoliosRepository.getUserPortfolio(userId);

    if (!portfolio)
      throw new BadRequestException(
        'Portfolio does not exists for user, please create portfolio.',
      );

    const portfolioShare =
      await this.portfolioSharesRepository.findPortfolioShare(
        share.id,
        portfolio.id,
      );

    if (!portfolioShare || portfolioShare.quantity < quantity) {
      throw new BadRequestException('Not enough shares to sell');
    }

    const transactionData = {
      portfolioId: portfolio.id,
      shareId: share.id,
      transactionType: TransactionType.SELL,
      price: share.latestPrice,
      quantity: quantity,
    };

    await this.transactionsRepository.createTransaction(transactionData);

    return this.portfolioSharesRepository.decrementQuantityForPortfolioShare(
      share.id,
      portfolio.id,
      quantity,
    );
  }
}
