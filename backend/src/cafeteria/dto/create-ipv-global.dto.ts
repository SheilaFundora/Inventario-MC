import { cafeteria } from "../entities/cafeteria.entity";
import { ipv } from "../entities/ipv.entity";
import { ipvGlobal } from "../entities/ipvGlobal.entity";
import { dependiente } from '../entities/dependiente.entity';


export class CreateIPVGDto{


    id:number;
    total:string;
    transferencia:string;
    salario:string;
    totalEfectivo:string;
    otrosGastos:string;

    fechaIPV:string;
    ipv_id:ipv;

}