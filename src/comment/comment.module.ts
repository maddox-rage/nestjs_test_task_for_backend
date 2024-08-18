import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { CardModule } from 'src/card/card.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [CardModule],
  controllers: [CommentController],
  providers: [CommentService, PrismaService],
})
export class CommentModule {}
