import { Module } from '@nestjs/common';
import { PortfolioSharesRepository } from './portfolio-shares.repository';

@Module({
  providers: [PortfolioSharesRepository],
  exports: [PortfolioSharesRepository],
})
export class PortfolioSharesModule {}
