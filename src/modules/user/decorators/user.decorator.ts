import { createParamDecorator, ExecutionContext } from "@nestjs/common";

// criando um decorator para atender as necessidades do usuário

interface UserPayload {
    user : {

        // ainda para ser definido

        id : string;
        email : string;

    }
}

const User = createParamDecorator(
    ( data : unknown, ctx : ExecutionContext  ) => {

        const request : UserPayload = ctx.switchToHttp().getRequest();
        return request.user;

    }, // tipo unknown para qualquer tipo de dados a ser definidos, evitando any
)

export { User }; 