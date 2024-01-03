import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { cafeteria } from './cafeteria.entity';
import { ipv } from './ipv.entity';
import { ipvGlobal } from './ipvGlobal.entity';


@Entity()
export class dependiente{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false, unique:true})
    nombre:string;
    @Column({nullable:false})
    numeroT:number;
    
    @OneToMany(() => ipvGlobal, (ipvG) => ipvG.dependiente_id)
    ipvsG: ipvGlobal[];


}