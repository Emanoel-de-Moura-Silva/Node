import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories"


class ListUsersService {
async execute(){
    const userRepositories = getCustomRepository(UsersRepositories);

    const users = userRepositories.find();

    return users;

}

}

export{ ListUsersService }