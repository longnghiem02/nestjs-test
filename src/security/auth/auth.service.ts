import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/modules/account/model/account.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { ErrorMessage } from 'src/utils/constants/message.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async login(data: any): Promise<any> {
    const account = await this.accountRepository.findOneBy({
      email: data.email,
    });
    if (!account) {
      return HttpResponse(200, ErrorMessage.ACCOUNT_NOT_FOUND);
    }
    if (account?.password !== data.password) {
      return HttpResponse(200, ErrorMessage.WRONG_PASSWORD);
    } else {
      const payload = { id: account.id, role: account.role };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
  }
}
