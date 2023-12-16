import {Entity, Column, PrimaryGeneratedColumn, Unique} from 'typeorm';

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
}