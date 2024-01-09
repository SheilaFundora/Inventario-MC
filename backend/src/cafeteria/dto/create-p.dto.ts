import { IsNumber, IsString } from "class-validator";
import { ipv } from "../entities/ipv.entity";
import { cafeteria } from "../entities/cafeteria.entity";

export class CreateProductoDto{


    id:number;
    nombre: string;
    cantidad: number;
    precio:string;
    ipvs:ipv[];
    limite:number;
    precioC:string;
    cafeteria_id:cafeteria;


}