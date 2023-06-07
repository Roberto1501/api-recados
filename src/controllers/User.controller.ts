import { User } from "../models/User";
import { Request,Response } from "express";
import {StatusCodes} from "http-status-codes"
import { users } from "../database/Users";


export class UserController{

    public CreateUser(req:Request, res:Response){
        try {

            const {
                nome,
                email,
                senha
            } = req.body
            
            let newUser = new User(nome, email, senha);
            
            users.push(newUser);

            return res.status(StatusCodes.CREATED).send({Ok:true, data:newUser})


            
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).send({ok:false, message: error})
            
        }
    }
}