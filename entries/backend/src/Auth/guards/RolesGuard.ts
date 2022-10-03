import { SystemErrorFactory } from '@fuks-ru/common-backend';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { CommonErrorCode } from '@fuks-ru/common';
import { Schemas } from '@fuks-ru/auth-backend';

@Injectable()
export class RolesGuard implements CanActivate {
  public constructor(
    private readonly reflector: Reflector,
    private readonly systemErrorFactory: SystemErrorFactory,
  ) {}

  public canActivate(context: ExecutionContext): boolean {
    const contextHandler = context.getHandler();
    const contextClass = context.getClass();

    const requiredRoles = this.reflector.get<
      Array<Schemas.UserVerifyResponse['role']> | undefined
    >('roles', contextHandler);

    console.log(requiredRoles);

    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      contextHandler,
      contextClass,
    ]);

    if (!requiredRoles || isPublic) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest<{
      user?: Schemas.UserVerifyResponse;
    }>();

    if (user?.role === undefined || !requiredRoles.includes(user.role)) {
      throw this.systemErrorFactory.create(
        CommonErrorCode.FORBIDDEN,
        'Нет прав',
      );
    }

    return true;
  }
}
