import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../common/prisma/prisma.module';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { PortfoliosModule } from '../portfolios/portfolios.module';
import { SharesModule } from '../shares/shares.module';
import { TradesModule } from '../trades/trades.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UsersModule,
    AuthModule,
    PortfoliosModule,
    SharesModule,
    TradesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
