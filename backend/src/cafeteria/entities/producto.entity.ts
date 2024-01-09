import {Entity, Column, PrimaryGeneratedColumn, Unique, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { ipv } from './ipv.entity';
import { cafeteria } from './cafeteria.entity';

@Entity()
export class producto{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false})
    nombre:string;
    @Column({nullable:false})
    cantidad:number;
    @Column({nullable:true, type:'float'})
    precioC:string;
    @Column({nullable:false, type:'float'})
    precio:string;
    @Column({nullable:true})
    limite:number;
    @OneToMany(() => ipv, (inventario) => inventario.producto_id)
    ipvs: ipv[];
    @ManyToOne(() => cafeteria, (cafeteria_id) => cafeteria_id.prods, {eager: true,onDelete:'CASCADE',nullable:false})
    @JoinColumn({name: 'cafeteria_id'})
    cafeteria_id:cafeteria;
}