import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { Module } from '@nestjs/common';
import { Account } from './model/account.model';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [TypeOrmModule.forFeature([Account])],
})
export class AccountModule {}
