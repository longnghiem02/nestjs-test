import { Controller, Get, Post, Body } from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountDTO } from './dto/create-account.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/utils/constants/role.constants';

@Controller('api')
export class AccountController {
  constructor(private accountService: AccountService) {}

  @Post('create-account')
  createAccount(@Body() createAccountDTO: CreateAccountDTO) {
    return this.accountService.handleCreateAccount(createAccountDTO);
  }

  @Get('info')
  @Roles(Role.MEMBER)
  getAllAccount() {
    return this.accountService.getAllAccount();
  }
}
