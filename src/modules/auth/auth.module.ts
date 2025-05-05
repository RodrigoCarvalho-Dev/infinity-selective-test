import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { SupabaseModule } from '../supabase/supabase.module';
import { PrismaModule } from '../prisma/prisma.module';
import { SupabaseAuthGuard } from './guards/supabase-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from '../prisma/services/prisma.service';

@Module({
  imports: [SupabaseModule, PrismaModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: SupabaseAuthGuard,
    },
    PrismaService,
  ],
  exports: [SupabaseModule, AuthService],
})
export class AuthModule {}
