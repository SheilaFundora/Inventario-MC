
import { cafeteria } from '../entities/cafeteria.entity';
import { dependiente } from '../entities/dependiente.entity';
import { ipv } from '../entities/ipv.entity';
import { ipvGlobal } from '../entities/ipvGlobal.entity';


export class CreateDependienteDto{




    id:number;
    nombre: string;
    numeroT: number;
    cafeteria_id:cafeteria;
}