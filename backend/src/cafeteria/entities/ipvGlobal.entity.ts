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
    

    @ManyToOne(() => cafeteria, (cafeteria_id) => cafeteria_id.ipvGs, {eager: true,onDelete:'CASCADE',nullable:false})
    @JoinColumn({name: 'cafeteria_id'})
    cafeteria_id:cafeteria;




    @ManyToOne(() => ipv, ipv_id => ipv_id.ipvsG, {eager: true,onDelete:'CASCADE',nullable:false})
    @JoinColumn({name: 'ipv_id'})
    ipv_id:ipv;

}