import { Injectable } from '@nestjs/common';
import { SharesRepository } from './shares.repository';
import { Share } from '@prisma/client';
import { CreateShareDto } from './dtos/create-share.dto';
import { UpdateShareDto } from './dtos/update-share.dto';

@Injectable()
export class SharesService {
  constructor(private readonly sharesRepository: SharesRepository) {}

  getAllShares(): Promise<Share[]> {
    return this.sharesRepository.getAllShares();
  }

  createShare(createShareDto: CreateShareDto): Promise<Share> {
    return this.sharesRepository.createShare(createShareDto);
  }

  updateShare(id: number, updateShareDto: UpdateShareDto): Promise<Share> {
    return this.sharesRepository.updateShare(id, updateShareDto);
  }

  deleteShare(id: number): Promise<void> {
    return this.sharesRepository.deleteShare(id);
  }
}
