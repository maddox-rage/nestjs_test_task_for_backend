import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { PrismaService } from 'src/prisma.service';
import { ColumnsModule } from 'src/column/column.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [ColumnsModule, AuthModule],
  controllers: [CardController],
  providers: [CardService, PrismaService],
  exports: [CardService],
})
export class CardModule {}
