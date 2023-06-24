import { users } from "../database/Users";
import { Request,Response,NextFunction } from "express";
import { Recado } from "../models/Recado";
import { recados } from "../database/Recados";


export class RecadoMiddleware{
    public validatingRecadoCreation(req:Request, res:Response, next:NextFunction){
        const {userId}=req.params

            const{
                title,
                description,
            } = req.body

            if(!userId){
                return res.status(400).send({ok:false, message: "id do usuário incorreto"})
            }

            if(!title || !description){
                return res.status(400).send({ok:false, message: "Titulo e descrição necessárias"})
            }

            const  newNote = new Recado(title,description,userId)

            req.recado = newNote

            next()
    }

    public  getRecadosValidation(req:Request,res:Response, next:NextFunction){
        
        const {userId} = req.params

        const SearchUser = users.find(user=> user.id == userId)

        if(!SearchUser){
            return res.status(400).send({ok:false, message: "id incorreto"})
        }

        req.user = SearchUser

        next()
       
    }

   
}