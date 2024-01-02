
import { cafeteria } from '../entities/cafeteria.entity';
import { dependiente } from '../entities/dependiente.entity';
import { ipv } from '../entities/ipv.entity';


export class CreateDependienteDto{



    cafeteria_id:cafeteria;
    ipvs: ipv[];
    id:number;
    nombre: string;
    numeroT: number;

}