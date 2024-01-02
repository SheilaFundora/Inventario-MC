import {Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn, CreateDateColumn, OneToMany} from 'typeorm';
import { producto } from './producto.entity';
import { ipvGlobal } from './ipvGlobal.entity';
import { dependiente } from './dependiente.entity';

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

    

    @ManyToOne(() => producto, (producto_id) => producto_id.ipvs, {eager: true,onDelete:'CASCADE'})
    @JoinColumn({name: 'producto_id'})
    producto_id:producto;
    
    @OneToMany(() => ipvGlobal, inveGlobal => inveGlobal.ipv_id)
    ipvsG: ipvGlobal[];

    @ManyToOne(() => dependiente, (dependiente_id) => dependiente_id.ipvs, {eager: true,onDelete:'CASCADE'})
    @JoinColumn({name: 'dependiente_id'})
    dependiente_id:dependiente;
}
