import { IsNumber, IsString } from "class-validator";
import { dependiente } from '../entities/dependiente.entity';


export class CreateCafeteriaDto{


    id:number;
    nombre: string;
    salario: string;
    dependientes: dependiente[];



}