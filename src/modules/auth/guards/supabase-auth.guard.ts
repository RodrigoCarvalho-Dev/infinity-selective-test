import {
  ExecutionContext,
  CanActivate,
  UnauthorizedException,
  Logger,
  Injectable,
} from '@nestjs/common';
import { IS_PUBLIC_KEY } from 'src/commun/decorators/public.decorator';
import { Reflector } from '@nestjs/core';
import { SupabaseService } from 'src/modules/supabase/services/supabase.service';
import { Request } from 'express';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly logger = new Logger(SupabaseAuthGuard.name);

  constructor(
    private reflector: Reflector,
    private supabaseService: SupabaseService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractToken(request);

    if (!token) {
      this.logger.warn('Access token not found');
      throw new UnauthorizedException('Access token not found');
    }

    try {
      const { data, error } = await this.supabaseService
        .getSupabaseClient()
        .auth.getUser(token);

      if (error || data?.user === null) {
        this.logger.warn('invalid token on SupabaseAuthService');
        throw new UnauthorizedException('invalid token on SupabaseAuthService');
      }

      request.user = data.user;
      return true;
    } catch (error) {
      this.logger.error(`Authentication error : ${error}`);
      throw new UnauthorizedException('Authentication failed');
    }
  }

  private extractToken(request: Request): string | null {
    // podemos extrair do header para uma melhor autenticação
    // const [type, token] = request.headers.authorization?.split(" ") ?? [];
    // return type === 'Bearer' ? token : undefined;

    const token: string = request.cookies?.['access-token'];

    return token ?? null;
  }
}
