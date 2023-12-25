import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany} from 'typeorm';
import { ipv } from './ipv.entity';

@Entity()
export class producto{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false, unique:true})
    nombre:string;
    @Column({nullable:false})
    cantidad:number;
    @Column({nullable:false, type:'float'})
    precio:string;
    @Column({nullable:true})
    limite:number;
    @OneToMany(() => ipv, (inventario) => inventario.producto_id)
    ipvs: ipv[]
}