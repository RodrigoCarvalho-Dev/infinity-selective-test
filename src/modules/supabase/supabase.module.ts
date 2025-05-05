import { Module, Global } from '@nestjs/common';
import { SupabaseService } from './services/supabase.service';

@Global()
@Module({
  controllers: [],
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}
