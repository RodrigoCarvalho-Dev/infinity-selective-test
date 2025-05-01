import { Controller, Get, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("user")
export class UserController {


    @Get("me")
    async health( @Res() res : Response ) : Promise<Response>  {
        return res.status(200).json({
            messege : "server is running",
            status : 200,
        })
    }

}