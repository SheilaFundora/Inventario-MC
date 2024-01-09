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
    
    @ManyToOne(() => cafeteria, (cafeteria_id) => cafeteria_id.deps, {eager: true,onDelete:'CASCADE', onUpdate:'CASCADE',nullable:false})
    @JoinColumn({name: 'cafeteria_id'})
    cafeteria_id:cafeteria;


}