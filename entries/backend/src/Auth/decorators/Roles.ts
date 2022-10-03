import { CustomDecorator, SetMetadata } from '@nestjs/common';
import { Schemas } from '@fuks-ru/auth-backend';

export const Roles = (
  ...roles: Array<Schemas.UserVerifyResponse['role']>
): CustomDecorator<string> => SetMetadata('roles', roles);
