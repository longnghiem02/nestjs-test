import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { jwtConfig } from 'src/configs/app.config';
import { WarningMessage } from 'src/utils/constants/message.constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log('hi');

    if (!token) {
      throw HttpResponse(200, WarningMessage.LOGIN);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secret,
      });
      request['account'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
