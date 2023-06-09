import { users } from "../database/Users";
import { Request,Response,NextFunction } from "express";
import { User } from "../models/User";


 export class UserMiddleware{

    public validateUserCreation(req:Request, res: Response, next:NextFunction){
        try {
            const {
                nome,
                email,
                senha
            } = req.body

            if(!nome || !email || !senha){
                return res.status(400).send({ok:false, message: "Preencha todos os campos"})
            }

            const userExist = users.find((user)=>{
                return user.email == email
            })

            if(userExist){
                    return res.status(400).send({ok:false, message:"Usuário ja cadastrado"})
            }

            const newuser =  new User(nome,email, senha)

            req.user = newuser

            next()


            
        } catch (error) {
            return  res.status(500).send({ok:false ,  message:error})
        }
    }

    public ValidateUserExists(req:Request, res:Response, next: NextFunction){
            const {email, senha}= req.body
            
            const usuerExists = users.find(user=> user.email == email)
            if(!usuerExists){
                return res.status(404).send({ok:false, message: "Email ou senha incorretos, tente novamente"})
            }

            if(usuerExists.senha !== senha){
                return res.status(404).send({ok:false, message: "Email ou senha incorretos, tente novamente"})

            }
              
            req.user = usuerExists
            next()
    }

    public getAllUsers(req:Request, res:Response, next: NextFunction){

        if(users.length == 0){
            return res.status(401).send({ok:false, message: "nenhum usuario cadastrado"})
        }

    

        next()

    }

    public Delete(req:Request, res:Response, next:NextFunction){

        const {userId} = req.params

        if(!userId){
            return res.status(400).send({ok:false, message: "Informe o id do usuário"})
        }

        const userToDelete = users.findIndex(user=> user.id == userId)

        if(userToDelete == -1 ){
            return res.status(404).send({ok:false, message: "Id Informado incorreto"})
        }

        req.userIndex = userToDelete



        next()


        
    }

    public passwordUpdateLogged(req:Request, res: Response, next: NextFunction){

                const {userId} = req.params
         

            const FindUser = users.find(usuario=> usuario.id == userId)

            if(!FindUser){
                return res.status(400).send({ok:false, message:"Id do usuario incorreto"})
            }

            req.user = FindUser

            next()
     
    }
}