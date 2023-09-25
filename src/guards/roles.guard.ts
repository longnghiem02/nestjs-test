import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { HttpResponse } from 'src/configs/HttpResponse.config';
import { jwtConfig } from 'src/configs/app.config';
import { ROLES_KEY } from 'src/decorators/roles.decorator';
import { WarningMessage } from 'src/utils/constants/message.constants';
import { Role } from 'src/utils/constants/role.constants';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw HttpResponse(200, WarningMessage.LOGIN);
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConfig.secret,
      });
      request['account'] = payload;
      if (request.account.role === Role.ADMIN) {
        return true;
      } else {
        return requiredRoles.some(
          (role) => request.account.role?.includes(role),
        );
      }
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
