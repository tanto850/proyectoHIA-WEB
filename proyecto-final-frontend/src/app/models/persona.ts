import { Area } from "./area";
import { Rol } from "./rol";

export class Persona {
    _id!:string;
    apellido!: string;
    nombre!: string;
    dni!: string;
    direccion!: string;
    telefono!: string;
    email!: string;
    roles:Array<Rol> = new Array<Rol>();
    area:Area = new Area();

    constructor(){

    }

}
