import { Injectable } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService {
    private supabase : SupabaseClient;

    constructor() {
        this.supabase = createClient( 
            String(process.env.SUPABASE_URL),
            String(process.env.SUPABASE_ANON_KEY)
        )
    }

    public getSupabaseClient() : SupabaseClient {
        return this.supabase;
    }


}