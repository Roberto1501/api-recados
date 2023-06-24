 import {v4 as UUID } from "uuid"
 
 // o  codigo que segue serve para passar o conteudo do middlweare na requisição
 // Estou modificando dentro da interface Request do modulo express-serve-static-core
 //Estou adicionando  uma propriedade opcional chamada user estamos tipando ela com a class User
 // Assim posso mandar um usuario do tipo User dentro da requisição.
 declare module 'express-serve-static-core' {
    interface Request {
        user?: User;
    }
}
 export  class User{
        private _id :string;
        
        constructor(private _nome:string, private _email:string, private _senha: string ){

            this._id = UUID();

        }

        public get id():string{
            return this._id
        }

        public get nome():string{
           return this._nome;
        }

        public get email():string{
            return this._email;
        }

        public set email(novoEmail:string){
             this._email = novoEmail;
        }

        public get senha():string{
            return this._senha;
        }

        public set senha(novaSenha:string){
            this._senha = novaSenha;
        }


        public toJson(){
            return {

                nome: this.nome,
                email: this._email,
                senha: this._senha

        }}
 }