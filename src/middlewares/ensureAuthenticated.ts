import {Request, Response, NextFunction} from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function ensureAuthenticated(
request: Request,
response: Response,
next: NextFunction
    ){
        //Receber o token
        
        const authtoken = request.headers.authorization

        //Validar se o token esta preenchido
        if(!authtoken){
            return response.status(401).end();
        }

        const [,token] = authtoken.split(" ");

        //Validar o token
        try{
        const {sub} = verify(token, "595cd113f4ccaad79f9cca5b6f34e6e1") as Payload;
        //Recuperar informações do usuarios
        request.user_id = sub;

        return next();
        } catch(err){
            return response.status(401).end();
        }
        
    }