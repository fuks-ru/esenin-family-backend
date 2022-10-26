import { Context } from 'telegraf';
import { Schemas } from '@fuks-ru/auth-module';

export interface IContext extends Context {
  user?: Schemas.UserVerifyResponse;
}
