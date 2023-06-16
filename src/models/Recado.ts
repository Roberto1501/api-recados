import {v4 as UUID} from "uuid";

export class Recado {
    private  _id: string;

    constructor(private _title: string, private _description: string, private _userId: string){
            this._id = UUID();

    }

    public get id():string{
        return this._id
    }
    public get userId():string{
        return this._userId
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