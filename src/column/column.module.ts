import { Module } from '@nestjs/common';
import { ColumnsService } from './column.service';
import { ColumnsController } from './column.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ColumnsController],
  providers: [ColumnsService, PrismaService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
