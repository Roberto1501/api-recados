import { Request,Response } from "express";
import { recados } from "../database/Recados";
import { Recado } from "../models/Recado";
import { users } from "../database/Users";
import { log } from "console";

export  class RecadoController{

    public createRecado(req:Request, res:Response){

        try {
            const {id}=req.params

            const{
                title,
                description,
            } = req.body

            const  newNote = new Recado(title,description,id)

            recados.push(newNote)

            return res.status(200).send({ok:true, message: "Recado criado com sucesso" , data: newNote })
            
        } catch (error) {
            return res.status(500).send({ok:false, message: error})
        }
    }

    public getAllRecado(req:Request, res:Response){
        try {
                const {userId} = req.params

    
          const verifyIdUser =  users.find((user)=> {
              return user.id == userId
            })

            if(!verifyIdUser){
                return res.status(401).send({ok: false, message: "Id do usuario incorreto"})
            }

                const allRecados = recados.filter((recado)=> recado.userId == userId )
             
                if(allRecados.length == 0){
                    return res.status(404).send({ok:false, message: "Nenhum recado Cadastrado no momento", data: allRecados})
                }
                return res.status(200).send({ok:true, message: "Recados buscados com sucesso", data: allRecados})
            
        } catch (error) {
            return res.status(500).send({ok: false, message: error})
        }
    }

    public updateRecado(req:Request, res:Response){
        try {

            const {userId} = req.params
            const {id} = req.params

            if(!id){
                return res.status(401).send({ok:false, message:"Informe id do usuario"})
            }


            const usuario = users.find((usuario)=> 
            {
                return usuario.id == userId}
                
                )   

               if( !usuario){
                        return res.status(404).send({ok:false , message: "Usuario não encontrado"})
               }

               const recadosUsuario = recados.filter((recado)=> recado.userId == userId)

               if(!recadosUsuario){
                return res.status(404).send({ok:false, message: "Usário não possui recados"})
               }
          
               const recadoFind = recados.find((recado)=> recado.id == id)

               if(!recadoFind){
                return res.status(404).send({ok:false, message:"Recado não encontrado"})
               }

               const {
                title,
                description
            } = req.body

            if(!title && !description){
                    return res.status(401).send({ok:false, message: "Informe novo titulo ou descrição do recado"})
    
            }
                if(title){
                    recadoFind.title =  title
                }
                if(description){
                    recadoFind.description = description

                }
               
               

               return res.status(200).send({ok:true, message:"Recado Modificado com sucesso", data: recadosUsuario })

         
                

      
            
        
           
                

        } catch (error) {
            return res.status(500).send({ok:false, message: error})
        }
    }

}