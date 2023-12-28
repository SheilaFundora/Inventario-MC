import {Entity, Column, PrimaryGeneratedColumn, Unique, ManyToOne, JoinColumn, CreateDateColumn, OneToMany} from 'typeorm';
import { producto } from './producto.entity';
import { ipvGlobal } from './ipvGlobal.entity';

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
    @Column({nullable:false, type:'float'})
    total:string;
    @Column({nullable:false, type:'float'})
    transferencia:string;
    @Column({nullable:false, type:'float'})
    salario:string;
    @Column({nullable:false, type:'float'})
    totalEfectivo:string;
    @Column({nullable:false, type:'float'})
    otrosGastos:string;
    @Column({nullable:true})
    nombreDependienta:string;
    @CreateDateColumn({ type: "timestamp without time zone", default: () => "CURRENT_TIMESTAMP" , nullable: true})
    fechaIPV: string;
    

    @ManyToOne(() => producto, (producto_id) => producto_id.ipvs, {eager: true,})
    @JoinColumn({name: 'producto_id'})
    producto_id:producto;
    
    @OneToMany(() => ipvGlobal, (inveGlobal) => inveGlobal.ipv_id)
    ipvsG: ipvGlobal[]
}
