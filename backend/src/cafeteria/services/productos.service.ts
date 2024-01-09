import { Injectable, Body, Delete, BadRequestException, NotFoundException, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from 'typeorm'
import { producto } from '../entities/producto.entity';
import { CreateProductoDto } from '../dto/create-p.dto';
import { cafeteria } from '../entities/cafeteria.entity';


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

    async create(producto: CreateProductoDto): Promise<producto> {

         const pro = await this.productoRep.find();

         for (const prod of pro){

            if (prod.nombre===producto.nombre){
                throw new HttpException('Product with this name already exists',HttpStatus.BAD_REQUEST);
            }
         }

    
        const newProduct = this.productoRep.create(producto);
        return this.productoRep.save(newProduct);
      }
    

    async update (id:number, body:CreateProductoDto){
        const product = await this.productoRep.findOneBy({id});
        if (!product) {
            throw new Error('id no encontrado');
          }
          product.cafeteria_id=body.cafeteria_id;
          this.productoRep.merge(product, body);
          return this.productoRep.save(product);
    }


    async Delete(id:number){
        await this.productoRep.delete(id);
        return true;
    }


    async findProdCaf(id:number)
    {
    const arr = await this.productoRep.find();
    const arregloProducto: producto[] = [];
    for (const i of arr){
        if (i.cafeteria_id.id===id){
            arregloProducto.push(i);
        }
    }
    return arregloProducto;
    }
}