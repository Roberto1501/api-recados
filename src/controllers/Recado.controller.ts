import { Request,Response } from "express";
import { recados } from "../database/Recados";
import { Recado } from "../models/Recado";
import { users } from "../database/Users";

export  class RecadoController{

    public createRecado(req:Request, res:Response){

        try {
            

            const newNote = req.recado
            if(!newNote){
                return res.status(400).send({ok:false, message:"recado undefined"})
            }

            recados.push(newNote)

            return res.status(200).send({ok:true, message: "Recado criado com sucesso" , data: newNote })
            
        } catch (error) {
            return res.status(500).send({ok:false, message: error})
        }
    }

    public getAllRecado(req:Request, res:Response){
        try {
          
            const SearchUser = req.user
             
            let recadosUser = recados.filter(recado=> recado.userId == SearchUser?.id)

            const {statusRecado} = req.body
            const{description} =req.body

            if(statusRecado){
                 recadosUser = recadosUser.filter(recados => recados.statusRecado == statusRecado)
            }

            if(description){
                recadosUser = recadosUser.filter(recados=> recados.description == description)
            }
            

                return res.status(200).send({ok:true, message: "Recados buscados com sucesso", data: recadosUser })
            
        } catch (error) {
            return res.status(500).send({ok: false, message: error})
        }
    }

    public updateRecado(req:Request, res:Response){
        try {

                const recadoFind = req.recado
                if(!recadoFind){
                    return res.status(400).send({ok:false, message: "Id undefined"})
                }

               const {
                title,
                description,
                statusRecado
            } = req.body

            if(!title && !description && !statusRecado){
                    return res.status(401).send({ok:false, message: "Informe novo titulo,descrição ou novo status do recado"})
    
            }
                if(title){
                    recadoFind.title =  title
                }
                if(description){
                    recadoFind.description = description

                }
                if(statusRecado){
                    recadoFind.statusRecado = statusRecado
                }

                const AllUserRecados = recados.filter(recado=> recado.userId == recadoFind.userId)
               
               

               return res.status(200).send({ok:true, message:"Recado Modificado com sucesso", data: AllUserRecados })

         
                

      
            
        
           
                

        } catch (error) {
            return res.status(500).send({ok:false, message: error})
        }
    }

    public deleteRecado(req:Request, res:Response){

        try {

          const recadoFind = req.recado

          if(!recadoFind){
            return res.status(400).send({ok:false, message: "id undefined"})
          }

          const recadoFindIndex = recados.findIndex(recado=>recado.id == recadoFind.id)

            if(recadoFindIndex == -1){
                return res.status(404).send({ok:false, message:"id do recado informado não corréto"})
            }

            recados.splice(recadoFindIndex,1)

            const userRecados = recados.filter((recado)=> recado.userId == recado.userId)

            return res.status(200).send({ok: true, message: "recado excluído com sucesso", data: userRecados })

            
        } catch (error) {
            return res.status(500).send({ok:false, message: error})
        }
    }

}