import { Injectable } from "@nestjs/common";
import { SUPABASE_CLIENT } from "src/modules/supabase/constants/supabase.constant";
import { Inject } from "@nestjs/common";
import { AuthTokenResponsePassword, SupabaseClient } from "@supabase/supabase-js";
import { AuthTokenResponseEmail } from "../@types/auth.types";
import { AuthUser } from "../decorators/auth.decorator";

@Injectable()
export class SupabaseAuthService {
    constructor(
        @Inject(SUPABASE_CLIENT) private readonly supabase : SupabaseClient
    ) {}

    async signInWithEmail( @AuthUser("email") email : string, @AuthUser("password") password : string ) : Promise< AuthTokenResponseEmail > {
        const { data, error } : AuthTokenResponsePassword = await this.supabase.auth.signInWithPassword({
            email : email,
            password : password
        })

        if ( error ) {
            throw new Error( error.message );
        }

        return {
            access_token : data.session.access_token,
            refresh_token : data.session.refresh_token,
            user : data.user
        };
    }
}