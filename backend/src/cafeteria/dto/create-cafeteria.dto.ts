import { IsNumber, IsString } from "class-validator";
import { dependiente } from '../entities/dependiente.entity';
import { ipvGlobal } from "../entities/ipvGlobal.entity";
import { producto } from "../entities/producto.entity";
import { ipv } from "../entities/ipv.entity";


export class CreateCafeteriaDto{


    id:number;
    nombre: string;
    salario: string;
    ipvs: ipv[];
    deps: dependiente[];
    prods: producto[];

}