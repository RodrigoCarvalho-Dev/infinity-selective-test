import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { User as UserTypeSupabase } from '@supabase/supabase-js';
import { Request } from 'express';

// criando um decorator para atender as necessidades do retorno das informações do usuário já autenticado;

const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserTypeSupabase => {
    const request: Request = ctx.switchToHttp().getRequest();
    const { ...user } = request.user;

    if (user === undefined)
      throw new UnauthorizedException({
        message: 'error on get user',
        status: 401,
      });

    return user;
  },
);

export { User };
