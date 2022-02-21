import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../repositories/UsersRepositories";
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"


interface IAuthenticateRequest {
    email: string;
    password: string;
}

class AuthenticateUserService{
async execute({email, password}: IAuthenticateRequest){
const userRepositories = getCustomRepository(UsersRepositories); 
    //Verificar se email existe

    const userExist = await userRepositories.findOne({email})

if(!userExist){
    throw new Error("Email/Password Incorrect")
    
}
//Verificar se senha esta correta
const PasswordMatch = await compare(password, userExist.password)

if(!PasswordMatch){
    throw new Error("Email/Senha Incorrect")
}
//Gerar o token
const token = sign({
    email: userExist.email
},
 "595cd113f4ccaad79f9cca5b6f34e6e1",
  {
    subject: userExist.id,
    expiresIn: "1d"
})

return token;

}
}
export {AuthenticateUserService}