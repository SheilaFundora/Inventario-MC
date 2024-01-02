import { ipv } from "../entities/ipv.entity";
import { ipvGlobal } from "../entities/ipvGlobal.entity";
import { producto } from "../entities/producto.entity";


export class CreateIPVDto{


    id:number;
    entrada: number;
    traslado: number;
    merma:number;
    venta: number;
    subtotalEfectivo:string;
    existenciaFinal:number;
    ipvsG:ipvGlobal[];
    producto_id:producto;
}