import { ipv } from "../entities/ipv.entity";


export class CreateIPVDto{


    id:number;
    entrada: number;
    traslado: number;
    merma:number;
    venta: number;
    subtotalEfectivo:string;
    existenciaFinal:number;
    total:string;
    transferencia:string;
    salario:string;
    totalEfectivo:string;
    otrosGastos:string;
    nombreDependienta:string;
    fechaIPV:string;
}