import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany} from 'typeorm';
import { dependiente } from './dependiente.entity';


@Entity()
export class cafeteria{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false, unique:true})
    nombre:string;
    @Column({nullable:false, type:'float'})
    salario:string;
    @OneToMany(() => dependiente, (dependiente) => dependiente.cafeteria_id)
    dependientes: dependiente[];
}