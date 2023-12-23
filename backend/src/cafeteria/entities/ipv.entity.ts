import {Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn} from 'typeorm';
import { producto } from './producto.entity';

@Entity()
export class ipv{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:true, unique:true})
    entrada:number;
    @Column({nullable:true})
    traslado:number;
    @Column({nullable:true})
    merma:number;
    @Column({nullable:false})
    venta:number;
    @Column({nullable:false, type:'float'})
    subtotalEfectivo:string;
    @Column({nullable:false})
    existenciaFinal:number;

    @ManyToOne(() => producto, (producto_id) => producto_id.ipvs, {eager: true,})
    @JoinColumn({name: 'producto_id'})
    producto_id:producto;
}