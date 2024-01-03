import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { dependiente } from './dependiente.entity';
import { ipvGlobal } from './ipvGlobal.entity';
import { ipv } from './ipv.entity';


@Entity()
export class cafeteria{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false, unique:true})
    nombre:string;
    @Column({nullable:false, type:'float'})
    salario:string;
    @OneToMany(() => ipvGlobal, (ipvG) => ipvG.cafeteria_id)
    ipvsG: ipvGlobal[];

}