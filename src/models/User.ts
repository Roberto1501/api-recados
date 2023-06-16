 import {v4 as UUID } from "uuid"
 
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