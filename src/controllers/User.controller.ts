import { User } from "../models/User";
import { Request,Response } from "express";
import { users } from "../database/Users";


export class UserController{

    public CreateUser(req:Request, res:Response){
        try {

            const {
                nome,
                email,
                senha
            } = req.body

            const verifyUserExists = users.find((user)=> {
                return user.email == email
            })

            if(verifyUserExists){
                return res.status(400).send({ok:false, message:"Email já cadastrado"})
            }
            
            let newUser = new User(nome, email, senha);
            
            users.push(newUser);

            return res.status(200).send({Ok:true, data:newUser})


            
        } catch (error) {
            return res.status(400).send({ok:false, message: error})
            
        }
    }

    public login(req:Request, res: Response){
        try {
            const  {
                email,
                senha
            } = req.body

            if(!email){
                return res.status(400).send({ok:false, message:"Email necessário"})
            }

            if(!senha){
                return res.status(400).send({ok:false, message:"senha necessária"})
            }
          

            const usuario = users.find((user)=>{
             return user.email == email
               
            })
                
            if(!usuario){
                return res.status(401).send({ok: false, message: "Usuário ou senha invalidos, verique os dados e tente novamente"})
            }
           
            if(usuario.senha !== senha){
                return res.status(401).send({ok:false, message: "Usuário ou senha invalidos, verique os dados e tente novamente"})
            }
            return res.status(200).send({ok:true, message: "Usuario logado com sucesso", data: usuario.id})


            

            
        } catch (error) {
            res.status(500).send({ok:false, message: error})
            console.log(error)
        }
    }

    public updateUserPassword(req:Request, res:Response){
        try {
            const{
                email,
                senha
            } = req.body

            const usuario = users.find((user)=>{
              return  user.email == email
            })

            if(!usuario){
                return res.status(400).send({ok:false, message: "email não cadastrado"})
            }

            usuario.senha = senha

            return res.status(200).send({ok: true, message:"Senha modificada com sucesso", data: usuario})
            
        } catch (error) {
            return res.status(500).send({ok:false, message: error})
        }
    }

    public deleteUser(req:Request, res:Response){
        try {
            const{
                email
            } = req.body

            const usuario = users.findIndex((user)=> {
                return user.email == email
            })

            if(usuario == -1){
                return res.status(400).send({ok:false, message: "Email do usuaário não encontrado, por favor tente novamente"})
            }

            users.splice(usuario,1)
                return res.status(200).send({ok:true, message:"Usuário excluido com sucesso", data: users})
            
        } catch (error) {
            return res.status(500).send({ok:false, message: error})
        }
    }
}