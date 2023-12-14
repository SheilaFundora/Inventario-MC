import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class producto{
    @PrimaryGeneratedColumn()
    id:number;
    @Column({nullable:false})
    nombre:string;
    @Column({nullable:false})
    cantidad:number;
    @Column({nullable:false, type:'float'})
    precio:string;
}