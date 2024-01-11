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

    @ManyToOne(() => dependiente, dependiente_id => dependiente_id.ipvsG, {eager: true,onDelete:'CASCADE',nullable:false})
    @JoinColumn({name: 'dependiente_id'})
    dependiente_id:dependiente;




    @OneToMany(() => ipv, inveG => inveG.ipvG_id,{nullable:false})
    ipvs: ipv[];
}