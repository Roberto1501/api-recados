import {v4 as UUID} from "uuid";


declare module 'express-serve-static-core' {
    interface Request {
        recado?: Recado;
    }
}

export class Recado {
    private  _id: string;
    private _status: string;

    constructor(private _title: string, private _description: string, private _userId: string){
            this._id = UUID();
            this._status = "visivel"

    }

    public get id():string{
        return this._id
    }
    public get userId():string{
        return this._userId
    }
    public get status():string{
        return this._status
    }

    public set status(newStatus:string){
        this._status = newStatus
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

    public toJson(){
        return{
            title: this._title,
            description: this._description
        }
    }

}