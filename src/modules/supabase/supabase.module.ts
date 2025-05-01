import { Module, Global } from "@nestjs/common";
import { SUPABASE_CLIENT } from "./constants/supabase.constant";
import { SupabaseService } from "./services/supabase.service";


@Global()
@Module({
    providers : [ SupabaseService ],
    exports : [ SupabaseService ]
})
export class SupabaseModule {}