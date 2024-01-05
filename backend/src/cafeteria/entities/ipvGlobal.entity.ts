import {Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn, CreateDateColumn, OneToMany} from 'typeorm';
import { ipv } from './ipv.entity';
import { cafeteria } from './cafeteria.entity';
import { dependiente } from './dependiente.entity';

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
    @CreateDateColumn({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" , nullable: true})
    fechaIPV: string;
    @Column({nullable:true,type:'float'})
    porcientoSalario:string;
    



    @ManyToOne(() => cafeteria, (cafeteria_id) => cafeteria_id.ipvsG, {eager: true,onDelete:'CASCADE'})
    @JoinColumn({name: 'cafeteria_id'})
    cafeteria_id:cafeteria;
    @ManyToOne(() => dependiente, (dependiente_id) => dependiente_id.ipvsG, {eager: true,onDelete:'CASCADE'})
    @JoinColumn({name: 'dependiente_id'})
    dependiente_id:dependiente;

    @ManyToOne(() => ipv, ipv_id => ipv_id.ipvsG, {eager: true,onDelete:'CASCADE'})
    @JoinColumn({name: 'ipv_id'})
    ipv_id:ipv;

}