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
} from '@nestjs/common';
import { SharesService } from './shares.service';
import { Share } from '@prisma/client';
import { CreateShareDto } from './dtos/create-share.dto';
import { UpdateShareDto } from './dtos/update-share.dto';

@Controller('shares')
export class SharesController {
  constructor(private readonly sharesService: SharesService) {}

  @Get()
  getAllShares(): Promise<Share[]> {
    return this.sharesService.getAllShares();
  }

  @Post()
  createShare(@Body() createShareDto: CreateShareDto): Promise<Share> {
    return this.sharesService.createShare(createShareDto);
  }

  @Patch(':id')
  updateShare(
    @Param('id') id: number,
    @Body() updateShareDto: UpdateShareDto,
  ): Promise<Share> {
    return this.sharesService.updateShare(id, updateShareDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteShare(@Param('id') id: number): Promise<void> {
    return this.sharesService.deleteShare(id);
  }
}
