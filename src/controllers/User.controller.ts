import { User } from "../models/User";
import { Request,Response } from "express";
import { users } from "../database/Users";


export class UserController{

    public CreateUser(req:Request, res:Response){
        try {

            const newUser = req.user
           
            
        if (!newUser) {
           
            return res.status(400).send({ok: false, message: "User undefined"});}
            
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

            // Validação somente para teste de API pois em caso reais ao meu ver poderia ser feita diretamente
            // no front
            if(!email){
                return res.status(400).send({ok:false, message:"Email necessário"})
            }

            if(!senha){
                return res.status(400).send({ok:false, message:"senha necessária"})
            }
          
            // Busco o usuario com mesmo email do digitado pelo usuario para enviar o ID como data
            // verificação  se email e senha são corretos está sendo feito
            //No Middleware

            //Pego A variavel que contem o usuário validado que criei no Middleware e mandei na Requisição
            const userExists = req.user
            
           
            return res.status(200).send({ok:true, message: "Usuario logado com sucesso", data: userExists?.id})


            

            
        } catch (error) {
            res.status(500).send({ok:false, message: error})
            console.log(error)
        }
    }

    public getUser(req:Request,res:Response){
        try {

            if(users.length == 0){
                return res.status(401).send({ok:false, message: "nenhum usuario cadastrado"})
            }

                return res.status(200).send({ok:true, message: "usuarios cadastrados no sistema", dataUser: users})
            
        } catch (error) {
            return res.status(500).send({ok:false, message: error})
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