import { User } from "@supabase/supabase-js";

export interface AuthTokenResponseEmail {
    access_token : string;
    refresh_token : string;
    user : User 
}