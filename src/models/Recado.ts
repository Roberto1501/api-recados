import {v4 as UUID} from "uuid";


declare module 'express-serve-static-core' {
    interface Request {
        recado?: Recado;
    }
}

export class Recado {
    private  _id: string;
    private _statusRecado: string;

    constructor(private _title: string, private _description: string, private _userId: string){
            this._id = UUID();
            this._statusRecado = "visivel"

    }

    public get id():string{
        return this._id
    }
    public get userId():string{
        return this._userId
    }
    public get statusRecado():string{
        return this._statusRecado
    }

    public set statusRecado(newStatus:string){
        this._statusRecado = newStatus
    }

    public get title():string{
        return this._title;
    }

    public set title(newTitle:string){
        this._title = newTitle;
    }

    public get description():string{
        return this._description;
    }

    public set description(newDescription:string){
        this._description = newDescription;
    }

   

}