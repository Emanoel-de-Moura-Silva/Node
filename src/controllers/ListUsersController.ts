import { Request, Response } from "express";
import { ListUsersService } from "../services/ListUsersService";


class ListUsersController{
async handle(request: Request, response: Response){
    const userService = new ListUsersService();

    const users = await userService.execute();

    return response.json(users);
}


}
export { ListUsersController }