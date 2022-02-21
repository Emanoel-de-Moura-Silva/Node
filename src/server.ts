import "reflect-metadata";
import express, { NextFunction, Response, Request } from 'express';
import "express-async-errors";
import "./database";
import { router } from "./routes";
import cors from "cors"
/** 
//tipos de parametros 
* Routes Params => http://localhost:3000/produto/6764648465
* Query Params(Um filtro) =>  http://localhost:3000/produto?name=arroz&description=arrozCarbonizado
* Body Params => {
    "name": "arroz",
    "description": "arroz Carborizado"
}
*/
const app = express();
app.use(cors());
app.use(express.json());

app.use(router);
//Middlewares de erro('tem 4 parametros') 
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
if(err instanceof Error){
    return response.status(400).json({
        error: err.message
    })
}
return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
})
})

// http://localhost:3000
app.listen(3000, () => console.log("Servidor Rodando"));