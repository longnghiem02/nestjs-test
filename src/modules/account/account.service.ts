import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './model/account.model';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import {
  CommonMessage,
  ErrorMessage,
} from 'src/utils/constants/message.constants';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  handleCreateAccount = async (data: any): Promise<HttpResponse> => {
    try {
      const checkEmail = await this.accountRepository.findOneBy({
        email: data.email,
      });
      if (checkEmail) {
        return HttpResponse(200, ErrorMessage.EMAIL_HAS_BEEN_USED);
      } else {
        await this.accountRepository.save({
          username: data.username,
          email: data.email,
          password: data.password,
        });
        return HttpResponse(201, CommonMessage.CREATE_ACCOUNT_SUCCCEED);
      }
    } catch (error) {
      return HttpResponse(500, error);
    }
  };

  getAllAccount() {
    return {
      message: 'Hello Long!',
    };
  }
}
