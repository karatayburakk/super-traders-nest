import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PortfoliosService } from './portfolios.service';
import { JwtGuard } from '../../common/guards/jwt.guard';
import { CurrentUser } from '../../common/decorators/get-user.decorator';
import { CreatePortfolioDto } from './dtos/create-portfolio.dto';
import { Portfolio } from '@prisma/client';
import { UpdatePortfolioDto } from './dtos/update-portfolio.dto';

@UseGuards(JwtGuard)
@Controller('portfolios')
export class PortfoliosController {
  constructor(private readonly portfoliosService: PortfoliosService) {}

  @Post()
  createPortfolio(
    @CurrentUser('id') userId: number,
    @Body() createPortfolioDto: CreatePortfolioDto,
  ): Promise<Portfolio> {
    return this.portfoliosService.createPortfolio(userId, createPortfolioDto);
  }

  @Get()
  getUserPortfolioWithShares(
    @CurrentUser('id') userId: number,
  ): Promise<Portfolio> {
    return this.portfoliosService.getUserPortfolioWithShares(userId);
  }

  @Patch(':id')
  updatePortfolio(
    @CurrentUser('id') userId: number,
    @Param('id') id: number,
    @Body() updatePortfolioDto: UpdatePortfolioDto,
  ): Promise<Portfolio> {
    return this.portfoliosService.updatePortfolio(
      userId,
      id,
      updatePortfolioDto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deletePortfolio(
    @CurrentUser('id') userId: number,
    @Param('id') id: number,
  ): Promise<void> {
    return this.portfoliosService.deletePortfolio(userId, id);
  }
}
