import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TradesService } from './trades.service';
import { CurrentUser } from '../../common/decorators/get-user.decorator';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { BuyShareDto } from './dtos/buy-share.dto';
import { SellShareDto } from './dtos/sell-share.dto';
import { PortfolioShare } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('trades')
export class TradesController {
  constructor(private readonly tradesService: TradesService) {}

  @Post('buy')
  buyShare(
    @CurrentUser('id') userId: number,
    @Body() buyShareDto: BuyShareDto,
  ): Promise<PortfolioShare> {
    return this.tradesService.buyShare(userId, buyShareDto);
  }

  @Post('sell')
  sellShare(
    @CurrentUser('id') userId: number,
    @Body() sellShareDto: SellShareDto,
  ) {
    return this.tradesService.sellShare(userId, sellShareDto);
  }
}
