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
    
    @OneToMany(() => cafeteria, (cafeteria) => cafeteria.dependiente_id)
    cafeterias: cafeteria[];
    


}