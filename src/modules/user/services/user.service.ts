import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {

    private listUsers : string[] = [];

    public addUser( name : string ) : void {
        this.listUsers.push( name );
    }

    public getAllUsers() : string[] {
        return this.listUsers;
    }

}
