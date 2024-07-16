import { Module } from '@nestjs/common';
import { SharesController } from './shares.controller';
import { SharesService } from './shares.service';
import { SharesRepository } from './shares.repository';

@Module({
  controllers: [SharesController],
  providers: [SharesService, SharesRepository],
  exports: [SharesRepository],
})
export class SharesModule {}
