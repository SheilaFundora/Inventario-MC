import {Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn, CreateDateColumn} from 'typeorm';
import { ipv } from './ipv.entity';

@Entity()
export class ipvGlobal{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false, type:'float'})
    total:string;
    @Column({nullable:false, type:'float'})
    transferencia:string;
    @Column({nullable:false, type:'float'})
    salario:string;
    @Column({nullable:false, type:'float'})
    totalEfectivo:string;
    @Column({nullable:false, type:'float'})
    otrosGastos:string;
    @Column({nullable:true})
    nombreDependienta:string;
    @CreateDateColumn({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" , nullable: true})
    fechaIPV: string;
    @Column({nullable:true})
    nombreCafeteria:string;
    @Column({nullable:true,type:'float'})
    porcientoSalario:string;
    

    @ManyToOne(() => ipv, (ipv_id) => ipv_id.ipvsG, {eager: true,onDelete:'CASCADE'})
    @JoinColumn({name: 'ipv_id'})
    ipv_id:ipv;
}