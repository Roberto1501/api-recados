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
                const {id} = req.params

    
          const verifyIdUser =  users.find((user)=> {
              return user.id == id
            })

            if(!verifyIdUser){
                return res.status(401).send({ok: false, message: "Id do usuario incorreto"})
            }

                const allRecados = recados.filter((recado)=> recado.userId == id )
                console.log(allRecados)
                console.log(recados)
                
                if(allRecados.length == 0){
                    return res.status(404).send({ok:false, message: "Nenhum recado Cadastrado no momento", data: allRecados})
                }
                return res.status(200).send({ok:true, message: "Recados buscados com sucesso", data: allRecados})
            
        } catch (error) {
            return res.status(500).send({ok: false, message: error})
        }
    }

}