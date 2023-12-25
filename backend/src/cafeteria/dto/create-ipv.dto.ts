import { ipv } from "../entities/ipv.entity";


export class CreateIPVDto{


    id:number;
    entrada: number;
    traslado: number;
    merma:number;
    venta: number;
    subtotalEfectivo:string;
    existenciaFinal:number;
    total:number;
    transferencia:number;
    salario:number;
    totalEfectivo:number;
    otrosGastos:number;
    nombreDependienta:string;
    fechaIPV:string;
}