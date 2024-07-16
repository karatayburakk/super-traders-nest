import { Module } from '@nestjs/common';
import { TradesController } from './trades.controller';
import { TradesService } from './trades.service';
import { SharesModule } from '../shares/shares.module';
import { PortfoliosModule } from '../portfolios/portfolios.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { PortfolioSharesModule } from '../portfolio-shares/portfolio-shares.module';

@Module({
  imports: [
    SharesModule,
    PortfoliosModule,
    TransactionsModule,
    PortfolioSharesModule,
  ],
  controllers: [TradesController],
  providers: [TradesService],
})
export class TradesModule {}
