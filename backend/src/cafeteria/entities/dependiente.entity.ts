import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { cafeteria } from './cafeteria.entity';
import { ipv } from './ipv.entity';


@Entity()
export class dependiente{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false, unique:true})
    nombre:string;
    @Column({nullable:false})
    numeroT:number;
    @ManyToOne(() => cafeteria, (cafeteria_id) => cafeteria_id.dependientes, {eager: true,onDelete:'CASCADE'})
    @JoinColumn({name: 'cafeteria_id'})
    cafeteria_id:cafeteria;
    @OneToMany(() => ipv, (ipv) => ipv.dependiente_id)
    ipvs: ipv[];
}