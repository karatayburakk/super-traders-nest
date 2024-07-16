import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { Share } from '@prisma/client';
import { CreateShareDto } from './dtos/create-share.dto';
import { UpdateShareDto } from './dtos/update-share.dto';

@Injectable()
export class SharesRepository {
  constructor(private readonly prisma: PrismaService) {}

  getAllShares(): Promise<Share[]> {
    return this.prisma.share.findMany();
  }

  createShare(createShareDto: CreateShareDto): Promise<Share> {
    return this.prisma.share.create({ data: createShareDto });
  }

  updateShare(id: number, updateShareDto: UpdateShareDto): Promise<Share> {
    return this.prisma.share.update({ where: { id }, data: updateShareDto });
  }

  async deleteShare(id: number): Promise<void> {
    await this.prisma.share.delete({ where: { id } });
  }

  async findUniqueBySymbol(symbol: string): Promise<Share> {
    return this.prisma.share.findUnique({ where: { symbol } });
  }
}
