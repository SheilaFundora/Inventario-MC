import { Injectable, Body, Delete, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { producto } from '../entities/producto.entity';
import { productos } from '../cafeteria.module';

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

    async create(producto: producto): Promise<producto> {
        const existingProduct = await this.productoRep.findOne({where:producto});
    
        if (existingProduct) {
          throw new NotFoundException('Product with this name already exists');
        }
    
        const newProduct = this.productoRep.create(producto);
        return this.productoRep.save(newProduct);
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