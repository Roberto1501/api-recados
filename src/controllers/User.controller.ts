import { User } from "../models/User";
import { Request,Response } from "express";
import { users } from "../database/Users";


export class UserController{

    public CreateUser(req:Request, res:Response){
        try {

            const newUser = req.user
           
            
        if (!newUser) {
           
            return res.status(400).send({ok: false, message: "Usuario undefined"});}
            
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

            const usuario = users.map(user=> {
                return{
                    nome: user.nome,
                    email: user.email,
                    id: user.id
                }
            })
          
                return res.status(200).send({ok:true, message: "usuarios cadastrados no sistema", dataUsers: usuario  })
            
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
           const userToDelete = req.userIndex

            if(userToDelete == undefined){
                return res.status(400).send({ok:false, message: "Usuário undefined"})
            }
             users.splice(userToDelete,1)

            

           return res.status(200).send({ok:true, message: "Usuário deletado com sucesso ", NewData: users})

            
        } catch (error) {
            return res.status(500).send({ok:false, message: error})
        }
    }
}