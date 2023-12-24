import { IsNumber, IsString } from "class-validator";
import { ipv } from "../entities/ipv.entity";

export class CreateProductoDto{


    id:number;
    nombre: string;
    cantidad: number;
    precio:string;
    ipvs:Array<ipv>;



}