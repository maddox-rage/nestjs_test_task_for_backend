import { Module } from '@nestjs/common';
import { ColumnsService } from './column.service';
import { ColumnsController } from './column.controller';
import { PrismaService } from 'src/prisma.service';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [ColumnsController],
  providers: [ColumnsService, PrismaService],
  exports: [ColumnsService],
})
export class ColumnsModule {}
