import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { dependiente } from './dependiente.entity';
import { ipvGlobal } from './ipvGlobal.entity';
import { ipv } from './ipv.entity';
import { producto } from './producto.entity';


@Entity()
export class cafeteria{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false, unique:true})
    nombre:string;
    @Column({nullable:false, type:'float'})
    salario:string;
    @OneToMany(() => ipv, (ipv) => ipv.cafeteria_id)
    ipvs: ipv[];
    @OneToMany(() => producto, (prod) => prod.cafeteria_id)
    prods: producto[];
    @OneToMany(() => dependiente, (dep) => dep.cafeteria_id)
    deps: dependiente[];

}