import { Injectable, Body, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { producto } from '../entities/producto.entity';

@Injectable()
export class productoService {


    constructor(
        @InjectRepository(producto) private productoRep:Repository<producto>,

    )
    {}

    findAll()
    {
    return  this.productoRep.find();
    }

    getId(id: number)
    {
        return this.productoRep.findOneBy({id});
    }

    create(body:any){
        const newproducto = this.productoRep.create(body);
        
        return this.productoRep.save(newproducto);
    }

    async update (id:number, body:any){
        const product = await this.productoRep.findOneBy({id});
        if (!product) {
            throw new Error('id no encontrado');
          }
          this.productoRep.merge(product, body);
          return this.productoRep.save(product);
    }


    async Delete(id:number){
        await this.productoRep.delete(id);
        return true;
    }

}