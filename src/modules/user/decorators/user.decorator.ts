import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// criando um decorator para atender as necessidades do retorno das informações do usuário;

interface UserPayload {

    id : string;
    full_name : string;
    username : string;
    followers : string[];
    following : string[]; 
        
}

const User = createParamDecorator
    < keyof UserPayload >
(
    ( data : string, ctx : ExecutionContext  ) => {

        const request = ctx.switchToHttp().getRequest();
        const user = request.user as UserPayload;
        return data ? user?.[data] : user;

    },
)

export { User }; 