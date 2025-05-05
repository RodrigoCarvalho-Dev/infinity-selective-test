import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { SupabaseService } from '../supabase/services/supabase.service';
import { SupabaseAuthGuard } from '../auth/guards/supabase-auth.guard';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/services/prisma.service';
import { UserService } from './services/user.service';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService, SupabaseService, SupabaseAuthGuard, PrismaService],
})
export class UserModule {}
