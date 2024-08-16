import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ColumnsModule } from './column/column.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [UserModule, AuthModule, ColumnsModule, CardModule],
})
export class AppModule {}
