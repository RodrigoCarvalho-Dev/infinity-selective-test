import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// criando decorator para atender a demanda de retornar os dados exatos da autenticação no método "signInWithEmail";

interface AuthUserPayload {
    email : string;
    password : string;
}

const AuthUser = createParamDecorator
    < keyof AuthUserPayload >
(
    ( data : string, ctx : ExecutionContext ) => {

        const request = ctx.switchToHttp().getRequest();
        const user : AuthUserPayload = request.user;
        return data ? user?.[data] : user;

    }
)

export { AuthUser };
