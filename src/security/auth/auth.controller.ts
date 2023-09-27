import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from 'src/modules/account/dto/login.dto';
import { AuthGuard } from './auth.guard';
import { UpdateAccountDTO } from 'src/modules/account/dto/update-account.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDTO: LoginDTO) {
    return this.authService.login(loginDTO);
  }

  @UseGuards(AuthGuard)
  @Put('update-account')
  updateAccount(
    @Request() req: any,
    @Body() updateAccountDTO: UpdateAccountDTO,
  ) {
    return this.authService.handleUpdateAccount(req.account, updateAccountDTO);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return this.authService.handleGetProfile(req.account);
  }
}
