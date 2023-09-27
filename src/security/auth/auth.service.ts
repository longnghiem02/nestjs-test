import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Account } from 'src/modules/account/model/account.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/utils/constants/message.constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    private jwtService: JwtService,
  ) {}

  async login(data: any): Promise<any> {
    try {
      const account = await this.accountRepository.findOneBy({
        email: data.email,
      });
      if (!account) {
        return HttpResponse(404, ErrorMessage.ACCOUNT_NOT_FOUND);
      }
      if (account?.password !== data.password) {
        return HttpResponse(200, ErrorMessage.WRONG_PASSWORD);
      } else {
        const payload = { id: account.id, role: account.role };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
    } catch (error) {
      throw HttpResponse(500, error);
    }
  }

  handleUpdateAccount = async (
    account: any,
    data: any,
  ): Promise<HttpResponse> => {
    const response = await this.accountRepository.findOneBy({
      id: account.id,
    });
    if (response) {
      await this.accountRepository.save({
        ...response,
        ...data,
        updatedAt: new Date(),
      });
      return HttpResponse(201, CommonMessage.UPDATE_ACCOUNT_SUCCCEED);
    }
  };

  handleGetProfile = async (account: any): Promise<HttpResponse> => {
    const response = await this.accountRepository.findOneBy({
      id: account.id,
    });
    return HttpResponse(201, 'Get profile', response);
  };
}
