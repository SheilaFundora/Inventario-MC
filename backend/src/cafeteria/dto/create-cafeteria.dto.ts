import { IsNumber, IsString } from "class-validator";
import { dependiente } from '../entities/dependiente.entity';
import { ipvGlobal } from "../entities/ipvGlobal.entity";


export class CreateCafeteriaDto{


    id:number;
    nombre: string;
    salario: string;
    ipvsG: ipvGlobal[];
    dependiente_id:dependiente;


}